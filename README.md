# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# 💬 Baat Cheet App

A modern real-time chat application built with **React**, **Firebase**, and custom CSS, featuring user authentication, profile updates, and chat UI with left/right sidebar layouts.

---

## 🗂 Project Structure

```
chat-app/
├── public/
│   ├── favicon_dark.png
│   └── favicon_light.png
├── src/
│   ├── assets/                  # Static assets (images, etc.)
│   ├── components/
│   │   ├── chatBox/             # Main chat UI
│   │   ├── leftSidebar/         # List of users or groups
│   │   └── rightSidebar/        # Profile or chat info panel
│   ├── config/
│   │   └── firebase.js          # Firebase configuration and initialization
│   ├── context/
│   │   └── AppContext.jsx       # Global state context provider
│   ├── lib/
│   │   └── upload.js            # File upload logic
│   ├── pages/
│   │   ├── chat/                # Chat screen
│   │   ├── login/               # Login form
│   │   └── profileUpdate/       # Profile update screen
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🚀 Features

- 🔐 User Authentication (Firebase)
- 🧑‍💼 Profile update screen
- 💬 Real-time chat UI
- 📂 File Upload functionality
- 📁 Organized and modular component structure

---

## ⚙️ Technologies Used

- [React](https://reactjs.org/)
- [Firebase Authentication & Firestore](https://firebase.google.com/) (for authentication and database )
- [Vite](https://vitejs.dev/) (for faster builds)
- Plain CSS (for styling)
- [Supabase Storage](https://supabase.com/) (for media storage)

---

## 🛠 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Install dependencies
```bash
npm install
```

### 4. Start development server
```bash
npm run dev
```


## 📂 Pages Overview

- **Login Page**: `src/pages/login/`
- **Chat Page**: `src/pages/chat/`
- **Profile Update Page**: `src/pages/profileUpdate/`

---


## 📄 License

MIT
