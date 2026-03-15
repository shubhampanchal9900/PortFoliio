'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="py-5 border-b border-gray-100">
      <Container className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className="font-semibold text-sm tracking-tight text-gray-900 hover:text-gray-500 transition-colors flex-shrink-0"
        >
          bighead.in
        </Link>
        <nav>
          <ul className="flex items-center gap-6 whitespace-nowrap">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm transition-colors ${
                    pathname === href || pathname.startsWith(href + '/')
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
