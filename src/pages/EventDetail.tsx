/**
 * EventDetail page component
 * Displays detailed information about a specific event
 */

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchEventById, fetchAllEvents } from '../services/api';
import type { TEvent } from '../types/event';
import { formatDate, formatTime, formatEventType } from '../utils/dateUtils';
import { useAuth } from '../contexts/AuthContext';
import { DesktopWindow } from '../components/DesktopWindow';

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [event, setEvent] = useState<TEvent | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvent() {
      if (!id) {
        setError('Invalid event ID');
        setIsLoading(false);
        return;
      }

      const eventId = parseInt(id, 10);
      if (isNaN(eventId) || eventId < 1 || eventId > 15) {
        setError('Invalid event ID. Must be between 1 and 15.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Check if user can view this event
        const fetchedEvent = await fetchEventById(eventId);
        
        if (fetchedEvent.permission === 'private' && !isAuthenticated) {
          setError('This is a private event. Please sign in to view it.');
          setIsLoading(false);
          return;
        }

        setEvent(fetchedEvent);

        // Load related events
        if (fetchedEvent.related_events.length > 0) {
          const allEvents = await fetchAllEvents();
          const related = fetchedEvent.related_events
            .map((relatedId) => allEvents.find((e) => e.id === relatedId))
            .filter((e): e is TEvent => e !== undefined)
            // Filter out private events if user is not authenticated
            .filter((e) => isAuthenticated || e.permission !== 'private');
          setRelatedEvents(related);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event');
        console.error('Error loading event:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [id, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <DesktopWindow title="Loading">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
            <p className="text-gray-600">Loading event...</p>
          </div>
        </DesktopWindow>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <DesktopWindow title="Error" className="max-w-md">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {error || 'Event Not Found'}
            </h2>
            {error?.includes('private') && (
              <Link
                to="/login"
                className="inline-block mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Go to Sign In
              </Link>
            )}
            <button
              onClick={() => navigate('/')}
              className="block mx-auto mt-4 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              Back to Events
            </button>
          </div>
        </DesktopWindow>
      </div>
    );
  }

  const displayUrl = isAuthenticated ? event.private_url : event.public_url || event.private_url;
  const eventTypeColors = {
    workshop: 'bg-blue-500/20 text-blue-300 border border-blue-400/30',
    activity: 'bg-green-500/20 text-green-300 border border-green-400/30',
    tech_talk: 'bg-purple-500/20 text-purple-300 border border-purple-400/30',
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors px-2"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Events
        </Link>

        <DesktopWindow title={event.name}>
          <article>
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-white">{event.name}</h1>
                  {event.permission === 'private' && (
                    <span className="px-3 py-1 text-sm font-semibold bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-400/30">
                      Private
                    </span>
                  )}
                </div>
                <span
                  className={`inline-block px-4 py-2 text-sm font-semibold rounded-full ${
                    eventTypeColors[event.event_type]
                  }`}
                >
                  {formatEventType(event.event_type)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-white mb-2">Date & Time</h2>
              <div className="flex items-center text-white/90">
                <svg
                  className="w-5 h-5 mr-2 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time dateTime={new Date(event.start_time).toISOString()}>
                  {formatDate(event.start_time)} - {formatTime(event.end_time)}
                </time>
              </div>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white mb-2">Speakers</h2>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="text-white/90">{event.speakers.map((s) => s.name).join(', ')}</p>
                </div>
              </div>
            )}

            {event.description && (
              <div>
                <h2 className="text-sm font-semibold text-white mb-2">Description</h2>
                <p className="text-white/90 leading-relaxed">{event.description}</p>
              </div>
            )}

            {displayUrl && (
              <div>
                <a
                  href={displayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
                >
                  View Event Details
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}

            {relatedEvents.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedEvents.map((relatedEvent) => (
                    <Link
                      key={relatedEvent.id}
                      to={`/event/${relatedEvent.id}`}
                      className="block p-4 border border-white/20 rounded-lg hover:border-pink-400/50 hover:bg-white/10 transition-colors bg-white/5"
                    >
                      <h3 className="font-semibold text-white mb-1">
                        {relatedEvent.name}
                      </h3>
                      <p className="text-sm text-white/70">
                        {formatEventType(relatedEvent.event_type)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          </article>
        </DesktopWindow>
      </div>
    </div>
  );
}
