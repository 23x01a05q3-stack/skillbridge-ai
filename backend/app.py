import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from nlp_pipeline import NLPPipeline
from analyzer import SkillAnalyzer
from recommendation import RecommendationEngine
import database

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize modules
nlp_pipe = NLPPipeline()
analyzer = SkillAnalyzer()
recommender = RecommendationEngine()

# Initialize/Migrate Database
database.init_db()
database.migrate_from_json(os.path.join('data', 'jobs.json'))

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "message": "SkillBridge AI API is running",
        "endpoints": {
            "health": "/health",
            "jobs": "/jobs",
            "analyze": "/analyze (POST)"
        },
        "frontend": "http://localhost:5173"
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"})

@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = database.get_all_jobs()
    return jsonify(jobs)

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files['file']
        job_id = int(request.form.get('jobId', 1))
        
        if file.filename == '':
            return jsonify({"error": "Empty filename"}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # 1. Extract Text
        raw_text = ""
        if filename.endswith('.pdf'):
            raw_text = nlp_pipe.extract_text_from_pdf(file_path)
        else:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                raw_text = f.read()
        
        if not raw_text.strip():
            return jsonify({"error": "Failed to extract text from resume. Ensure the file is not empty or corrupted."}), 400

        # 2. Preprocess & Extract Resume Skills
        preprocessed_resume = nlp_pipe.preprocess_text(raw_text)
        resume_skills = nlp_pipe.extract_skills(raw_text)
        
        # 3. Get Selected Job from DB
        selected_job = database.get_job_by_id(job_id)
        if not selected_job:
            return jsonify({"error": "Job not found"}), 404
            
        required_skills = selected_job['skills']
        preprocessed_jd = nlp_pipe.preprocess_text(selected_job['description'] + " " + " ".join(required_skills))
        
        # 4. Calculate Similarity
        match_score = analyzer.calculate_similarity(preprocessed_resume, preprocessed_jd)
        
        # 5. Skill Gap Analysis
        gap_result = analyzer.detect_skill_gap(resume_skills, required_skills)
        
        # 6. Generate Recommendations
        recommendations = recommender.get_recommendations(gap_result['missing'])
        
        return jsonify({
            "role": selected_job['role'],
            "matchScore": round(match_score * 100, 2),
            "skillMatch": round(gap_result['match_percentage'], 2),
            "extractedSkills": resume_skills,
            "matchedSkills": gap_result['matched'],
            "missingSkills": gap_result['missing'],
            "recommendations": recommendations,
            "summary": raw_text[:500] + "..." 
        })
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error during analysis: {error_details}")
        return jsonify({"error": f"Internal Process Error: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
