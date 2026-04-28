"use client";

import { useState } from "react";

type Props = {
  onSubmit: (data: { name: string; phone: string; message: string }) => void;
};

export default function OfflineForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const isValid = name.trim() && /^[\d\s\-\+\(\)]{7,20}$/.test(phone.trim()) && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ name: name.trim(), phone: phone.trim(), message: message.trim() });
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3 w-full max-w-sm shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg">🌙</span>
        <p className="text-sm font-semibold text-zinc-800">目前非服務時間</p>
      </div>
      <p className="text-xs text-zinc-500 leading-relaxed">
        客服服務時間為週一至週五 9:00–18:00。請留下聯絡資訊，我們將於下個工作日優先回覆。
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="您的姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="tel"
          placeholder="聯絡電話"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          placeholder="請描述您的問題"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-blue-600 text-white text-sm font-medium py-2 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          送出留言
        </button>
      </form>
    </div>
  );
}
