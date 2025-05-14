import * as Sentry from '@sentry/nextjs';

interface ErrorContext {
  component?: string;
  action?: string;
  extra?: Record<string, any>;
}

export const trackError = (error: Error, context: ErrorContext = {}) => {
  Sentry.captureException(error, {
    tags: {
      component: context.component || 'Unknown',
      action: context.action || 'Unknown'
    },
    extra: context.extra
  });
};

export const trackMessage = (message: string, level: Sentry.SeverityLevel = 'info', context: ErrorContext = {}) => {
  Sentry.captureMessage(message, {
    level,
    tags: {
      component: context.component || 'Unknown',
      action: context.action || 'Unknown'
    },
    extra: context.extra
  });
};

export const trackPerformance = (name: string, value: number, context: ErrorContext = {}) => {
  Sentry.addBreadcrumb({
    category: 'performance',
    message: name,
    level: 'info',
    data: {
      value,
      ...context.extra
    }
  });
}; 