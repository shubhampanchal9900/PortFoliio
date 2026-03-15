import Link from 'next/link'
import Image from 'next/image'

type AnchorProps = React.ComponentPropsWithoutRef<'a'>
type ImgProps = React.ComponentPropsWithoutRef<'img'>

// Callout component for notes, warnings, tips
function Callout({
  type = 'note',
  children,
}: {
  type?: 'note' | 'warning' | 'tip'
  children: React.ReactNode
}) {
  const styles = {
    note: 'border-blue-100 bg-blue-50 text-blue-900',
    warning: 'border-amber-100 bg-amber-50 text-amber-900',
    tip: 'border-green-100 bg-green-50 text-green-900',
  }
  const labels = { note: 'Note', warning: 'Warning', tip: 'Tip' }

  return (
    <div className={`my-6 rounded-lg border px-5 py-4 text-sm leading-relaxed ${styles[type]}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-60">
        {labels[type]}
      </p>
      {children}
    </div>
  )
}

// Custom MDX component overrides
export const mdxComponents = {
  // Smart anchor: internal links use Next.js Link, external open in new tab
  a: ({ href, children, ...props }: AnchorProps) => {
    if (!href) return <a {...props}>{children}</a>
    const isInternal = href.startsWith('/') || href.startsWith('#')
    if (isInternal) return <Link href={href}>{children}</Link>
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },

  // Optimized images via next/image when src is available
  img: ({ src, alt, ...props }: ImgProps) => {
    if (!src) return null
    return (
      <span className="block my-8">
        <Image
          src={src}
          alt={alt ?? ''}
          width={800}
          height={450}
          className="rounded-lg border border-gray-100 w-full h-auto"
          {...(props as object)}
        />
        {alt && (
          <span className="mt-2 block text-center text-xs text-gray-400">
            {alt}
          </span>
        )}
      </span>
    )
  },

  // Callout shorthand components usable in MDX as <Callout type="tip">
  Callout,
}
