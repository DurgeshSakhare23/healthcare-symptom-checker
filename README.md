# 🩺 HealthAI Pro – Intelligent Symptom Checker  
### _AI-Powered • n8n Workflow • Modern UI • Educational Health Insights_

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/n8n-Automation-red?style=for-the-badge&logo=n8n" />
  <img src="https://img.shields.io/badge/Groq-AI-black?style=for-the-badge&logo=groq" />
  <img src="https://img.shields.io/badge/LLM-Educational-green?style=for-the-badge&logo=openai" />
</p>

---

## ⭐ Overview

**HealthAI Pro** is a modern **AI-based healthcare symptom checker** built using:

- React (Vite)
- TailwindCSS
- Groq AI (LLM)
- n8n (backend workflow automation)

Users enter symptoms → backend analyzes → app shows a clean, structured educational report.

> ⚠️ **Disclaimer:** This tool is ONLY for educational purposes. Not medical advice.

---

# 🖼️ Screenshots

## 🏠 Home Screen  
<img width="1076" height="867" alt="image" src="https://github.com/user-attachments/assets/b11c8d4b-b5b7-471f-a4ca-dac395ac0f19" />

---

## 🧠 AI Result Page  
<img width="611" height="797" alt="image" src="https://github.com/user-attachments/assets/8009b12a-149f-4daa-939b-d1c439dc36a9" />

---

## ⚙️ n8n Backend Workflow  
<img width="860" height="448" alt="image" src="https://github.com/user-attachments/assets/6ab4bae7-6864-47fa-bdd1-27774bf5ea6c" />

---

# 🚀 Features

- 🧠 AI-powered medical-style explanation  
- 🎨 Beautiful premium UI (Tailwind gradients, animations)  
- ⚡ Fast symptom analysis  
- 🔁 Automatic retry logic for failed API calls  
- 🛡 Strong safety disclaimers  
- 📄 Clean formatted output  
- 💻 n8n workflow for backend (easy to modify)

---

# 🧱 Tech Stack

### **Frontend**
- React + Vite  
- TailwindCSS  
- Lucide Icons  
- ReactMarkdown (optional)

### **Backend**
- n8n Workflow  
- Groq LLM  
- Webhook → AI Agent → LLM → Webhook Reply



# 🔌 How It Works
[React App UI]
        |
        |  POST: symptoms
        v
[n8n Webhook Trigger]
        |
        |  Pass symptoms to AI prompt
        v
[Groq Chat Model → AI Analysis]
        |
        v
[n8n Respond to Webhook]
        |
        v
React UI shows formatted readable result

2️⃣ Environment Variables

Create a .env file:

VITE_N8N_WEBHOOK_URL=https://YOUR-N8N-WEBHOOK-URL

ackend (n8n Workflow)

Backend file is included:

backend/n8n-workflow.json

Import steps:

Open n8n

Go to Workflows → Import

Select n8n-workflow.json

Replace placeholder webhook URL

Activate workflow

👨‍💻 Author

Durgesh Sakhare
B-Tech Student • Pune, India
