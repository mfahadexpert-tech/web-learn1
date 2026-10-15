# WebLearn — Web Technologies Learning Platform

> **University Lab Assignment 1**  
> **Course:** Web Technologies  
> **Technology Stack:** Pure HTML5 and CSS3 (100% Static, Zero JavaScript)  
> **Compliance:** Matches **Figure 1 Sample Output** and the university 8-lecture syllabus.

---

## 📖 Project Overview

**WebLearn** is a comprehensive, modern, beginner-friendly educational website created from scratch for university students learning Web Technologies. It faithfully implements the layout demonstrated in **Figure 1**:
- **Homepage:** Features the student profile banner (**Ali Khan | FA21-BCS-001** / customizable to your details) and a styled, responsive table listing all **8 lectures** with functional links.
- **Eight Dedicated Lecture Pages:** Each lecture contains a summary, syllabus topics tree, copyable code block, live browser output rendering, in-depth theoretical notes, common mistakes, viva questions, and sequential navigation.
- **Learning Hub Support Pages:** Additional pages for **Code Examples**, **Reusable Components**, **Viva Voce Preparation**, and **Practice Lab Tasks**.

---

## 📁 Project Folder Structure

```text
WebLearn/
│
├── index.html                  # Homepage (Figure 1 card with 8-lecture table)
├── about.html                  # About project & assignment submission guide
├── examples.html               # Dedicated code examples library
├── components.html             # Reusable UI component library (pure HTML/CSS)
├── viva.html                   # University viva voce preparation guide
├── practice.html               # Practice lab tasks with model solutions
│
├── css/
│   ├── style.css               # Core styling, typography, Figure 1 card & table
│   ├── components.css          # Reusable buttons, forms, cards, alerts, accordions
│   └── responsive.css          # Media queries for tablet & mobile responsiveness
│
├── lectures/
│   ├── lecture1.html           # Introduction to Web Technologies
│   ├── lecture2.html           # HTML Basics
│   ├── lecture3.html           # HTML Forms and Media
│   ├── lecture4.html           # Introduction to CSS
│   ├── lecture5.html           # CSS Selectors
│   ├── lecture6.html           # CSS Box Model & Layout
│   ├── lecture7.html           # Responsive Web Design
│   └── lecture8.html           # Introduction to JavaScript & Advanced Effects
│
└── README.md                   # Complete documentation & submission instructions
```

---

## 🚀 How to Run the Project Locally

### Method 1: Using VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. Open the `WebLearn` folder via **File &rarr; Open Folder...**.
3. Install the **Live Server** extension (by *Ritwick Dey*) if not already installed.
4. Right-click on `index.html` and click **"Open with Live Server"**.
5. The website will automatically launch at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct File Opening
1. Open File Explorer and navigate to `c:\Users\M Dawood\Desktop\web-technologies-lab\WebLearn`.
2. Double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## ✏️ How to Customize Your Student Name & Registration Number

To update the name and registration number shown in the top header of the Figure 1 card:
1. Open `index.html` in your text editor.
2. Locate lines 35–45:
   ```html
   <div class="fig1-header-block">
       <h1 class="fig1-main-title">Web Technologies</h1>
       <p class="fig1-student-meta">Ali Khan | FA21-BCS-001</p>
   </div>
   ```
3. Change `Ali Khan | FA21-BCS-001` to your name and registration number (e.g. `Muhammad Dawood | FA21-BCS-XXX`).
4. Save the file and refresh your browser.

---

## 📸 Preparing Your Assignment PDF Report

Your assignment requires submitting a PDF report with your GitHub repository link and screenshots of the website output:

1. **GitHub Link:** Push your commits to your GitHub repository and include the repository URL on the title page of your report.
2. **Screenshot 1 (Homepage):** Capture the `index.html` page showing the **Web Technologies** blue header card, your name/reg number, and the styled 8-lecture table.
3. **Screenshot 2 (Lecture Page):** Open `lectures/lecture1.html` and capture the top header, summary, nested topics tree, example code block, and rendered output preview (exactly matching Figure 1).
4. **Screenshot 3 (Components / Viva):** Optionally capture `components.html` or `viva.html` to showcase your complete project scope.
5. Export your document as a **PDF** and submit it to your university portal.

---

## 🛡️ Strict University Compliance
- **No JavaScript:** The entire platform functions strictly on static HTML5 and CSS3.
- **No External Frameworks:** Zero Bootstrap, Tailwind, or third-party libraries.
- **Valid Semantic HTML5:** Clean code, properly nested tags, accessible heading hierarchy.
- **Human-Written Code:** Neatly formatted, modular, and easy to explain during your viva exam.
