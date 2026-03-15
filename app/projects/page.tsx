import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import ProjectCard from '@/components/projects/ProjectCard'
import type { Project } from '@/components/projects/ProjectCard'
import { constructMetadata } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Projects — Shubham Panchal',
  description: 'Distributed systems and backend engineering projects.',
})

const projects: Project[] = [
  {
    title: 'Distributed Raft Key-Value Store',
    description:
      'Implementation of a distributed key-value store using the Raft consensus algorithm. Supports leader election, replicated log across cluster nodes, fault tolerance, consistency guarantees, and command replication with commit indexing.',
    tech: ['Go', 'gRPC', 'Distributed Systems', 'Consensus Algorithms'],
    github: 'https://github.com/shubhampanchal9900/raft-kv',
  },
  {
    title: 'MapReduce Distributed Processing Framework',
    description:
      'Simplified MapReduce framework for distributed data processing. Implements Map and Reduce task orchestration, worker node coordination, task retry on failure, and distributed job execution.',
    tech: ['Go', 'Distributed Systems', 'RPC'],
    github: 'https://github.com/shubhampanchal9900/mapreduce',
  },
  {
    title: 'Distributed Document Extraction Platform',
    description:
      'Microservice-based document extraction pipeline that processes OCR documents across 6 microservices — upload, extraction, validation, and callback routing. Features fault-tolerant message processing and distributed callback routing.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'Microservices'],
    github: 'https://github.com/shubhampanchal9900/doc-extraction-platform',
  },
]

export default function Projects() {
  return (
    <Container className="py-20">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Projects
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Distributed systems and backend engineering projects — built to understand
          the fundamentals deeply.
        </p>
      </div>
      <div className="grid gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Container>
  )
}
