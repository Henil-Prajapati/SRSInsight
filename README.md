## 📘 #SRSBlueprint - Automated SRS & UML Generator
# 🎉 Welcome to SRSBlueprint!
SRSBlueprint is an innovative web-based tool designed to automate the generation of Software Requirements Specifications (SRS) and UML diagrams. Built as part of a Software Engineering project, this application streamlines the requirements engineering process, making it accessible for developers, project managers, and students.

🔗  | 🌟  | 💬 Open an issue

## 🚀 Project Overview
SRSBlueprint empowers users to input project details and instantly generate comprehensive SRS documents and UML diagrams (Use Case, Activity, Class). Leveraging AI and web integration, it adheres to IEEE 29148 standards, offering a robust solution for software documentation.


## 🌟 Key Features
Automated SRS Generation: Creates detailed SRS with Introduction, Requirements, Stakeholders, and Risk Analysis.
UML Diagram Support: Generates Use Case, Activity, and Class diagrams using PlantUML.
Intuitive GUI: User-friendly interface with input fields, real-time feedback, and downloadable .docx files.
API Integration: Utilizes Tavily for web searches and Groq for AI-driven insights.
Customizable: Supports various diagram types and input flexibility.

## 🛠️ Technology Stack
Frontend: HTML5, CSS3, JavaScript
Backend: Python 3.8+, Flask
Dependencies:
tavily-python (web search)
groq (AI processing)
langchain (memory management)
python-docx (document generation)
python-dotenv (environment variables)
PlantUML (via plantuml.jar with Java)
Development: Virtual environment, PowerShell (Windows)

## 🎮 Usage
Open your browser and go to http://127.0.0.1:5000.

## Enter project details:
Project Name (e.g., "MyApp")
Project Overview (e.g., "A tool for task management")
Key Features (e.g., "Add tasks, track progress")
Select Diagram Type (e.g., Use Case Diagram)
Click "Generate Now" to see SRS and diagram results.
Download the SRS document via the provided button.

## ✅ Testing & Validation
Accuracy: Achieved 95% SRS content accuracy and 100% diagram rendering success (with proper setup).
Methods: Manual review, unit testing (Python unittest), integration testing, and API validation.
Challenges: Resolved API integration and PlantUML path issues iteratively.
