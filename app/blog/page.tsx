import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import BlogCard from '@/components/blog/BlogCard'
import { getAllPosts } from '@/lib/blog'
import { constructMetadata } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Writing — Shubham Panchal',
  description:
    'Technical writing on distributed systems, Kafka, Raft, microservice design, and backend engineering.',
})

export default function Blog() {
  const posts = getAllPosts()

  // Group posts by year for a cleaner timeline layout
  const postsByYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <Container className="py-20">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Writing
        </h1>
        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          Deep dives into distributed systems, Kafka internals, consensus
          algorithms, microservice patterns, and backend engineering.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-gray-400">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <section key={year}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-300">
                {year}
              </h2>
              <div>
                {postsByYear[year].map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Container>
  )
}
