"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Target, Calendar, Cpu, Sparkles } from "lucide-react";

/**
 * BuliIntakeFlow – Clean text-forward flow
 * Simple vertical progression showing: inputs → engine → plan
 * No cards, just clean typography with subtle visual anchors
 */
const BuliIntakeFlow = memo(function BuliIntakeFlow() {
  return (
    <section aria-label="How Buli builds your plan" className="relative w-full py-16 sm:py-24">
      <div className="container-custom">
        <Header />

        <div className="max-w-3xl mx-auto">
          {/* Input stage */}
          <div className="relative">
            <StageLabel number="1" label="You tell us" />
            
            <div className="mt-8 space-y-6 ml-12 sm:ml-16">
              <FlowItem 
                icon={ClipboardList} 
                title="Your baseline"
                description="Experience level, any injuries, what equipment you have"
                delay={0}
              />
              <FlowItem 
                icon={Target} 
                title="Your goals"
                description="Strength, muscle gain, fat loss, or a combination"
                delay={0.1}
              />
              <FlowItem 
                icon={Calendar} 
                title="Weekly rhythm"
                description="How many days, session length, when you can train"
                delay={0.2}
              />
            </div>
          </div>

          {/* Connector */}
          <Connector />

          {/* Engine stage */}
          <div className="relative">
            <StageLabel number="2" label="Buli analyzes" />
            
            <div className="mt-8 ml-12 sm:ml-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 p-2.5 rounded-xl glass">
                  <Cpu className="w-5 h-5 text-brand-accent-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Our specialized algorithm</h3>
                  <p className="text-brand-text-secondary leading-relaxed">
                    Combines exercise science principles with your inputs to determine the right training split, 
                    volume landmarks, exercise selection, and progression scheme.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Connector */}
          <Connector />

          {/* Output stage */}
          <div className="relative">
            <StageLabel number="3" label="You get" />
            
            <div className="mt-8 ml-12 sm:ml-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 p-2.5 rounded-xl glass">
                  <Sparkles className="w-5 h-5 text-brand-accent-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Your perfect workout plan</h3>
                  <p className="text-brand-text-secondary leading-relaxed">
                    A personalized program that matches your schedule, equipment, and goals — with built-in 
                    progression, auto-deloads, and technique guidance.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
})

export default BuliIntakeFlow;

function Header() {
  return (
    <div className="mb-12 sm:mb-16 text-center">
      <p className="mb-2 text-sm uppercase tracking-widest text-brand-text-secondary">How it works</p>
      <h2 className="text-3xl sm:text-4xl font-semibold">
        Three simple steps
      </h2>
      <p className="mt-3 text-brand-text-secondary max-w-2xl mx-auto">
        From questionnaire to personalized plan in minutes
      </p>
    </div>
  );
}

function StageLabel({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent-teal/20 to-brand-accent-indigo/20 border border-white/10">
        <span className="text-sm font-semibold text-brand-accent-teal">{number}</span>
      </div>
      <span className="text-xs uppercase tracking-wider text-brand-text-secondary font-medium">{label}</span>
    </motion.div>
  );
}

function FlowItem({ icon: Icon, title, description, delay }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-4 group"
    >
      <div className="shrink-0 p-2.5 rounded-xl glass transition-all duration-300 group-hover:scale-105">
        <Icon className="w-5 h-5 text-brand-text-secondary transition-colors duration-300 group-hover:text-brand-accent-teal" />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-brand-text-secondary leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function Connector() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.5 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      className="relative h-16 flex items-center ml-5"
      aria-hidden
    >
      <div className="w-[2px] h-full bg-gradient-to-b from-white/10 via-brand-accent-teal/30 to-white/10" />
    </motion.div>
  );
}

