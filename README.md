# Student Course Management System (SCMS)

A simple **Student Course Management System** built with **React (Vite)**, **Tailwind CSS**, and **JSON Server**.  
It allows administrators to manage **students**, **courses**, and **enrollments** (including assigning grades).

---

## Authors
- Penina Wanyama  
- Samuel Wanjau  
- Sharon Ouko  
- Sylvana Wanjiru  
- Robert Mmasi  

---

## Introduction
A Student Course Management System (SCMS) is a software application designed to manage student information, course details, enrollments, and academic records efficiently.

It helps:
- Administrators manage students and courses
- Students view enrolled courses and results (future enhancement)

---

## Problem Statement
Most academic institutions struggle with keeping student data and course records due to manual processing. This can lead to:
- Data loss
- Duplicate records
- Inconsistencies
- Slow retrieval of academic records

---

## Solution Statement
SCMS provides a platform for managing student and course registrations and enables easy access to consistent and complete information.

---

## Objectives
- Maintain student records
- Manage course details
- Handle course enrollment
- Reduce manual paperwork

---

## Scope of the Project
- Create student and course registration forms (CRUD)
- Read course and student information
- Update course and student information
- Delete course or student information
- Deploy to a web hosting service (future)

---

## Key Features
✅ Students CRUD (Create, Read, Update, Delete)  
✅ Courses CRUD (Create, Read, Update, Delete)  
✅ Enroll students into courses  
✅ View enrollments from both sides:
- Student detail → enrolled courses
- Course detail → enrolled students  
✅ Assign and update grades  
✅ Remove enrollments  

---

## Technologies Used
- **Frontend:** React (Vite)
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Mock Backend:** JSON Server

---
```
## Project Structure
project-root/
│
├── public/
│ └── index.html
│
├── src/
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ ├── Courses.jsx
│ │ ├── CourseDetail.jsx
│ │ ├── AddCourse.jsx
│ │ ├── Students.jsx
│ │ ├── StudentDetail.jsx
│ │ └── AddStudent.jsx
│ │
│ ├── components/
│ │ ├── Layout.jsx
│ │ ├── Navbar.jsx
│ │ ├── Footer.jsx
│ │ ├── StudentCard.jsx
│ │ ├── CourseCard.jsx
│ │ ├── EnrollmentForm.jsx
│ │ ├── EnrollmentTable.jsx
│ │ └── Button.jsx
│ │
│ ├── services/
│ │ └── api.js
│ │
│ ├── App.jsx
│ ├── Main.jsx
│ └── Main.css
│
├── data/
│ └── db.json
│
└── README.md
```
---

## Setup & Installation

### 1) Clone / Download the project
```bash
git clone https://github.com/penina26/student-management-system
cd student-management-system

### 2) Install dependencies
```bash
npm install

### 3) Start JSON Server (Backend)
```bash
npx json-server --watch data/db.json --port 3001

### 4) Start the React App (Frontend)

```bash
npm run dev
