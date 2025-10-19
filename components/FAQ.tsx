'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleItem(index)
    }
  }
  
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="relative group"
          >
            {/* Subtle glow on hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl blur-sm transition-all duration-500" />
            
            {/* Card */}
            <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-xl overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]">
              {/* Question button */}
              <button
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group/button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-100 group-hover/button:text-white transition-colors">
                  {item.question}
                </h3>
                
                {/* Animated icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 group-hover/button:bg-white/10 flex items-center justify-center transition-all duration-300">
                  <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="minus"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Minus className="w-4 h-4 text-indigo-400" strokeWidth={2.5} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="plus"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Plus className="w-4 h-4 text-gray-400 group-hover/button:text-gray-300" strokeWidth={2.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
              
              {/* Answer with smooth animation */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto', 
                      opacity: 1,
                      transition: {
                        height: { 
                          duration: 0.4, 
                          ease: [0.25, 0.1, 0.25, 1]
                        },
                        opacity: { 
                          duration: 0.3, 
                          delay: 0.15,
                          ease: 'easeOut'
                        }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { 
                          duration: 0.3, 
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: 0.05
                        },
                        opacity: { 
                          duration: 0.2,
                          ease: 'easeIn'
                        }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    {/* Subtle divider */}
                    <div className="px-6">
                      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
                    </div>
                    
                    {/* Answer content */}
                    <motion.div
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ 
                        y: 0, 
                        opacity: 1,
                        transition: { 
                          duration: 0.4, 
                          delay: 0.15,
                          ease: [0.25, 0.1, 0.25, 1] 
                        }
                      }}
                      exit={{
                        y: -8,
                        opacity: 0,
                        transition: {
                          duration: 0.2,
                          ease: 'easeIn'
                        }
                      }}
                      className="px-6 pb-6 text-sm md:text-base text-gray-400 leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
