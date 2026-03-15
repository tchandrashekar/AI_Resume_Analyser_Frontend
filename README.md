AI Resume Analyzer
An AI-powered Resume Analyzer that evaluates resumes, calculates ATS scores, and compares resumes with job descriptions to provide improvement suggestions.

This project demonstrates full-stack development with AI integration, combining backend services, frontend UI, PDF processing, and local AI models.

🚀 Features
📄 Resume Upload & Analysis
Upload resumes in PDF format
Extract resume content using Apache PDFBox
Identify skills present in the resume
Calculate ATS (Applicant Tracking System) score
Generate AI-powered improvement suggestions
🧠 Resume vs Job Description Matching
Upload resume + job description

Identify:

Matched skills
Missing skills
Calculate job match score

Provide AI suggestions to improve hiring chances

📊 Resume Analysis History
Stores previous analyses in the database

Tracks:

Resume file name
Extracted skills
ATS score
Match score
Job description
Timestamp
📑 API Documentation
APIs documented using Swagger UI
🏗️ Tech Stack
Backend
Java
Spring Boot
REST APIs
Apache PDFBox (PDF text extraction)
Swagger (API documentation)
AI Integration
Ollama (local AI runtime)
TinyLlama model for resume analysis
Frontend
React.js
Vite
Database
MySQL
🧠 System Architecture
React Frontend

⬇

Spring Boot REST API

⬇

Resume Service

⬇

AI Service (Ollama + TinyLlama)

⬇

MySQL Database

📌 API Endpoints
1️⃣ Upload Resume
POST /resume/upload

Description: Uploads a resume and returns ATS analysis

Response Example

{ "skills": ["Java", "Spring Boot", "MySQL"], "score": 85, "suggestions": "Add cloud experience such as AWS and highlight microservices architecture projects." }

2️⃣ Resume & Job Description Matching
POST /resume/match

Description: Analyzes resume against a job description.

Response Example

{ "matchedSkills": ["Java", "Spring Boot", "MySQL"], "matchScore": 60, "suggestions": [ "Add Docker containerization experience", "Highlight AWS or cloud exposure", "Mention microservices architecture" ] }

3️⃣ Analysis History
GET /resume/history

Returns stored resume analyses.


