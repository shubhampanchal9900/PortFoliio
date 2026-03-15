import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import BlogCard from '@/components/blog/BlogCard'
import ProjectCard from '@/components/projects/ProjectCard'
import type { Project } from '@/components/projects/ProjectCard'
import { getFeaturedPosts } from '@/lib/blog'
import { constructMetadata } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata()

const featuredProjects: Project[] = [
  {
    title: 'Distributed Raft Key-Value Store',
    description:
      'Implementation of a distributed key-value store using the Raft consensus algorithm. Supports leader election, log replication, and fault-tolerant state machine replication across nodes.',
    tech: ['Go', 'gRPC', 'Distributed Systems', 'Consensus Algorithms'],
    github: 'https://github.com/shubhampanchal9900/raft-kv',
  },
  {
    title: 'MapReduce Distributed Processing Framework',
    description:
      'Simplified MapReduce framework for distributed data processing. Supports task scheduling, worker coordination, and fault recovery with task retry on failure.',
    tech: ['Go', 'Distributed Systems', 'RPC'],
    github: 'https://github.com/shubhampanchal9900/mapreduce',
  },
  {
    title: 'Distributed Document Extraction Platform',
    description:
      'Microservice-based document extraction pipeline that processes OCR documents across upload, extraction, validation, and callback routing services.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'Microservices'],
    github: 'https://github.com/shubhampanchal9900/doc-extraction-platform',
  },
]

export default function Home() {
  const latestPosts = getFeaturedPosts(3)

  return (
    <Container className="py-20 space-y-20">
      {/* Hero */}
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
          Backend Engineer Building
          <br />Distributed Systems
        </h1>
        <p className="mt-5 max-w-lg text-gray-500 leading-relaxed">
          I design and build reliable distributed systems, backend platforms,
          and high-throughput microservices. 3+ years of engineering experience
          across enterprise and financial environments.
        </p>
        <div className="mt-7 flex items-center gap-6">
          <Link
            href="/projects"
            className="text-sm font-medium text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Read Blog →
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Projects
          </h2>
          <Link
            href="/projects"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            All projects →
          </Link>
        </div>
        <div className="grid gap-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      {latestPosts.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Writing
            </h2>
            <Link
              href="/blog"
              className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
            >
              All posts →
            </Link>
          </div>
          <div>
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
