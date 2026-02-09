/**
 * EventList component for displaying and filtering events
 * Handles search, filtering, and sorting of events
 */

import { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { TEvent } from '../types/event';
import { EventCard } from './EventCard';
import { DesktopWindow } from './DesktopWindow';

interface EventListProps {
  events: TEvent[];
  isLoading?: boolean;
  searchQuery?: string;
}

export function EventList({ events, isLoading, searchQuery: externalSearchQuery }: EventListProps) {
  const { isAuthenticated } = useAuth();
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;

  // Filter events based on authentication and search
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events;

    // Filter by authentication status
    if (!isAuthenticated) {
      filtered = filtered.filter((event) => event.permission !== 'private');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.speakers.some((speaker) =>
            speaker.name.toLowerCase().includes(query)
          )
      );
    }

    // Sort by start_time
    return [...filtered].sort((a, b) => a.start_time - b.start_time);
  }, [events, isAuthenticated, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="text-sm text-white/80 px-2">
        Showing {filteredAndSortedEvents.length} of {events.length} events
        {!isAuthenticated && (
          <span className="ml-2 text-pink-300">
            (Sign in to view private events)
          </span>
        )}
      </div>

      {/* Events Grid */}
      {filteredAndSortedEvents.length === 0 ? (
        <DesktopWindow title="No Events Found">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 font-medium">No events found</p>
            <p className="text-gray-500 text-sm mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </DesktopWindow>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedEvents.map((event) => (
            <EventCard key={event.id} event={event} allEvents={events} />
          ))}
        </div>
      )}
    </div>
  );
}
