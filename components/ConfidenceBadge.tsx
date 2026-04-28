type Level = "high" | "medium" | "low";

const CONFIG: Record<Level, { label: string; className: string }> = {
  high: {
    label: "✓ 依據官方資料",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  medium: {
    label: "資訊僅供參考",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  low: {
    label: "⚠ 建議詢問客服",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function ConfidenceBadge({ level }: { level: Level }) {
  const { label, className } = CONFIG[level];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
