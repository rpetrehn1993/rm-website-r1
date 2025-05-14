'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We apologize for the inconvenience. Our team has been notified and is working on fixing the issue.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 