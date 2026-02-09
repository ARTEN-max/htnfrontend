/**
 * API service for fetching events from Hack the North API
 */

import type { TEvent, TEndpointResponse } from '../types/event';

const API_BASE_URL = 'https://api.hackthenorth.com/v3';

/**
 * Fetches all events from the API
 * @returns Promise resolving to an array of events
 * @throws Error if the API request fails
 */
export async function fetchAllEvents(): Promise<TEvent[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }
    
    const data: TEndpointResponse = await response.json();
    
    // Ensure we always return an array
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

/**
 * Fetches a specific event by ID
 * @param eventId - The ID of the event to fetch (1-15)
 * @returns Promise resolving to the event
 * @throws Error if the API request fails
 */
export async function fetchEventById(eventId: number): Promise<TEvent> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch event ${eventId}: ${response.statusText}`);
    }
    
    const data: TEndpointResponse = await response.json();
    
    // If it's an array, take the first element (shouldn't happen for single event)
    return Array.isArray(data) ? data[0] : data as TEvent;
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    throw error;
  }
}
