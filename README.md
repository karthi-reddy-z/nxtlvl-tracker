# 👑 NxtLvl Tracker

**NxtLvl Tracker** is a premium, high-performance productivity application designed for those who value both discipline and elegance. Built with modern web technologies, it provides a seamless experience for managing daily goals, long-term habits, and weekly planning.



---

## ✨ Features

- **🏆 Royal Dashboard**: A sophisticated overview of your productivity, including real-time streak tracking and focus time analytics.
- **📅 Comprehensive Planning**:
  - **Daily Goals**: Prioritize your most important tasks.
  - **Weekly Planner**: Keep your eye on the bigger picture.
  - **Monthly Calendar**: Visualize events and milestones.
- **🔄 Habit Mastery**: Build lasting discipline with our interactive habit tracker.
- **☁️ Cloud Sync**: Real-time data persistence powered by **Cloud Firestore**. 
- **🔐 Secure Authentication**: Private user accounts with **Firebase Auth**.
- **🎨 Elite UI/UX**: Crafted with a "Royal" design system (Navy, Gold, Cream) using **Tailwind CSS** and **Framer Motion**.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠 Getting Started

### Prerequisites
- Node.js 18+ 
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/karthi-reddy-z/nxtlvl-tracker.git
   cd nxtlvl-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a Web App and copy your config into `src/lib/firebase.ts`.
   - Enable **Authentication** (Email/Password) and **Firestore Database**.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

The project is configured for **Firebase Hosting** with a static export:

```bash
npm run build
npx firebase deploy
```

---

## 👑 The "Royal" Design System

The app uses a curated HSL color palette designed for a premium dark-mode experience:

- **Primary**: Navy Blue (`hsl(222, 47%, 11%)`)
- **Accent**: Royal Gold (`hsl(45, 92%, 47%)`)
- **Background**: Deep Onyx (`hsl(222, 47%, 4%)`)

---

## 👤 Author

**Karthi Reddy**
- GitHub: [@karthi-reddy-z](https://github.com/karthi-reddy-z)

---

*Explore the live version at [nxtlvl-tracker.web.app](https://nxtlvl-tracker-qddd.vercel.app/auth/)*
