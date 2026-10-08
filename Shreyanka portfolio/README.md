# Shreyanka S. - Portfolio Website

A retro-modern 16-bit pixel art portfolio website engineered for **Shreyanka S.**, an **Electronics and Communication Engineering (ECE)** student at Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru.

Built using **Vanilla HTML5, CSS3, and JavaScript**, adhering strictly to modern web standards, accessibility, responsive design, and pixel-art aesthetics.

---

## 🌟 Key Features & Prompt Checklist

| # | Prompt Item | Implementation Details |
|---|---|---|
| **1** | **Base Structure & Skeleton** | Semantic HTML5 tags (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`), placeholder comments for each section, night mode toggle. |
| **2** | **Hero Section** | Pixel art city & circuit synthwave background, night mode CSS media queries (`prefers-color-scheme`) + manual toggle, dynamic canvas starfield, career status badge, and call-to-actions. |
| **3** | **Vertical Navigation Bar** | Left-anchored vertical navbar with pixel icons, active link tracker, sound effects toggle, CRT scanline toggle, and mobile responsive drawer. |
| **4** | **About Me Section** | Dual-avatar switcher allowing visitors to toggle between Shreyanka's real photograph and an 8-bit retro pixel avatar. Comprehensive bio and academic highlights. |
| **5** | **Skills Section** | Visual progress bars styled as retro 8-bit HP/XP bars, categorized by Programming, Microcontrollers, Core ECE, and Creative 3D design, plus interactive inventory tag cloud. |
| **6** | **Interactive Timeline** | Chronological journey (2025–2029 B.E. Degree, Smart Gas Detection Project, 3D Animated Video, Achievements) with hover effects and milestone badges. |
| **7** | **Projects Section** | Clickable project thumbnails opening detailed modals with technical specifications, component lists, firmware logic, and circuit notes. |
| **8** | **Embedded YouTube Video** | Responsive 16:9 video container inside a pixel CRT bezel with status LEDs and technical breakdown caption. |
| **9** | **Testimonials** | Academic and peer endorsements housed in rounded pixel cards with subtle drop shadows and star ratings. |
| **10** | **AI Chat Interface** | "Ask AI Shreyanka" interactive chat simulator with quick query chips, typing indicator, resume knowledge base, and commented hooks for OpenAI/Gemini API integration. |
| **11** | **Contact Form** | High-contrast pixel submit button, client-side input validation, feedback alerts, copy email button, and commented hooks for Resend API integration. |
| **12** | **Social Links in Footer** | Pixel icons for LinkedIn, GitHub, Email, and Phone with accessibility attributes (`aria-label`) and hover micro-animations. |
| **13** | **Responsive Design** | Optimized breakpoints for Mobile (<768px), Tablet (768px-1024px), and Desktop (>1024px) with mobile drawer navigation. |
| **14** | **Visual Enhancements** | Subtle glowing borders, glassmorphic backdrop filters, custom pixel shadows, Web Audio 8-bit sound effects synthesizer, and CRT scanlines. |
| **15** | **Testing & Publishing** | Standalone static structure ready for GitHub Pages or Vercel. |

---

## 🚀 How to Run Locally

You can run this project with any static file server:

### Option 1: Direct File
Simply double-click `index.html` to open it directly in your web browser (Chrome, Edge, Firefox, Brave).

### Option 2: Live Server / VS Code
Open the folder `Shreyanka portfolio` in VS Code and click **Go Live** with the Live Server extension.

### Option 3: PowerShell Static Server
Run the included `server.ps1` script:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Then navigate to `http://localhost:8080/`.

---

## 🌐 Deployment to GitHub Pages

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Shreyanka S. pixel portfolio website"
   ```
2. **Push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub.
   - Click on **Pages** in the left sidebar.
   - Under **Source**, select `Deploy from a branch` -> `main` branch -> `/ (root)`.
   - Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
