module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        budgets: require('./performance-budget.json'),
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 125000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 300000 }],
        'resource-summary:third-party:count': ['error', { maxNumericValue: 10 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}; 