'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/types/blog'

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      // Trigger when a heading enters the top 20% of the viewport
      { rootMargin: '0px 0px -80% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-gray-100">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: `${(level - 2) * 12 + 12}px` }}>
            <a
              href={`#${id}`}
              className={`block py-0.5 text-xs leading-snug transition-colors ${
                activeId === id
                  ? 'font-medium text-gray-900'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
