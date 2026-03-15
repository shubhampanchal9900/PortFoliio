import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import { constructMetadata } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Contact — Shubham Panchal',
  description: 'Get in touch with Shubham Panchal.',
})

const contacts = [
  {
    label: 'Email',
    value: 'shubhampanchal9900@gmail.com',
    href: 'mailto:shubhampanchal9900@gmail.com',
  },
  {
    label: 'Phone',
    value: '+91-7387519591',
    href: 'tel:+917387519591',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/shubhampanchal9900',
    href: 'https://linkedin.com/in/shubhampanchal9900',
  },
  {
    label: 'GitHub',
    value: 'github.com/shubhampanchal9900',
    href: 'https://github.com/shubhampanchal9900',
  },
]

export default function Contact() {
  return (
    <Container className="py-20">
      <div className="max-w-sm space-y-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Contact
          </h1>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            The best way to reach me is email. I&apos;m also available on
            LinkedIn and GitHub. Based in Pune, India. I typically respond
            within 48 hours.
          </p>
        </div>

        <div className="space-y-2">
          {contacts.map(({ label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={
                href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
              }
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300 group"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{value}</p>
              </div>
              <span className="text-gray-300 transition-colors group-hover:text-gray-600">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}
