"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
};

const labels = ["", "非常不滿意", "不滿意", "普通", "滿意", "非常滿意"];

export default function CsatRating({ onClose }: Props) {
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (score: number) => {
    setSubmitted(true);
    // In a real app, send score to analytics endpoint
    setTimeout(onClose, 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-end justify-center pb-4 px-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-sm space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-4 space-y-2">
            <p className="text-3xl">🙏</p>
            <p className="text-sm font-semibold text-zinc-900">感謝您的評分！</p>
            <p className="text-xs text-zinc-500">您的意見有助於我們持續改善服務</p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-zinc-900">為此次服務評分</p>
              <p className="text-xs text-zinc-400">您對 TechBot 的服務滿意嗎？</p>
            </div>
            <div
              className="flex justify-center gap-2"
              onMouseLeave={() => setHovered(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHovered(star)}
                  onClick={() => handleRate(star)}
                  className="text-4xl leading-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber-400 rounded focus:outline-none"
                  aria-label={`${star} 星`}
                >
                  <span className={hovered >= star ? "text-amber-400" : "text-zinc-200"}>★</span>
                </button>
              ))}
            </div>
            {hovered > 0 && (
              <p className="text-xs text-center text-zinc-400">{labels[hovered]}</p>
            )}
            <button
              onClick={onClose}
              className="w-full text-xs text-zinc-400 hover:text-zinc-600 text-center py-1"
            >
              略過
            </button>
          </>
        )}
      </div>
    </div>
  );
}
