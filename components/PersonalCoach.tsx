'use client'

import { useRef, memo } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/**
 * PersonalCoach - Ultra Minimalist Comparison
 * World-class simplicity. Pure visual storytelling.
 */

/**
 * ScrollAnimatedText – Letter-by-letter color fill on scroll
 * Smoothly fills text with color as user scrolls down
 * Reverses the effect when scrolling up
 * Optimized with memoization for better performance
 */
const ScrollAnimatedText = memo(function ScrollAnimatedText({ 
  text, 
  className = "",
  color,
  glowColor
}: { 
  text: string
  className?: string
  color: string
  glowColor: string
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.6", "start 0.3"] // Start after text is visible, complete as it moves up
  });

  const letters = text.split("");
  
  return (
    <h3 
      ref={containerRef} 
      className={`${className} inline-block relative`}
      style={{ willChange: 'transform', contain: 'layout style' }}
    >
      {letters.map((letter, index) => {
        // Calculate progress range for this letter
        const letterProgress = letters.length;
        const start = Math.max(0, (index - 1) / letterProgress);
        const end = Math.min(1, (index + 2) / letterProgress);
        
        // Map scroll progress to letter opacity/color with smooth transition
        const opacity = useTransform(
          scrollYProgress,
          [start, (start + end) / 2, end],
          [0, 1, 1]
        );
        
        // Add subtle glow intensity
        const glowOpacity = useTransform(
          scrollYProgress,
          [start, (start + end) / 2, end],
          [0, 0.6, 0.6]
        );
        
        return (
          <motion.span
            key={index}
            style={{
              display: letter === " " ? "inline" : "inline-block",
              position: "relative",
              willChange: 'opacity, transform',
              transform: 'translateZ(0)', // Force GPU layer
            }}
          >
            {/* Original text (visible when not filled) */}
            <span className="text-white/40">
              {letter}
            </span>
            
            {/* Color overlay - solid color */}
            <motion.span
              style={{
                opacity,
                position: "absolute",
                left: 0,
                top: 0,
                display: letter === " " ? "inline" : "inline-block",
                color: color,
              }}
            >
              {letter}
            </motion.span>
            
            {/* Glow effect behind the text */}
            <motion.span
              style={{
                opacity: glowOpacity,
                position: "absolute",
                left: 0,
                top: 0,
                display: letter === " " ? "inline" : "inline-block",
                filter: "blur(12px)",
                zIndex: -1,
                color: glowColor,
              }}
              aria-hidden="true"
            >
              {letter}
            </motion.span>
          </motion.span>
        );
      })}
    </h3>
  );
});

function SimpleLine({ 
  data, 
  color, 
  label,
  result,
  isInView,
  delay
}: { 
  data: number[]
  color: string
  label: string
  result: string
  isInView: boolean
  delay: number
}) {
  const max = 30
  const min = 0
  const range = max - min

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      {/* Label with scroll animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="mb-12 text-center"
      >
        <ScrollAnimatedText 
          text={label}
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-3"
          color={color}
          glowColor={color}
        />
      </motion.div>

      {/* Graph */}
      <div className="w-full max-w-md px-8 mb-12">
        <div className="relative h-64 flex items-end justify-between gap-4">
          {data.map((value, i) => {
            const height = ((value - min) / range) * 100
            
            return (
              <div key={i} className="flex-1 h-full relative flex flex-col items-center justify-end">
                {/* Value label - positioned above the pillar */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.5,
                    delay: delay + 0.5 + (i * 0.15) + 0.6
                  }}
                  className="absolute text-white/90 font-light text-sm whitespace-nowrap"
                  style={{
                    bottom: `${height}%`,
                    left: 'calc(50% - 12px)',
                    transform: 'translate(-50%, -1.5rem)'
                  }}
                >
                  +{value}%
                </motion.div>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={isInView ? { 
                    height: `${height}%`,
                    opacity: 1 
                  } : {}}
                  transition={{ 
                    duration: 1.2,
                    delay: delay + 0.5 + (i * 0.15),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to top, ${color}, transparent)`
                  }}
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: delay + 2 }}
                  className="absolute -bottom-8 text-white/20 text-xs font-light text-center whitespace-nowrap"
                  style={{
                    left: 'calc(50% - 12px)',
                    transform: 'translateX(-50%)'
                  }}
                >
                  Week {(i + 1) * 4}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 2.5 }}
        className="text-center"
      >
        <div className="text-2xl md:text-3xl font-light" style={{ color }}>
          {result}
        </div>
      </motion.div>
    </div>
  )
}

export function PersonalCoach() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const withoutAI = [3, 5, 6, 7]
  const withAI = [7, 15, 22, 30]

  return (
    <section ref={ref} className="relative py-12 md:py-32 lg:py-40 overflow-hidden -mt-8 md:mt-0">
      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white/90 mb-6 leading-tight tracking-tight">
            Same effort.
            <br />
            More{' '}
            <span className="text-brand-accent-teal">results</span>.
          </h2>
        </motion.div>

        {/* Comparison */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 max-w-6xl mx-auto">
          <SimpleLine
            data={withoutAI}
            color="#ef4444"
            label="Random workouts"
            result="Strength level: +7%"
            isInView={isInView}
            delay={0.2}
          />
          
          <SimpleLine
            data={withAI}
            color="#2dd4bf"
            label="Structured program"
            result="Strength level: +30%"
            isInView={isInView}
            delay={0.4}
          />
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-32 text-center"
        >
          <p className="text-white/40 text-lg font-light max-w-2xl mx-auto">
            Buli learns your body, adjusts your loads, and optimizes your recovery.
            <br />
            You just show up and lift.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
