/**
 * Header component for navigation and user actions
 * PostHog-inspired top navigation bar
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-transparent border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-xl font-bold text-white hover:text-pink-200 transition-colors flex items-center gap-2"
            >
              <span className="text-2xl">🚀</span>
              <span>Hack the North</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                Events
              </Link>
              <a
                href="#"
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                Schedule
              </a>
              <a
                href="#"
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                Resources
              </a>
              <a
                href="#"
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                About
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <span className="text-sm text-white/90 hidden sm:inline">
                Welcome back! 👋
              </span>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Get started
                </Link>
              </>
            )}
            <button
              className="p-2 text-white/90 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              className="p-2 text-white/90 hover:text-white transition-colors"
              aria-label="Help"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
