/**
 * Desktop Sidebar component
 * Radio button style sidebar - Top navigation
 */

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const allItems = [
    {
      id: 'home',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'home',
      path: '/',
    },
    {
      id: 'events',
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      label: 'events',
      path: '/',
    },
    ...(isAuthenticated
      ? [
          {
            id: 'signout',
            icon: (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            ),
            label: 'sign out',
            onClick: logout,
          },
        ]
      : [
          {
            id: 'signin',
            icon: (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            ),
            label: 'sign in',
            path: '/login',
          },
        ]),
  ];

  const radioName = 'top-nav';

  const getButtonLabel = (id: string) => {
    switch (id) {
      case 'home':
        return 'Home';
      case 'events':
        return 'Events';
      case 'signout':
        return 'Sign Out';
      case 'signin':
        return 'Sign In';
      default:
        return id;
    }
  };

  const getButtonGlitch = (id: string) => {
    switch (id) {
      case 'home':
        return '_Home_';
      case 'events':
        return '_Events_';
      case 'signout':
        return '_Sign_Out_';
      case 'signin':
        return '_Sign_In_';
      default:
        return `_${id}_`;
    }
  };

  const getButtonNumber = (index: number) => {
    return `r${index + 1}`;
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="cyber-radio-container">
        {allItems.map((item, index) => {
          const isChecked = Boolean(item.path && location.pathname === item.path);
          const buttonId = `${item.id}-top`;

          const handleClick = (e?: React.MouseEvent) => {
            if (e) {
              e.preventDefault();
            }
            
            if (item.id === 'home' && item.path === '/') {
              // Navigate to home first if not already there
              if (location.pathname !== '/') {
                navigate('/');
                // Wait a bit for navigation, then scroll to top
                setTimeout(() => {
                  window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                  });
                }, 100);
              } else {
                // Already on home, just scroll to top
                window.scrollTo({ 
                  top: 0, 
                  behavior: 'smooth' 
                });
              }
            } else if (item.id === 'events' && item.path === '/') {
              // Navigate to home first if not already there
              if (location.pathname !== '/') {
                navigate('/');
                // Wait a bit for navigation, then scroll
                setTimeout(() => {
                  const eventsSection = document.getElementById('events-section');
                  if (eventsSection) {
                    eventsSection.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start' 
                    });
                  }
                }, 100);
              } else {
                // Already on home, just scroll
                const eventsSection = document.getElementById('events-section');
                if (eventsSection) {
                  eventsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }
              }
            } else if (item.path) {
              navigate(item.path);
            } else if (item.onClick) {
              item.onClick();
            }
          };

          if (item.path) {
            return (
              <div key={item.id} className="cyber-radio-wrapper">
                <input
                  className="cyber-input"
                  type="radio"
                  id={buttonId}
                  name={radioName}
                  checked={isChecked}
                  onChange={() => {}} // Controlled component
                  onClick={handleClick}
                />
                <label htmlFor={buttonId} className="cursor-pointer block w-full h-full">
                  <div className="cyber-btn">
                    <span aria-hidden="true">_</span>
                    {getButtonLabel(item.id)}
                    <span className="cyber-btn__glitch" aria-hidden="true">
                      {getButtonGlitch(item.id)}
                    </span>
                    <span className="cyber-btn__number">{getButtonNumber(index)}</span>
                  </div>
                </label>
              </div>
            );
          }

          return (
            <div key={item.id} className="cyber-radio-wrapper">
              <input
                className="cyber-input"
                type="radio"
                id={buttonId}
                name={radioName}
                onChange={() => {}} // Controlled component
                onClick={handleClick}
              />
              <label htmlFor={buttonId} onClick={handleClick} className="cursor-pointer block w-full h-full">
                <div className="cyber-btn">
                  <span aria-hidden="true">_</span>
                  {getButtonLabel(item.id)}
                  <span className="cyber-btn__glitch" aria-hidden="true">
                    {getButtonGlitch(item.id)}
                  </span>
                  <span className="cyber-btn__number">{getButtonNumber(index)}</span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
