import Link from 'next/link'
import type { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="py-5 border-b border-gray-100 last:border-0">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-500 transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="mt-1.5 text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex-shrink-0 text-right pt-0.5">
            <time className="text-xs text-gray-400 tabular-nums" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <p className="text-xs text-gray-300 mt-0.5 whitespace-nowrap">
              {post.readingTime}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
