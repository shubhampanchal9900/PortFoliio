import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogPost, BlogPostWithContent, FrontMatter, Heading } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

// Replicates the slug generation used by rehype-slug (github-slugger compatible)
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_[\]()]/g, '')      // strip common markdown inline syntax
    .replace(/[^\w\s-]/g, '')        // remove remaining special chars
    .replace(/\s+/g, '-')            // spaces → hyphens
    .replace(/-+/g, '-')             // collapse consecutive hyphens
    .trim()
}

// Extracts H2–H4 headings from raw MDX content for Table of Contents
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    headings.push({ id: slugifyHeading(text), text, level })
  }

  return headings
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  const posts: BlogPost[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(BLOG_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const fm = data as FrontMatter

    return {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      tags: fm.tags ?? [],
      readingTime: readingTime(content).text,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPostWithContent {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`)
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const fm = data as FrontMatter

  return {
    slug,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
    readingTime: readingTime(content).text,
    content,
    headings: extractHeadings(content),
  }
}

export function getFeaturedPosts(count = 3): BlogPost[] {
  return getAllPosts().slice(0, count)
}
