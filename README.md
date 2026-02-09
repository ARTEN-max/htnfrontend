# Hack the North 2026 Frontend Challenge

A modern, interactive event discovery platform built for Hack the North 2026, featuring a unique cyberpunk aesthetic with smooth animations and intuitive user experience.

## 🚀 Live Demo

[Deployed on Vercel](https://htnfrontend.vercel.app)

## ✨ Features

- **Event Discovery**: Browse all Hack the North events with real-time search functionality
- **Authentication**: Secure login system to access private events (username: `hacker`, password: `htn2026`)
- **Interactive UI**: Cyberpunk-inspired design with animated cards, retro search bar, and smooth transitions
- **Event Details**: Comprehensive event pages with related events navigation
- **Responsive Design**: Fully responsive layout that works on all devices
- **Type-Safe**: Built with TypeScript for type safety and better developer experience

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling
- **Context API** for state management

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ARTEN-max/htnfrontend.git

# Navigate to the project directory
cd htnfrontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## 🎨 Design Highlights

- **Island Terrain Background**: Custom SVG filters creating a unique topographic map aesthetic
- **Cyber Cards**: 3D interactive event cards with tilt effects and particle animations
- **Retro Search Bar**: Vintage terminal-style input with glitch effects
- **Walking Animation**: Animated character that appears on the home page
- **Glassmorphism**: Modern transparent UI elements with backdrop blur effects

## 📝 Writeup

### Part 2: Development Process & Reflection

To help us understand your work and thought process outside of code, please answer the following questions:

---

### 1. Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did you decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?

**Planning & Structure**

When I first received this challenge, I broke it down into clear phases:

1. **Core Functionality First**: I started by implementing the basic requirements - API integration, event listing, authentication, and routing. This ensured a solid foundation before adding any design elements.

2. **Component Architecture**: I organized the codebase into logical components:
   - `Home.tsx` - Main landing page with search and event grid
   - `EventDetail.tsx` - Individual event pages
   - `Login.tsx` - Authentication interface
   - `EventCard.tsx` - Reusable event card component
   - `EventList.tsx` - Event filtering and display logic
   - `DesktopSidebar.tsx` - Navigation component

3. **State Management**: I used React Context API for authentication state, which allowed for clean state sharing across components without prop drilling. The authentication state persists in localStorage for a seamless user experience.

**Tool Selection**

- **React + TypeScript**: Chose React for its component-based architecture and TypeScript for type safety, which caught many potential bugs during development
- **Vite**: Selected Vite over Create React App for its lightning-fast HMR and optimized production builds
- **Tailwind CSS**: Used Tailwind for rapid UI development and consistent styling
- **React Router DOM**: Implemented for client-side routing, enabling smooth navigation without page reloads

**Design Evolution**

The design went through several iterations:

1. **Initial Phase**: Started with a clean, minimal design focusing on functionality
2. **PostHog-Inspired**: Attempted to replicate a desktop OS aesthetic
3. **Colorful Phase**: Added vibrant colors and gradients
4. **Final Cyberpunk Aesthetic**: Settled on a unique cyberpunk/retro-futuristic theme with:
   - Island terrain background using SVG filters
   - Cyber cards with 3D tilt effects
   - Retro search bar with glitch animations
   - Walking animation character
   - Glassmorphism effects

**Problems Encountered & Solutions**

1. **TypeScript Build Errors on Vercel**
   - **Problem**: Initial deployment failed due to TypeScript strict mode catching unused variables and incorrect type assignments
   - **Solution**: Systematically went through all TypeScript errors, removed unused imports, fixed `aria-hidden` attributes (changed from empty strings to `"true"`), and ensured all boolean types were explicitly defined

2. **React Router Navigation**
   - **Problem**: Needed smooth scrolling to specific sections when navigating
   - **Solution**: Implemented `useNavigate` with `setTimeout` to allow React Router to complete navigation before scrolling, and used `scrollIntoView` for smooth section scrolling

3. **Dynamic Layout Based on Search State**
   - **Problem**: Wanted the search bar centered when empty, but positioned normally when searching
   - **Solution**: Used conditional CSS classes based on `hasSearchQuery` state, dynamically adjusting padding and margins

4. **Custom CSS Integration**
   - **Problem**: Integrating complex custom CSS animations (cyber cards, walking animation) while maintaining React component structure
   - **Solution**: Created dedicated CSS classes in `index.css` and carefully integrated them into React components, ensuring proper class names and structure

**Notable Code Areas**

1. **EventCard Component** (`src/components/EventCard.tsx`):
   - Implements a sophisticated 3D tilt effect using a 5x5 grid of invisible trackers
   - Each tracker calculates rotation based on mouse position, creating a realistic 3D effect
   - Includes particle animations, glowing elements, and cyber-style corner decorations

2. **Authentication Context** (`src/contexts/AuthContext.tsx`):
   - Clean, reusable authentication logic
   - Persists state in localStorage
   - Syncs across browser tabs using storage events

3. **API Service** (`src/services/api.ts`):
   - Centralized API logic with proper error handling
   - Type-safe event fetching with TypeScript interfaces

4. **Custom SVG Filters** (`index.html`):
   - Complex fractal noise filters creating the island terrain background
   - Multiple octaves and lighting effects for depth

---

### 2. Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event? Would you add more features and performance metrics? If so, what would they be?

**Requirements Implementation Status**

All core requirements from the challenge have been fully implemented:
- ✅ Display all events from the API, sorted by `start_time`
- ✅ Authentication system with username/password (hacker/htn2026)
- ✅ Private events hidden behind login screen
- ✅ Related events linking and navigation
- ✅ Search functionality (by name, description, or speaker)
- ✅ Responsive design for all devices
- ✅ Event detail pages with full information

**Additional Functionality Already Implemented**

Beyond the core requirements, I've added several enhancements:
- **Advanced Search**: Real-time search filtering as you type
- **Cyberpunk Design System**: Unique visual identity with custom animations
- **3D Interactive Cards**: Event cards with tilt effects and particle animations
- **Smooth Navigation**: Scroll-to-section functionality for better UX
- **Persistent Authentication**: Login state persists across page refreshes
- **Error Handling**: Graceful error states with user-friendly messages
- **Loading States**: Smooth loading animations throughout the app

Given additional time, I would extend this application into a fully functional product with the following features:

**Core Features**

1. **Real-time Updates**
   - WebSocket integration for live event updates
   - Push notifications for event reminders
   - Real-time attendee count

2. **Advanced Search & Filtering**
   - Filter by multiple event types simultaneously
   - Date range picker
   - Location-based filtering
   - Saved search preferences

3. **User Profiles & Personalization**
   - User profiles with avatars
   - Personalized event recommendations based on interests
   - Favorite events list
   - Event attendance tracking
   - Personal schedule builder

4. **Social Features**
   - Event comments and discussions
   - Share events on social media
   - Connect with other attendees
   - Team formation for hackathons

5. **Performance Optimizations**
   - Image lazy loading and optimization
   - Virtual scrolling for large event lists
   - Service worker for offline functionality
   - Code splitting and route-based chunking
   - CDN integration for static assets

6. **Analytics & Metrics**
   - Event popularity tracking
   - User engagement metrics
   - Heat maps for event discovery patterns
   - A/B testing framework for UI improvements

7. **Accessibility Enhancements**
   - Full keyboard navigation support
   - Screen reader optimizations
   - High contrast mode
   - Reduced motion preferences

8. **Internationalization**
   - Multi-language support
   - Timezone handling
   - Localized date/time formatting

9. **Mobile App**
   - React Native version for iOS/Android
   - Native push notifications
   - Offline event data caching

10. **Admin Dashboard**
    - Event management interface
    - Analytics dashboard
    - User management
    - Content moderation tools

**Technical Improvements**

- **Backend Integration**: Connect to a real backend API with authentication, database, and caching
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **CI/CD**: Automated testing and deployment pipelines
- **Monitoring**: Error tracking with Sentry, performance monitoring
- **SEO**: Server-side rendering (Next.js) for better SEO and initial load times

---

### 3. Any other thoughts you have (not limited to the previous questions)

**Design Philosophy**

I wanted to create something that felt both futuristic and nostalgic - hence the cyberpunk aesthetic combined with retro elements like the terminal-style search bar. The island terrain background adds a sense of exploration and discovery, which aligns perfectly with the event discovery theme.

**User Experience Considerations**

- **Progressive Disclosure**: The interface reveals information gradually - search bar first, then events appear below
- **Visual Feedback**: Every interaction has clear visual feedback - hover effects, animations, state changes
- **Error Handling**: Graceful error states with helpful messages
- **Loading States**: Smooth loading animations to keep users engaged

**Technical Decisions**

- **No State Management Library**: Chose Context API over Redux/Zustand because the state is relatively simple and doesn't require complex middleware
- **CSS-in-CSS**: Used traditional CSS files instead of CSS-in-JS for better performance and easier customization of complex animations
- **TypeScript Strict Mode**: Enabled strict TypeScript checking to catch errors early, even though it required more initial setup

**Challenges & Learnings**

This project was a great learning experience in:
- Integrating complex CSS animations with React
- Managing state across multiple components
- TypeScript type safety in a real-world application
- Deployment and build optimization
- Balancing aesthetics with functionality

**What I Would Do Differently**

1. **Start with Design System**: I would establish a design system earlier to ensure consistency
2. **Component Testing**: Add tests earlier in the development process
3. **Performance Monitoring**: Set up performance monitoring from the start
4. **Accessibility Audit**: Conduct accessibility testing earlier

**Conclusion**

This project represents a balance between functionality and creativity. While I focused on meeting all the core requirements, I also took the opportunity to create a unique, memorable user experience. The cyberpunk aesthetic, combined with smooth animations and intuitive interactions, creates an engaging platform that stands out while remaining highly functional.

The codebase is structured for maintainability and scalability, with clear separation of concerns and reusable components. Given more time, I'm confident this foundation could be extended into a production-ready application serving thousands of users.

---




