"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import MessageBubble from "@/components/MessageBubble";
import QuickReplies from "@/components/QuickReplies";

const WELCOME_MESSAGE = "嗨！我是 TechBot，TechShop 的智慧客服 👋\n\n我可以幫你：\n• 回答常見問題（運送、退換貨、保固、付款等）\n• 根據你的需求推薦適合的 3C 商品\n\n有什麼需要幫忙的嗎？";

type TransferStatus = "idle" | "connecting" | "connected";
type HumanMessage = { id: string; role: "user" | "agent"; content: string };

const AGENT_RULES: { keywords: string[]; response: string }[] = [
  { keywords: ["退貨", "退換", "退款"], response: "了解，我來幫您處理退換貨申請。請問您的訂單編號是幾號呢？" },
  { keywords: ["訂單", "查詢", "進度", "到了嗎"], response: "好的，我幫您查一下訂單狀態，請問您的訂單編號是？" },
  { keywords: ["保固", "維修", "壞了", "故障"], response: "我了解您的問題，保固期內可免費維修。請問產品的購買日期是？" },
  { keywords: ["謝謝", "感謝", "沒了", "好了"], response: "不客氣！如果還有任何問題歡迎隨時詢問，祝您購物愉快 😊" },
];
const FALLBACKS = [
  "收到，我正在幫您查詢相關資料，請稍候片刻…",
  "了解您的問題，我來協助您處理，請問還有其他需要補充的資訊嗎？",
  "好的，我已記錄您的需求，我們會盡快為您安排，請稍候。",
];

function getAgentResponse(text: string, fallbackIndex: number): string {
  for (const rule of AGENT_RULES) {
    if (rule.keywords.some((kw) => text.includes(kw))) return rule.response;
  }
  return FALLBACKS[fallbackIndex % FALLBACKS.length];
}

export default function Home() {
  const { messages, sendMessage, status } = useChat();

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const isComposingRef = useRef(false);

  const [transferStatus, setTransferStatus] = useState<TransferStatus>("idle");
  const [humanMessages, setHumanMessages] = useState<HumanMessage[]>([]);
  const [agentTyping, setAgentTyping] = useState(false);
  const fallbackIndexRef = useRef(0);
  const transferTriggeredRef = useRef(false);

  const isConnected = transferStatus === "connected";
  const isLoading = (status === "submitted" || status === "streaming") && !isConnected;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    if (!input) {
      el.style.height = "40px";
      return;
    }
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input]);

  useEffect(() => {
    if (messages.length > 0) setShowQuickReplies(false);
  }, [messages]);

  useEffect(() => {
    if (transferTriggeredRef.current) return;
    const hasEscalation = messages.some((m) =>
      m.parts.some((p) => {
        if (p.type === "dynamic-tool") {
          const dp = p as unknown as { toolName: string; state: string };
          return dp.state === "output-available" && dp.toolName === "escalate_to_human";
        }
        if (typeof p.type === "string" && p.type === "tool-escalate_to_human") {
          return (p as unknown as { state: string }).state === "output-available";
        }
        return false;
      })
    );
    if (!hasEscalation) return;
    transferTriggeredRef.current = true;
    setTransferStatus("connecting");
    setTimeout(() => {
      setTransferStatus("connected");
      setHumanMessages([{
        id: "agent-greeting",
        role: "agent",
        content: "您好，我是客服專員小明！已接手您的對話，請問有什麼可以幫您的嗎？",
      }]);
    }, 2000);
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [humanMessages, agentTyping]);

  const submitHumanMessage = (text: string) => {
    if (!text || agentTyping) return;
    const userMsg: HumanMessage = { id: `u-${Date.now()}`, role: "user", content: text };
    setHumanMessages((prev) => [...prev, userMsg]);
    setAgentTyping(true);
    const idx = fallbackIndexRef.current++;
    setTimeout(() => {
      const response = getAgentResponse(text, idx);
      setHumanMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "agent", content: response }]);
      setAgentTyping(false);
    }, 1500);
  };

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    if (isConnected) {
      submitHumanMessage(text);
    } else {
      if (isLoading) return;
      sendMessage({ text });
    }
  };

  const handleQuickReply = (text: string) => {
    setShowQuickReplies(false);
    sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposingRef.current) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-4 py-3 flex items-center gap-3 shrink-0">
        {isConnected ? (
          <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
            明
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            T
          </div>
        )}
        <div>
          {isConnected ? (
            <>
              <p className="font-semibold text-zinc-900 text-sm">陳小明</p>
              <p className="text-xs text-zinc-400">真人客服專員</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-zinc-900 text-sm">TechBot</p>
              <p className="text-xs text-zinc-400">TechShop 智慧客服</p>
            </>
          )}
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

        {/* Connecting indicator */}
        {transferStatus === "connecting" && (
          <div className="flex justify-start mb-4">
            <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 shrink-0">
              明
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

        {/* Human agent messages */}
        {humanMessages.map((m) =>
          m.role === "agent" ? (
            <div key={m.id} className="flex justify-start mb-4">
              <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 shrink-0">
                明
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-zinc-100 text-zinc-800 px-4 py-2.5 text-sm leading-relaxed">
                {m.content}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end mb-4">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-blue-600 text-white px-4 py-2.5 text-sm leading-relaxed">
                {m.content}
              </div>
            </div>
          )
        )}

        {/* Agent typing indicator */}
        {agentTyping && (
          <div className="flex justify-start mb-4">
            <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 shrink-0">
              明
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
        <div className="flex items-start gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onCompositionStart={() => { isComposingRef.current = true; }}
            onCompositionEnd={() => { isComposingRef.current = false; }}
            onKeyDown={handleKeyDown}
            placeholder={isConnected ? "傳送訊息給客服人員…" : transferStatus === "connecting" ? "正在連接客服人員…" : "輸入訊息…"}
            disabled={transferStatus === "connecting"}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 overflow-y-auto [&::-webkit-scrollbar]:hidden disabled:opacity-50"
            style={{ minHeight: "40px", scrollbarWidth: "none" }}
          />
          <button
            type="button"
            onClick={submit}
            disabled={!input.trim() || isLoading || transferStatus === "connecting" || agentTyping}
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
