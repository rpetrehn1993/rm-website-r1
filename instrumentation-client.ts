import * as Sentry from '@sentry/nextjs';

// Keep track of recent events to prevent duplicates
const recentEvents = new Map<string, number>();
const DUPLICATE_WINDOW = 5000; // 5 seconds

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'development',
  release: 'portfolio@1.0.0',
  environment: process.env.NODE_ENV || 'development',
  beforeSend(event) {
    if (!event) return null;

    // Create a unique key for the event
    const eventKey = event.exception 
      ? `error:${event.exception.values?.[0]?.value}`
      : `message:${event.message}`;

    const now = Date.now();
    const lastSeen = recentEvents.get(eventKey);

    // If we've seen this event recently, drop it
    if (lastSeen && now - lastSeen < DUPLICATE_WINDOW) {
      return null;
    }

    // Update the last seen time
    recentEvents.set(eventKey, now);

    // Clean up old entries
    for (const [key, timestamp] of recentEvents.entries()) {
      if (now - timestamp > DUPLICATE_WINDOW) {
        recentEvents.delete(key);
      }
    }

    return event;
  }
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart; 