import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { mdxComponents } from '@/components/blog/MDXComponents'
import TableOfContents from '@/components/blog/TableOfContents'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { constructMetadata } from '@/lib/metadata'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Pre-render all blog posts at build time
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = getPostBySlug(slug)
    return constructMetadata({
      title: `${post.title} — Shubham Panchal`,
      description: post.description,
    })
  } catch {
    return constructMetadata()
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params

  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    // Wider layout to accommodate article + ToC sidebar
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_200px]">

        {/* ── Article column ── */}
        <div className="min-w-0">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Writing
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <time className="text-xs text-gray-400" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400">{post.readingTime}</span>
            </div>

            <h1 className="text-2xl font-semibold leading-snug tracking-tight text-gray-900">
              {post.title}
            </h1>
            <p className="mt-3 text-base text-gray-500 leading-relaxed">
              {post.description}
            </p>

            {post.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <hr className="mb-10 border-gray-100" />

          {/* Post body */}
          <article className="prose prose-gray max-w-none">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [rehypePrettyCode, { theme: 'github-light', keepBackground: false }],
                    rehypeSlug,
                  ],
                },
              }}
            />
          </article>

          {/* Footer navigation */}
          <div className="mt-16 border-t border-gray-100 pt-8">
            <Link
              href="/blog"
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>

        {/* ── Table of Contents sidebar ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-10">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>

      </div>
    </div>
  )
}
