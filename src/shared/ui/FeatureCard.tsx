interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[20px] p-8 text-center transition-all duration-300 hover:-translate-y-2.5 hover:bg-white/8 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] dark:bg-white/5 light:bg-primary/5 light:border-primary/10 light:hover:bg-primary/10">
      <div className="text-5xl mb-5">{icon}</div>
      <h3 className="text-2xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">{title}</h3>
      <p className="text-white/70 leading-relaxed dark:text-white/70 light:text-black/70">{description}</p>
    </div>
  )
}
