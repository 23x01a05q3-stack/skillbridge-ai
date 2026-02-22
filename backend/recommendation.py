class RecommendationEngine:
    def __init__(self):
        # This could be expanded into a more complex rule-based system or use an LLM
        self.learning_resources = {
            "python": {
                "topics": ["Functional Programming", "Decorators", "Asynchronous Programming"],
                "projects": ["Web Scraper", "Data Analysis Dashboard"],
                "certifications": ["PCEP - Certified Entry-Level Python Programmer"]
            },
            "react": {
                "topics": ["Hooks (useEffect, useContext)", "Redux Toolkit", "Next.js"],
                "projects": ["E-commerce App", "Task Management Dashboard"],
                "certifications": ["Meta Front-End Developer Professional Certificate"]
            },
            "machine learning": {
                "topics": ["Deep Learning basics", "Neural Networks", "NLP", "Reinforcement Learning"],
                "projects": ["Image Classifier", "Sentiment Analysis System"],
                "certifications": ["Stanford Machine Learning Specialization", "TensorFlow Developer Certificate"]
            },
            "sql": {
                "topics": ["Window Functions", "Query Optimization", "Normalization"],
                "projects": ["Inventory Management Database", "Sales Analytics Tool"],
                "certifications": ["Google Data Analytics Professional Certificate"]
            },
            "java": {
                "topics": ["Functional Interfaces", "Streams API", "Multithreading", "JVM Internals"],
                "projects": ["Hospital Management System", "Financial Transaction Processor"],
                "certifications": ["Oracle Certified Professional: Java SE Developer"]
            },
            "spring boot": {
                "topics": ["Spring Security", "Microservices Architecture", "Spring Data JPA", "Spring Cloud"],
                "projects": ["Mini E-commerce API", "Microservices-based Blogging Platform"],
                "certifications": ["Spring Certified Professional"]
            },
            "nodejs": {
                "topics": ["Event Loop", "Streams", "Middleware Design", "Security Best Practices"],
                "projects": ["Real-time Chat App", "Custom CLI Web Scraper"],
                "certifications": ["OpenJS Node.js Application Developer (JSNAD)"]
            },
            "express": {
                "topics": ["Routing", "Error Handling", "Template Engines", "RESTful API Design"],
                "projects": ["REST API for Task Management", "Authentication Middleware Suite"],
                "certifications": ["Meta Back-End Developer Professional Certificate"]
            },
            "mongodb": {
                "topics": ["Aggregation Framework", "Indexing", "Data Modeling", "Sharding"],
                "projects": ["Social Media Data Model", "Content Management System Backend"],
                "certifications": ["MongoDB Certified Developer Associate"]
            },
            "flutter": {
                "topics": ["State Management (Bloc/Provider)", "Animations", "Offline Storage", "Custom Painters"],
                "projects": ["Expense Tracker App", "Weather App with Custom UI"],
                "certifications": ["Google Flutter Application Development Certification"]
            },
            "cybersecurity": {
                "topics": ["Network Security", "Cryptography", "Penetration Testing", "Threat Intel"],
                "projects": ["Basic Port Scanner", "Vulnerability Assessment Lab"],
                "certifications": ["CompTIA Security+", "Certified Ethical Hacker (CEH)"]
            },
            "figma": {
                "topics": ["Auto Layout", "Components & Variants", "Prototyping", "Design Systems"],
                "projects": ["E-commerce App Design", "Portfolio High-fidelity Mockup"],
                "certifications": ["Google UX Design Professional Certificate"]
            },
            "accessibility": {
                "topics": ["WCAG Guidelines", "Screen Reader Testing", "Semantic HTML", "Focus Management"],
                "projects": ["Accessible Dashboard Audit", "Inclusive Navigation Design"],
                "certifications": ["CPACC - Certified Professional in Accessibility Core Concepts"]
            }
        }
        
    def get_recommendations(self, missing_skills):
        recommendations = []
        
        # Priority 1: Skills with defined learning resources
        # Priority 2: Other skills
        known_skills = []
        unknown_skills = []
        
        for skill in missing_skills:
            skill_lower = skill.lower()
            if skill_lower in self.learning_resources:
                res = self.learning_resources[skill_lower]
                known_skills.append({
                    "skill": skill,
                    "topics": res["topics"],
                    "projects": res["projects"],
                    "certifications": res["certifications"],
                    "priority": 1
                })
            else:
                unknown_skills.append({
                    "skill": skill,
                    "topics": [f"Advanced {skill}", f"Best practices in {skill}"],
                    "projects": [f"Personal project applying {skill}"],
                    "certifications": [f"Industry standard certification for {skill}"],
                    "priority": 2
                })
        
        # Combine and cap at 6 recommendations
        combined = known_skills + unknown_skills
        return combined[:6]
