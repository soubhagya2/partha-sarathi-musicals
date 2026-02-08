import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 group">
      <div className="size-16 rounded-full bg-linear-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center text-orange-600 group-hover:from-orange-500/30 group-hover:to-amber-500/30 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-110">
        {icon}
      </div>
      <h4 className="font-ui font-bold text-lg text-amber-900">{title}</h4>
      <p className="font-ui text-sm text-amber-800/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
