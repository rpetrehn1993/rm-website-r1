/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#666666',
        accent: '#FF0000',
        background: '#FFFFFF',
        muted: '#F5F5F5',
      },
      fontFamily: {
        degular: ['var(--font-degular)'],
        times: ['var(--font-times)'],
      },
      fontWeight: {
        light: '300',
        medium: '500',
        semibold: '600',
      },
      fontSize: {
        'display-1': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-3': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'heading-1': ['2rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-2': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-3': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'caption': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
      },
    },
  },
  plugins: [],
} 