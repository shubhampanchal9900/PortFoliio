import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#111827',
            a: {
              color: '#111827',
              textDecoration: 'underline',
              textDecorationColor: '#d1d5db',
              '&:hover': {
                textDecorationColor: '#111827',
              },
            },
            'h1, h2, h3, h4': {
              color: '#111827',
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            code: {
              color: '#111827',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              backgroundColor: 'transparent',
              padding: '0',
              border: 'none',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
            blockquote: {
              borderLeftColor: '#e5e7eb',
              color: '#6b7280',
              fontStyle: 'normal',
            },
            hr: {
              borderColor: '#f3f4f6',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
