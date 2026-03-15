import Link from 'next/link'
import Container from '@/components/layout/Container'

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="space-y-4">
        <p className="font-mono text-xs text-gray-400">404</p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Page not found
        </h1>
        <p className="text-sm text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block text-sm text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors"
        >
          Go home
        </Link>
      </div>
    </Container>
  )
}
