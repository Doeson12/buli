import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { formatDate } from '@/lib/utils'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Link from 'next/link'

// Gracefully handle contentlayer import
let allPosts: Array<{
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  published: boolean
  body: { code: string }
}> = []
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const contentlayer = require('contentlayer/generated')
  allPosts = contentlayer.allPosts || []
} catch {
  console.log('Contentlayer not built yet')
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug)
  
  if (!post) return {}
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = allPosts.find((post) => post.slug === params.slug)
  
  if (!post || !post.published) {
    notFound()
  }
  
  const MDXContent = useMDXComponent(post.body.code)
  
  return (
    <div className="pt-32 pb-20">
      <article className="container-custom max-w-3xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-text transition-colors mb-8 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Blog</span>
        </Link>
        
        {/* Header */}
        <header className="mb-12">
          {/* Category */}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* Description */}
          <p className="text-xl text-brand-text-secondary leading-relaxed mb-6">
            {post.description}
          </p>
          
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-brand-text-secondary border-t border-b border-white/10 py-4">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>
        
        {/* MDX Content */}
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-brand-text
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-brand-text-secondary prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-brand-accent-indigo prose-a:no-underline hover:prose-a:underline
          prose-strong:text-brand-text prose-strong:font-semibold
          prose-code:text-brand-accent-teal prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
          prose-ul:text-brand-text-secondary prose-ul:my-6
          prose-ol:text-brand-text-secondary prose-ol:my-6
          prose-li:my-2
          prose-blockquote:border-l-brand-accent-indigo prose-blockquote:text-brand-text-secondary
          prose-img:rounded-xl prose-img:border prose-img:border-white/10
        ">
          <MDXContent />
        </div>
        
        {/* Footer CTA */}
        <div className="mt-16 card text-center">
          <h2 className="text-2xl font-bold mb-4">
            Try Buli today
          </h2>
          <p className="text-brand-text-secondary mb-6">
            Put these principles into practice with AI-powered training.
          </p>
          <Link href="/download" className="btn-primary">
            Download App
          </Link>
        </div>
      </article>
    </div>
  )
}

