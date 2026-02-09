/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Formats a Unix timestamp (ms) into a readable date string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string (e.g., "Jan 15, 2024, 2:30 PM")
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats a Unix timestamp (ms) into a time-only string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats event type for display
 * @param eventType - The event type string
 * @returns Formatted event type (e.g., "tech_talk" -> "Tech Talk")
 */
export function formatEventType(eventType: string): string {
  return eventType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
