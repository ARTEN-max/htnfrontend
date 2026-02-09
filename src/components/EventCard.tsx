/**
 * EventCard component for displaying individual event information
 * Cyber card design with 3D effects
 */

import { Link } from 'react-router-dom';
import type { TEvent } from '../types/event';
import { formatDate, formatTime, formatEventType } from '../utils/dateUtils';
import { useAuth } from '../contexts/AuthContext';

interface EventCardProps {
  event: TEvent;
  allEvents: TEvent[];
}

export function EventCard({ event, allEvents }: EventCardProps) {
  const { isAuthenticated } = useAuth();

  // Get related events data
  const relatedEvents = event.related_events
    .map((id) => allEvents.find((e) => e.id === id))
    .filter((e): e is TEvent => e !== undefined)
    .filter((e) => isAuthenticated || e.permission !== 'private');

  const displayUrl = isAuthenticated ? event.private_url : event.public_url || event.private_url;

  // Event type colors for gradient
  const eventTypeGradients = {
    workshop: 'linear-gradient(45deg, #00ffaa, #00a2ff)',
    activity: 'linear-gradient(45deg, #ffd700, #ff7f50)',
    tech_talk: 'linear-gradient(45deg, #ad51ff, #5c67ff)',
  };

  // Generate tracker elements for 3D effect
  const trackers = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="cyber-card-container noselect" style={{ width: '100%', minHeight: '400px' }}>
      <div className="cyber-card-canvas">
        {trackers.map((num) => (
          <div
            key={num}
            className="cyber-tracker"
            onMouseEnter={(e) => {
              const card = e.currentTarget.closest('.cyber-card-container')?.querySelector('.cyber-card') as HTMLElement;
              if (card) {
                const row = Math.floor((num - 1) / 5);
                const col = (num - 1) % 5;
                const rotateX = (row - 2) * 10;
                const rotateY = (col - 2) * 10;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget.closest('.cyber-card-container')?.querySelector('.cyber-card') as HTMLElement;
              if (card) {
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
              }
            }}
          />
        ))}
      </div>
      
      <div className="cyber-card">
        <div className="cyber-card-content">
          <div className="cyber-card-glare"></div>
          
          <div className="cyber-lines">
            <span></span><span></span><span></span><span></span>
          </div>
          
          <div className="glowing-elements">
            <div className="glow-1"></div>
            <div className="glow-2"></div>
            <div className="glow-3"></div>
          </div>
          
          <div className="corner-elements">
            <span></span><span></span><span></span><span></span>
          </div>
          
          <div className="scan-line"></div>
          
          <div className="card-particles">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
          
          {/* Event Content */}
          <div className="flex flex-col h-full justify-between relative z-10">
            <div>
              <div className="mb-3">
                <div
                  className="text-2xl font-extrabold mb-2"
                  style={{
                    background: eventTypeGradients[event.event_type],
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 15px rgba(0, 255, 170, 0.3))',
                    textShadow: '0 0 10px rgba(92, 103, 255, 0.5), 0 0 20px rgba(92, 103, 255, 0.3)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '-0.02em',
                  }}
                >
                  {event.name}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{
                      background: eventTypeGradients[event.event_type],
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: '0.05em',
                    }}
                  >
                    {formatEventType(event.event_type)}
                  </span>
                  {event.permission === 'private' && (
                    <span className="text-xs font-semibold text-yellow-300">
                      🔒 Private
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <div className="flex items-center text-white/80">
                  <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={new Date(event.start_time).toISOString()} className="font-medium">
                    {formatDate(event.start_time)} - {formatTime(event.end_time)}
                  </time>
                </div>
                
                {event.speakers && event.speakers.length > 0 && (
                  <div className="flex items-center text-white/80">
                    <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">{event.speakers.map((s) => s.name).join(', ')}</span>
                  </div>
                )}
              </div>
              
              {event.description && (
                <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                  {event.description}
                </p>
              )}
            </div>
            
            <div className="mt-auto">
              {displayUrl && (
                <a
                  href={displayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  View Details
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              
              {relatedEvents.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-white/50 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Related:</div>
                  <div className="flex flex-wrap gap-1">
                    {relatedEvents.slice(0, 2).map((relatedEvent) => (
                      <Link
                        key={relatedEvent.id}
                        to={`/event/${relatedEvent.id}`}
                        className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {relatedEvent.name.length > 15 ? relatedEvent.name.substring(0, 15) + '...' : relatedEvent.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
