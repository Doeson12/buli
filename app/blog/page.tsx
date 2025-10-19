import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

// Static blog posts (Contentlayer removed for simpler deployment)
const allPosts: Array<{
  slug: string
  url: string
  title: string
  description: string
  date: string
  author: string
  category: string
  published: boolean
}> = []

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Training guides, sports science, and product updates from the Buli team.',
  openGraph: {
    title: 'Buli Blog',
    description: 'Training guides, sports science, and product updates.',
  },
}

const categories = ['Training', 'Recovery', 'Product'] as const

export default function BlogPage() {
  // Sort posts by date, newest first
  const sortedPosts = allPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-brand-text-secondary leading-relaxed">
            Training guides, sports science breakdowns, and product updates.
          </p>
        </div>
        
        {/* Category filters (visual only for now) */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <div className="px-4 py-2 rounded-full glass text-sm font-medium">
            All Posts
          </div>
          {categories.map((category) => (
            <div
              key={category}
              className="px-4 py-2 rounded-full glass text-sm font-medium opacity-60"
            >
              {category}
            </div>
          ))}
        </div>
        
        {/* Posts Grid */}
        {sortedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.url}
                className="card group hover:border-brand-accent-indigo/30 transition-all"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`
                    inline-block px-3 py-1 rounded-full text-xs font-semibold
                    ${post.category === 'Training' ? 'bg-brand-accent-indigo/10 text-brand-accent-indigo' : ''}
                    ${post.category === 'Recovery' ? 'bg-brand-accent-teal/10 text-brand-accent-teal' : ''}
                    ${post.category === 'Product' ? 'bg-brand-accent-rose/10 text-brand-accent-rose' : ''}
                  `}>
                    {post.category}
                  </span>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold mb-3 group-hover:text-brand-accent-indigo transition-colors">
                  {post.title}
                </h2>
                
                {/* Description */}
                <p className="text-brand-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-brand-text-secondary">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                
                {/* Read More Arrow */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-accent-indigo opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Read more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center card max-w-2xl mx-auto">
            <p className="text-brand-text-secondary">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
        
        {/* Newsletter CTA */}
        <div className="mt-20 card max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Never miss a post
          </h2>
          <p className="text-brand-text-secondary mb-6">
            Subscribe to get new training guides and science breakdowns in your inbox.
          </p>
          <Link href="/community#newsletter" className="btn-primary">
            Subscribe to Newsletter
          </Link>
        </div>
      </div>
    </div>
  )
}

