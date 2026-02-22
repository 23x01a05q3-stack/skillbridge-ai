import sqlite3
import json
import os

DB_PATH = 'data/skillbridge.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the database schema."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create Tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            description TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id INTEGER,
            skill_name TEXT NOT NULL,
            FOREIGN KEY (job_id) REFERENCES jobs (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def migrate_from_json(json_path):
    """Migrates data from jobs.json to SQLite if the DB is empty."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Clear existing data to ensure expansion is reflected
    cursor.execute('DELETE FROM skills')
    cursor.execute('DELETE FROM jobs')
    conn.commit()

    if not os.path.exists(json_path):
        conn.close()
        return

    with open(json_path, 'r') as f:
        jobs = json.load(f)
        
    for job in jobs:
        cursor.execute(
            'INSERT INTO jobs (role, description) VALUES (?, ?)',
            (job['role'], job['description'])
        )
        job_id = cursor.lastrowid
        
        for skill in job['skills']:
            cursor.execute(
                'INSERT INTO skills (job_id, skill_name) VALUES (?, ?)',
                (job_id, skill)
            )
            
    conn.commit()
    conn.close()

def get_all_jobs():
    conn = get_db_connection()
    jobs = conn.execute('SELECT * FROM jobs').fetchall()
    
    result = []
    for job in jobs:
        job_id = job['id']
        skills = conn.execute('SELECT skill_name FROM skills WHERE job_id = ?', (job_id,)).fetchall()
        result.append({
            "id": job['id'],
            "role": job['role'],
            "description": job['description'],
            "skills": [s['skill_name'] for s in skills]
        })
    conn.close()
    return result

def get_job_by_id(job_id):
    conn = get_db_connection()
    job = conn.execute('SELECT * FROM jobs WHERE id = ?', (job_id,)).fetchone()
    if not job:
        conn.close()
        return None
        
    skills = conn.execute('SELECT skill_name FROM skills WHERE job_id = ?', (job_id,)).fetchall()
    result = {
        "id": job['id'],
        "role": job['role'],
        "description": job['description'],
        "skills": [s['skill_name'] for s in skills]
    }
    conn.close()
    return result

if __name__ == '__main__':
    # Initialize and migrate when run directly
    init_db()
    migrate_from_json('data/jobs.json')
    print("Database initialized and migrated successfully.")
