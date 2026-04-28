"use client";

const QUICK_REPLIES = [
  "查詢我的訂單",
  "幫我推薦一款耳機",
  "幫我推薦筆電",
  "訂單多久會到？",
  "可以退貨嗎？",
  "保固期多長？",
];

type Props = {
  onSelect: (text: string) => void;
  disabled?: boolean;
};

export default function QuickReplies({ onSelect, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {QUICK_REPLIES.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          disabled={disabled}
          className="text-xs px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
