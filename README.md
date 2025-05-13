# SkillHub – Skill Sharing & Learning Platform

A full-stack web application where users can share their skills, track learning progress, and generate personalized learning plans using AI. Built with **Spring Boot** for backend and **ReactJS** for frontend.

---

## 📌 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [AI-Powered Learning Plan](#ai-powered-learning-plan)
* [Architecture](#architecture)
* [Getting Started](#getting-started)

  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [API Endpoints](#api-endpoints)
* [Authentication](#authentication)
* [Project Structure](#project-structure)
* [Contributors](#contributors)
* [License](#license)

---

## Features

* 📸 **Skill Sharing Posts**: Upload up to 3 photos or 30-sec videos with descriptions.
* 📈 **Learning Progress Updates**: Post learning updates using various predefined templates.
* 📕 **Learning Plan Management**: Create and track structured learning plans.
* 💬 **Commenting & Likes**: Engage with others through likes and comments.
* 👤 **User Profiles & Following**: Public profiles, follow system.
* 🔐 **OAuth 2.0 Login**: Secure login with Google.

---

## AI-Powered Learning Plan

We use **Google's Gemini API** to generate customized learning plans based on user goals.

Steps:

1. User enters learning goal (e.g., “Learn Java Basics”), timeframe (e.g., “4 weeks”) and Optional details like experience level.
2. Request is sent to Gemini API.
3. Gemini responds with structured plan.
4. User can edit and save the generated plan.

> The generated plan can be customized and tracked through the platform.

---

## Tech Stack

| Technology   | Usage                    |
| ------------ | ------------------------ |
| Spring Boot  | REST API                 |
| ReactJS      | Frontend Web App         |
| MySQL        | Relational Database      |
| Firebase     | Auth & Media Storage     |
| Gemini API   | AI-based plan generation |
| OAuth 2.0    | Google login             |
| Git + GitHub | Version control          |

---

## Architecture

```
[Client - React] ↔ [REST API - Spring Boot] ↔ [MySQL DB]
       ↓                      ↓
[Firebase Storage]       [Gemini API for AI Plans]
```

---

## Getting Started

```bash
git clone https://github.com/OsinduV/skill-flow-springboot-react.git
cd skill-flow-springboot-react
````

### 🛆 Backend Setup

1. **Start MySQL** and create a database:

   ```sql
   CREATE DATABASE skill_flow_db;
   ```

2. **Update credentials** in `application.properties`:

   ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   gemini.api.key=your_gemini_api_key_here
   ```

3. **Run the backend**:

   ```bash
   cd api
   ./mvnw spring-boot:run
   ```

### 🌐 Frontend Setup

1. Create a `.env` file inside the `/frontend` folder with:

   ```env
   VITE_OSINDU_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_API_BASE_URL="http://localhost:9000"
   ```

2. Install dependencies and start:

   ```bash
   cd client
   npm install
   npm start
   ```

---

## Authentication

* Login via Google using Firebase Authentication.
* JWT token passed from frontend to backend.

---

## Project Structure

```
skill-flow-springboot-react/
├── api/               # Spring Boot backend (API)
├── client/            # ReactJS frontend (Client)
└── README.md          # Project documentation
```

---

## Contributors

### Vimukthi P L D O – IT22894656 – Learning Progress & Profiles

* Implemented the Learning Progress Update feature with predefined templates (e.g., completed tutorials, skills learned).
* Enabled media uploads (images/videos) in progress entries using Firebase Storage.
* Developed User Profile pages showcasing user activity and skill-sharing posts.
* Built the Follow System for social engagement.
* Integrated OAuth 2.0 Authentication using Firebase Authentication.
* Introduced a unique AI-powered learning plan generation feature using Google’s Gemini API, where users can input a goal, experience level, and preferences to generate and customize structured learning plans.

### Ransana G Y – IT22900340 – Skill Sharing Posts

* Developed the Skill Sharing Posts module.
* Enabled uploading of up to three photos or short videos (max 30s) per post.
* Allowed users to add meaningful descriptions to accompany their shared content.

### Yasanjith B G T H – IT22216250 – Learning Plan Management

* Built the Learning Plan module where users can create, update, and manage structured learning goals.
* Enabled the creation of individual learning items with topics, deadlines, and resources.
* Designed logic for plan completion tracking based on item status.

### Eshan U G R – IT22258212 – Interactivity & Engagement

* Developed the Like and Comment System for posts.
* Implemented comment editing, user-deletion, and post-owner moderation features.
* Enhanced community interaction and feedback loops within the platform.

---

## License

This project is part of the **IT3030 Programming Applications & Frameworks Assignment 2025** at **SLIIT**.

---

> ✨ Built for education. AI code assistance via Gemini & ChatGPT.
