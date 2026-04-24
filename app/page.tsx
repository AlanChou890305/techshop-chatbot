"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "@/components/MessageBubble";
import QuickReplies from "@/components/QuickReplies";

const WELCOME_MESSAGE = "嗨！我是 TechBot，TechShop 的智慧客服 👋\n\n我可以幫你：\n• 回答常見問題（運送、退換貨、保固、付款等）\n• 根據你的需求推薦適合的 3C 商品\n\n有什麼需要幫忙的嗎？";

export default function Home() {
  const { messages, sendMessage, status } = useChat();

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) setShowQuickReplies(false);
  }, [messages]);

  const submit = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  const handleQuickReply = (text: string) => {
    setShowQuickReplies(false);
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          T
        </div>
        <div>
          <p className="font-semibold text-zinc-900 text-sm">TechBot</p>
          <p className="text-xs text-zinc-400">TechShop 智慧客服</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-xs text-zinc-400">線上</span>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 pt-4">
        {/* Welcome bubble */}
        <div className="flex justify-start mb-4">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 shrink-0">
            T
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-zinc-100 text-zinc-800 px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
            {WELCOME_MESSAGE}
          </div>
        </div>

        {/* Quick replies shown before first message */}
        {showQuickReplies && (
          <div className="ml-9 mb-4">
            <QuickReplies onSelect={handleQuickReply} disabled={isLoading} />
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 shrink-0">
              T
            </div>
            <div className="bg-zinc-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="bg-white border-t border-zinc-200 px-4 py-3 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入訊息… (Enter 送出，Shift+Enter 換行)"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 overflow-y-auto"
            style={{ minHeight: "40px" }}
          />
          <button
            type="button"
            onClick={submit}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 rotate-90"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-zinc-300 mt-2">
          TechShop 客服機器人 · 僅供參考，實際以官方資訊為準
        </p>
      </footer>
    </div>
  );
}
