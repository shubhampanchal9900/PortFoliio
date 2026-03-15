export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
  headings: Heading[]
}

export interface Heading {
  id: string
  text: string
  level: number
}

export interface FrontMatter {
  title: string
  description: string
  date: string
  tags?: string[]
}
