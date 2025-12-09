interface StatCardProps {
  icon?: string;
  emoji?: string;
  title?: string;
  label?: string;
  value: string | number;
  variant?: "primary" | "success" | "danger" | "warning";
}

const getVariantClasses = (variant: StatCardProps["variant"]) => {
  switch (variant) {
    case "success":
      return "bg-gradient-to-br from-green-500/20 to-green-700/20 border-green-500/30 text-green-400";
    case "danger":
      return "bg-gradient-to-br from-red-500/20 to-red-700/20 border-red-500/30 text-red-400";
    case "warning":
      return "bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 border-yellow-500/30 text-yellow-400";
    default:
      return "bg-gradient-to-br from-primary/20 to-primary-dark/20 border-primary/30 text-white";
  }
};

export default function StatCard({
  icon,
  emoji,
  title,
  label,
  value,
  variant = "primary",
}: StatCardProps) {
  const displayEmoji = icon || emoji;
  const displayTitle = label || title;
  return (
    <div className={`border rounded-xl p-6 ${getVariantClasses(variant)}`}>
      {displayEmoji && <div className="text-4xl mb-3">{displayEmoji}</div>}
      {displayTitle && <h3 className="text-lg font-semibold text-white/70 mb-2">{displayTitle}</h3>}
      <p className={`text-4xl font-bold ${variant === "primary" ? "text-white" : ""}`}>
        {value}
      </p>
    </div>
  );
}
