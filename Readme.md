# Research Intern Portal – IIT Guwahati

A full-stack web application designed to streamline collaboration between students and researchers. Built with a modern tech stack and integrated notification system, this portal simplifies the research internship process at IIT Guwahati.

---

## 🚀 Features

-  **Role-Based Access** for students and researchers
-  **Frontend** with React and Tailwind CSS
-  **Backend** using Node.js and Express.js with RESTful API structure
-  **Email/SMS Notifications** via AWS SNS and SES
-  **Swagger API Documentation** for seamless integration
-  **MongoDB** for managing users, applications, and project data

---

##  Tech Stack

| Layer         | Technology              |
|---------------|--------------------------|
| Frontend      | React, Tailwind CSS      |
| Backend       | Node.js, Express.js      |
| Database      | MongoDB                  |
| Notifications | AWS SNS, AWS SES         |
| Docs          | Swagger/OpenAPI          |

---

## ⚙️ Setup Instructions

### 1. Start MongoDB
Make sure your **local MongoDB server** is running.

If a database named `rip-testing` already exists, you can delete it from your MongoDB GUI (e.g., MongoDB Compass) or shell.

---

### 2. Backend Setup

```bash
cd server
npm install         # Install backend dependencies
npm run dev         # Start the backend server (default: http://localhost:5000)
