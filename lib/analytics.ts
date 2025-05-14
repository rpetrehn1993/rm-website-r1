type EventName = 'page_view' | 'button_click' | 'form_submit' | 'asset_load' | 'error';

interface EventData {
  name: EventName;
  properties?: Record<string, any>;
  timestamp?: string;
}

class Analytics {
  private static instance: Analytics;
  private events: EventData[] = [];

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  trackEvent(event: EventData) {
    this.events.push({
      ...event,
      timestamp: new Date().toISOString(),
    });

    // In production, this would send to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  trackPageView(url: string) {
    this.trackEvent({
      name: 'page_view',
      properties: {
        url,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      },
    });
  }

  trackError(error: Error) {
    this.trackEvent({
      name: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
      },
    });
  }

  getEvents() {
    return this.events;
  }
}

export const analytics = Analytics.getInstance(); 