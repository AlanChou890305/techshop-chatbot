"use client";

import Link from "next/link";
import { useState } from "react";

const PERIODS = ["今日", "本週", "本月"] as const;
type Period = (typeof PERIODS)[number];

const metricsData: Record<Period, { label: string; value: string; sub: string; ok: boolean }[]> = {
  今日: [
    { label: "對話數",       value: "847",  sub: "+12% 較昨日",        ok: true },
    { label: "自動解決率",   value: "73%",  sub: "目標 ≥ 60% ✓",      ok: true },
    { label: "轉接真人率",   value: "18%",  sub: "目標 ≤ 30% ✓",      ok: true },
    { label: "CSAT",         value: "4.3",  sub: "/ 5.0 · 目標 ≥ 4.0 ✓", ok: true },
    { label: "首次回應時間", value: "1.8s", sub: "目標 < 3s ✓",        ok: true },
    { label: "推薦點擊率",   value: "22%",  sub: "目標 ≥ 15% ✓",      ok: true },
  ],
  本週: [
    { label: "對話數",       value: "5,241", sub: "+8% 較上週",         ok: true },
    { label: "自動解決率",   value: "70%",   sub: "目標 ≥ 60% ✓",      ok: true },
    { label: "轉接真人率",   value: "21%",   sub: "目標 ≤ 30% ✓",      ok: true },
    { label: "CSAT",         value: "4.2",   sub: "/ 5.0 · 目標 ≥ 4.0 ✓", ok: true },
    { label: "首次回應時間", value: "2.1s",  sub: "目標 < 3s ✓",        ok: true },
    { label: "推薦點擊率",   value: "19%",   sub: "目標 ≥ 15% ✓",      ok: true },
  ],
  本月: [
    { label: "對話數",       value: "21,890", sub: "+5% 較上月",         ok: true },
    { label: "自動解決率",   value: "68%",    sub: "目標 ≥ 60% ✓",      ok: true },
    { label: "轉接真人率",   value: "24%",    sub: "目標 ≤ 30% ✓",      ok: true },
    { label: "CSAT",         value: "4.1",    sub: "/ 5.0 · 目標 ≥ 4.0 ✓", ok: true },
    { label: "首次回應時間", value: "2.3s",   sub: "目標 < 3s ✓",        ok: true },
    { label: "推薦點擊率",   value: "17%",    sub: "目標 ≥ 15% ✓",      ok: true },
  ],
};

const intentBreakdown = [
  { label: "FAQ 問答",    pct: 52, color: "bg-blue-500" },
  { label: "商品推薦",    pct: 31, color: "bg-violet-500" },
  { label: "訂單查詢",    pct: 11, color: "bg-amber-500" },
  { label: "其他 / 閒聊", pct: 6,  color: "bg-zinc-400" },
];

const topFaqs = [
  { q: "訂單多久會到？",      count: 143 },
  { q: "可以退貨嗎？",        count: 98 },
  { q: "保固期多長？",        count: 76 },
  { q: "有哪些付款方式？",    count: 61 },
  { q: "如何查詢訂單狀態？",  count: 55 },
];

const recentConversations = [
  { time: "14:32", summary: "查詢訂單 TS20240001 配送狀態",  intent: "訂單查詢", result: "已解決", csat: 5 },
  { time: "14:28", summary: "推薦通勤用降噪耳機",            intent: "商品推薦", result: "已解決", csat: 4 },
  { time: "14:21", summary: "退換貨申請流程",                intent: "FAQ",      result: "轉真人", csat: null },
  { time: "14:15", summary: "詢問分期付款方式",              intent: "FAQ",      result: "已解決", csat: 5 },
  { time: "14:08", summary: "筆電規格比較與推薦",            intent: "商品推薦", result: "已解決", csat: 4 },
  { time: "13:55", summary: "保固申請查詢",                  intent: "FAQ",      result: "已解決", csat: null },
  { time: "13:41", summary: "訂單取消申請",                  intent: "訂單查詢", result: "轉真人", csat: 3 },
];

const faqCategories = [
  "運送政策 (3)",
  "退換貨 (3)",
  "保固政策 (2)",
  "付款方式 (2)",
  "訂單管理 (2)",
  "其他 (3)",
];

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("今日");
  const metrics = metricsData[period];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          T
        </div>
        <div>
          <p className="font-semibold text-zinc-900 text-sm">TechShop 客服管理後台</p>
          <p className="text-xs text-zinc-400">數據報表</p>
        </div>
        <Link
          href="/"
          className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors"
        >
          ← 回到客服介面
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Period tabs */}
        <div className="flex gap-2">
          {PERIODS.map((t) => (
            <button
              key={t}
              onClick={() => setPeriod(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                period === t
                  ? "bg-blue-600 text-white"
                  : "bg-white text-zinc-500 border border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-zinc-200 p-4 space-y-1">
              <p className="text-xs text-zinc-400">{m.label}</p>
              <p className="text-2xl font-bold text-zinc-900">{m.value}</p>
              <p className="text-xs text-green-600">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Intent breakdown */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-4">
          <p className="text-sm font-semibold text-zinc-900">對話意圖分布</p>
          <div className="space-y-3">
            {intentBreakdown.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-600">{item.label}</span>
                  <span className="text-zinc-400 font-medium tabular-nums">{item.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Top FAQs */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-zinc-900">FAQ 熱門問題 Top 5</p>
            <div className="space-y-2.5">
              {topFaqs.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-300 w-4 shrink-0 tabular-nums">{i + 1}</span>
                  <span className="text-sm text-zinc-700 flex-1">{item.q}</span>
                  <span className="text-xs text-zinc-400 font-medium tabular-nums shrink-0">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge base management */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">知識庫管理</p>
              <span className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">15 筆 FAQ</span>
            </div>
            <p className="text-xs text-zinc-400">點擊類別即可編輯 FAQ 條目。</p>
            <div className="space-y-1.5">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-100 hover:bg-zinc-50 hover:border-zinc-200 transition-colors text-left"
                >
                  <span className="text-sm text-zinc-700">{cat}</span>
                  <span className="text-xs text-blue-500">編輯</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent conversations */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-3">
          <p className="text-sm font-semibold text-zinc-900">最近對話記錄</p>
          <div className="divide-y divide-zinc-50">
            {recentConversations.map((c, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                <span className="text-xs text-zinc-400 font-mono w-10 shrink-0">{c.time}</span>
                <span className="text-sm text-zinc-700 flex-1 truncate">{c.summary}</span>
                <span className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full shrink-0">{c.intent}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                    c.result === "已解決"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {c.result}
                </span>
                <span className="text-xs text-amber-400 shrink-0 w-12 text-right">
                  {c.csat ? "★".repeat(c.csat) : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
