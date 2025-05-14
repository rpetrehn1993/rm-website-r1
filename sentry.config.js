const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  // Your existing Next.js config
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: "reagan-petrehn",
  project: "portfolio",
};

module.exports = withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions
);

// Sentry performance monitoring configuration
const sentryConfig = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/reaganpetrehn\.com/],
    }),
    new Sentry.Replay(),
  ],
  performance: {
    marks: {
      navigation: {
        threshold: 2000, // 2 seconds
        alert: true,
      },
      'first-contentful-paint': {
        threshold: 2000,
        alert: true,
      },
      'largest-contentful-paint': {
        threshold: 2500,
        alert: true,
      },
    },
    metrics: {
      'cumulative-layout-shift': {
        threshold: 0.1,
        alert: true,
      },
      'total-blocking-time': {
        threshold: 300,
        alert: true,
      },
    },
  },
  alerts: {
    error: {
      threshold: 1,
      window: 3600, // 1 hour
      alert: true,
    },
    performance: {
      threshold: 0.9, // 90% of users
      window: 3600,
      alert: true,
    },
  },
}; 