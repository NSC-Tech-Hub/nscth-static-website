# Base Structure Setup

# NSC Tech Hub Static Website

## 📌 Project Overview

NSC Tech Hub is a student-led digital agency at North Seattle College that connects Creative, Business, and Technical disciplines.

This website serves as the marketing site for the NSC Tech Hub. It will help explain the agency, showcase student-led work, and provide a clear public-facing presence for the program.

## ⚙️ Tech Stack

This project uses:

- Astro
- Tailwind CSS
- Cloudflare Pages for deployment

## 🚀 Getting Started

Follow the steps below to run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js, LTS version recommended
- npm or yarn

You can check your versions with:

```bash
node -v
npm -v
```

### Installation

Clone the repository:
git clone https://github.com/NSC-Tech-Hub/nscth-static-website.git

Go into the project folder:
cd nscth-static-website

Install dependencies:
npm install

### Running Locally

Start the local development server:
npm run dev

The app should run at:
http://localhost:4321

### 🏗️ Project Structure

Basic project structure:

src/
  components/
  layouts/
  pages/
  styles/

### Folder Purpose

components/  Reusable UI sections, like headers, footers, and cards
layouts/     Shared page layouts
pages/       Website routes and pages
styles/      Global styles and Tailwind CSS setup

### 🌐 Deployment

This project is planned to be deployed using Cloudflare Pages.
When deployment is configured, the site should auto-deploy when changes are pushed to the main branch.

### 🤝 Contributing

To contribute to this project:

1. Create a new branch for your issue.
2. Make your changes.
3. Test the project locally.
4. Submit a pull request.

Example branch name:
git checkout -b feature/issue-number-description

Before opening a pull request, make sure the project runs locally:
npm run dev

You can also test the production build with:
npm run build
