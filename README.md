# Hack the North 2026 Frontend Developer Challenge

A beautiful, responsive web application for displaying Hack the North events with authentication, search, and filtering capabilities.

## Features

✅ **Core Requirements:**
- Display all events from the Hack the North API
- Sort events by start_time
- Authentication system (username: `hacker`, password: `htn2026`)
- Private events hidden behind login
- Related events linking and navigation

✨ **Additional Features:**
- Search events by name, description, or speaker
- Filter events by type (workshop, activity, tech_talk)
- Responsive design for mobile, tablet, and desktop
- Accessible UI with ARIA labels and keyboard navigation
- Event detail pages with full information
- Beautiful, modern UI with Tailwind CSS

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Fetch API** - HTTP requests

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── EventCard.tsx
│   ├── EventList.tsx
│   ├── Header.tsx
│   └── Login.tsx
├── contexts/         # React contexts
│   └── AuthContext.tsx
├── pages/           # Page components
│   ├── Home.tsx
│   └── EventDetail.tsx
├── services/        # API services
│   └── api.ts
├── types/           # TypeScript type definitions
│   └── event.ts
├── utils/           # Utility functions
│   └── dateUtils.ts
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Authentication

- **Username:** `hacker`
- **Password:** `htn2026`

Authentication state is persisted in localStorage, so you'll stay logged in across page refreshes.

## API Endpoints

The application uses the Hack the North API:
- `GET https://api.hackthenorth.com/v3/events` - Fetch all events
- `GET https://api.hackthenorth.com/v3/events/:id` - Fetch a specific event

## Development Notes

- All components are fully typed with TypeScript
- Code is documented with JSDoc comments
- Follows React best practices and hooks patterns
- Responsive design using Tailwind's responsive utilities
- Accessibility features include ARIA labels and keyboard navigation

## Deployment

This project can be deployed to:
- **Vercel:** Connect your GitHub repo and deploy automatically
- **Netlify:** Drag and drop the `dist` folder or connect via Git
- **Any static hosting service:** Build the project and upload the `dist` folder

## License

This project is created for the Hack the North 2026 Frontend Developer Challenge.
