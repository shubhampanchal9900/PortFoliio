import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Shubham Panchal',
  title: 'Shubham Panchal – Backend Engineer | Distributed Systems',
  description:
    'Backend engineer building scalable distributed systems, microservices platforms, and high-performance backend infrastructure.',
  url: 'https://shubhampanchal.dev',
  ogImage: 'https://shubhampanchal.dev/og.png',
  twitter: '',
  github: 'https://github.com/shubhampanchal9900',
  linkedin: 'https://linkedin.com/in/shubhampanchal9900',
  email: 'shubhampanchal9900@gmail.com',
  phone: '+91-7387519591',
}

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    icons: {
      icon: '/favicon.ico',
    },
  }
}
