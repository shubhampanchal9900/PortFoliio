import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import { constructMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata({
  title: 'About — Shubham Panchal',
  description:
    'Backend engineer with 3+ years of experience designing scalable distributed systems in enterprise and financial environments.',
})

const stack = [
  'Java',
  'Go',
  'Spring Boot',
  'Kafka',
  'Temporal',
  'Kubernetes',
  'Docker',
  'gRPC',
  'PostgreSQL',
  'Redis',
  'Microservices',
  'Linux',
]

const links = [
  { label: 'GitHub', href: siteConfig.github },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'Email', href: `mailto:${siteConfig.email}` },
]

export default function About() {
  return (
    <Container className="py-20">
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            About
          </h1>
          <p className="mt-4 text-gray-500 leading-relaxed">
            I&apos;m Shubham Panchal — a backend engineer with 3+ years of
            experience designing scalable distributed systems in enterprise and
            financial environments. I specialize in Java, Spring Boot, and
            microservices architecture, with a strong focus on reliability,
            fault tolerance, and system design.
          </p>
          <p className="mt-3 text-gray-500 leading-relaxed">
            I&apos;ve built high-volume financial platforms and distributed
            processing services, working with technologies like Kafka, Temporal,
            and Kubernetes. I gravitate toward hard infrastructure problems —
            consensus algorithms, event-driven pipelines, and distributed
            coordination. Based in Pune, India.
          </p>
          <p className="mt-3 text-gray-500 leading-relaxed">
            Outside of work, I explore distributed systems fundamentals through
            hands-on implementations — building Raft-based key-value stores and
            MapReduce frameworks from scratch to deeply understand the
            underlying mechanics.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-1.5">
            {stack.map((tech) => (
              <span key={tech} className="font-mono text-sm text-gray-500">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            Links
          </h2>
          <ul className="space-y-2.5">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="text-sm text-gray-500 underline underline-offset-4 decoration-gray-200 hover:text-gray-900 hover:decoration-gray-500 transition-colors"
                >
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
