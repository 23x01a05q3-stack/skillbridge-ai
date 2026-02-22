from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class SkillAnalyzer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()

    def calculate_similarity(self, resume_text, jd_text):
        """
        Calculates cosine similarity between resume and job description.
        """
        try:
            tfidf_matrix = self.vectorizer.fit_transform([resume_text, jd_text])
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
            return float(similarity[0][0])
        except Exception as e:
            print(f"Error calculating similarity: {e}")
            return 0.0

    def detect_skill_gap(self, resume_skills, required_skills):
        """
        Identifies missing skills.
        """
        resume_skills_set = set([s.lower() for s in resume_skills])
        required_skills_set = set([s.lower() for s in required_skills])
        
        missing_skills = required_skills_set - resume_skills_set
        matched_skills = required_skills_set & resume_skills_set
        
        return {
            "missing": list(missing_skills),
            "matched": list(matched_skills),
            "match_percentage": (len(matched_skills) / len(required_skills_set)) * 100 if required_skills_set else 0
        }
