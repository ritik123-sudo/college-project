# BizGenius AI – Small Business OS  
**Live Demo:** [https://college-project-two-orcin.vercel.app](https://college-project-two-orcin.vercel.app)


> **"What if small business owners had the same AI tools as the Fortune 500?"**

## 📖 About The Project

**BizGenius AI** is a comprehensive frontend simulation of a SaaS platform designed to help small businesses manage their operations using Artificial Intelligence.

Unlike typical static dashboards, this project focuses on **interactivity** and **simulated AI behavior**. It demonstrates how modern interfaces can visualize complex data (like price elasticity and demand forecasting) in a way that feels magical and intuitive.

I built this project to master **Next.js App Router**, **Complex State Management**, and **Data Visualization**.

---

## 📂 Project Structure

Here is the architectural overview of the application:

```bash
college-project/
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Next.js App Router (Pages)
│   │   ├── dashboard/       # Main Overview & Activity Feed
│   │   ├── finance/         # Budgeting & Expense Tracking
│   │   ├── inventory/       # Stock Tracking & Predictions
│   │   ├── marketing/       # AI Content Generator
│   │   ├── pricing/         # Price Elasticity Simulator
│   │   ├── support/         # Customer Chat Interface
│   │   ├── globals.css      # Global Styles & Tailwind Imports
│   │   ├── layout.tsx       # Root Layout (Sidebar + Mobile Nav + Toaster)
│   │   └── page.tsx         # Landing Page
│   │
│   ├── components/          # Reusable UI Blocks
│   │   ├── charts/          # Recharts (ExpensePieChart, PredictionChart)
│   │   ├── features/        # Complex Interactive Components
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MarketingGenerator.tsx
│   │   │   └── PriceSimulator.tsx
│   │   ├── layout/          # Navigation Components
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   └── ui/              # UI Atoms (MetricCard)
│
├── .eslintrc.json           # Linting Rules
├── .gitignore               # Git Ignore Rules
├── next.config.mjs          # Next.js Configuration
├── package.json             # Project Dependencies
├── postcss.config.mjs       # PostCSS Config (Tailwind Processor)
├── tailwind.config.ts       # Tailwind CSS Configuration
└── tsconfig.json            # TypeScript Configuration

```
## ✨ Key Features

### 📊 1. The Executive Dashboard
A high-level view of the business health.
- **Real-time Activity Feed:** Live updates on orders and alerts.
- **Trend Indicators:** Visual cues for revenue and user growth.

### 📦 2. AI Inventory Intelligence
Not just a spreadsheet, but a predictive engine.
- **Demand Forecasting:** A line chart that predicts stock depletion based on historical data.
- **Smart Alerts:** Automatically flags "Critical" low-stock items (e.g., *Premium Arabica Beans*).
- **One-Click Reorder:** Interactive toast notifications when restocking.

### 💰 3. Finance & Budgeting
Visualizing where the money goes.
- **Expense Breakdown:** A vibrant, color-coded Pie Chart showing cost distribution.
- **Anomaly Detection:** The system flags "Unusual" transactions automatically (simulated AI audit).

### 🎛️ 4. Price Elasticity Simulator (Interactive)
The star feature of the app.
- **Dynamic Pricing Engine:** Users can drag a slider to adjust product prices.
- **Real-time Math:** As price changes, the app instantly calculates projected Demand, Revenue, and Profit based on a simulated elasticity curve.
- **Competitor Analysis:** Compares your prices against market rivals.

### ✍️ 5. Generative AI Marketing Studio
A simulation of a Large Language Model (LLM).
- **The "Typing Effect":** Simulates an AI writing social media posts in real-time.
- **Multi-Platform Support:** Generates content tailored for Instagram, Twitter, and LinkedIn.

### 💬 6. Unified Customer Support Inbox
A centralized chat interface.
- **AI Suggested Replies:** The system "reads" messages and drafts responses automatically.
- **Sentiment Analysis:** Tags incoming chats as "Complaints," "Inquiries," or "Resolved."

---

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS (Responsive & Modern)
* **Charts:** Recharts (Data Visualization)
* **Icons:** Lucide React
* **Notifications:** React Hot Toast
* **Language:** TypeScript

---

## 🚀 Getting Started

Want to run this locally? Follow these steps:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/ritik123-sudo/college-project.git](https://github.com/ritik123-sudo/college-project.git)
   cd college-project
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action.

---

## Future Improvements

While the frontend is complete, here is what I would add next:

* **Backend Integration:** Connect to a Supabase/PostgreSQL database to store real transactions.
* **Real AI:** Integrate the OpenAI API to replace the simulated text generation with actual GPT-4 responses.
* **Auth:** Add login functionality.

 ---

## Responsiveness

This app is fully responsive!

* **Desktop:** Features a persistent sidebar for easy navigation.
* **Mobile:** Automatically switches to a collapsible "Hamburger Menu" and stackable layouts for seamless use on phones.

---

## What I Learned

Building BizGenius AI taught me how to move beyond simple "CRUD" apps. I learned:

* How to structure a **Next.js App Router** project for scalability.
* How to make charts **dynamic** (updating based on user input).
* The importance of **Micro-Interactions** (toast notifications, typing effects) in user experience.
* How to design a clean, professional UI using **Tailwind** utility classes.

