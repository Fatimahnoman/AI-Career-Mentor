# AI Career Mentor

A modern full-stack web application built with Next.js 15, TypeScript, and Tailwind CSS to help users navigate their career paths using AI-driven insights.

## Features

- **Modern UI:** Built with Tailwind CSS for a sleek, responsive design.
- **Dark/Light Mode:** Seamless theme switching with `next-themes`.
- **Landing Page:** Professional hero section and feature highlights.
- **Dashboard:** Personalized overview with career stats and goals.
- **AI Chat:** Interactive mentor interface for career guidance.
- **Scalable Architecture:** Clean folder structure using Next.js App Router.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Theming:** next-themes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory and add your variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# Add AI Service Keys here
```

## Folder Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI and layout components.
- `src/lib`: Utility functions and configurations.
- `src/hooks`: Custom React hooks.
- `src/types`: TypeScript definitions.

## License

This project is licensed under the MIT License.
