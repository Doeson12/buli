import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

// Static blog posts (Contentlayer removed for simpler deployment)
const allPosts: Array<{
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  published: boolean
}> = []

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Blog Post',
    description: 'Buli blog post',
  }
}

export default function BlogPostPage({ params }: Props) {
  // No posts available yet
  notFound()
}

