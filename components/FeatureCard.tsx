interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  accent?: 'indigo' | 'teal' | 'rose'
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  accent = 'indigo' 
}: FeatureCardProps) {
  const accentClasses = {
    indigo: 'group-hover:glow-indigo group-hover:border-brand-accent-indigo/30',
    teal: 'group-hover:glow-teal group-hover:border-brand-accent-teal/30',
    rose: 'group-hover:glow-rose group-hover:border-brand-accent-rose/30',
  }
  
  const iconColors = {
    indigo: 'text-brand-accent-indigo',
    teal: 'text-brand-accent-teal',
    rose: 'text-brand-accent-rose',
  }
  
  return (
    <div className={`card group ${accentClasses[accent]}`}>
      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${iconColors[accent]}`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-brand-text">
        {title}
      </h3>
      
      <p className="text-brand-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  )
}

