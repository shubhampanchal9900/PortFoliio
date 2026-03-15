import Container from './Container'
import { siteConfig } from '@/lib/metadata'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-10 border-t border-gray-100 mt-20">
      <Container className="flex items-center justify-between">
        <p className="text-xs text-gray-400">© {year} Shubham Panchal</p>
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            Email
          </a>
        </div>
      </Container>
    </footer>
  )
}
