"use client";

import type { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import ProductCard from "./ProductCard";
import EscalationBanner from "./EscalationBanner";
import ConfidenceBadge from "./ConfidenceBadge";
import OrderStatusCard from "./OrderStatusCard";
import type { Product } from "@/lib/products";
import type { Order } from "@/lib/orders";

type ProductRecommendation = {
  product: Product | null;
  reason: string;
};

type RecommendResult = {
  summary: string;
  recommendations: ProductRecommendation[];
};

type EscalateResult = {
  reason: string;
  contact: { email: string; phone: string; hours: string };
};

type LookupOrderResult =
  | { found: false; orderNumber: string }
  | { found: true; order: Order };

type DynamicToolPart = {
  type: "dynamic-tool";
  toolName: string;
  toolCallId: string;
  state: string;
  input?: unknown;
  output?: unknown;
};

function renderDynamicTool(part: DynamicToolPart) {
  if (part.state !== "output-available") return null;

  if (part.toolName === "recommend_products") {
    const result = part.output as RecommendResult;
    return (
      <div className="space-y-3 mt-2">
        {result.recommendations
          .filter((r) => r.product !== null)
          .map((r) => (
            <ProductCard key={r.product!.id} product={r.product!} reason={r.reason} />
          ))}
      </div>
    );
  }

  if (part.toolName === "rate_confidence") {
    const result = part.output as { level: "high" | "medium" | "low" };
    return <ConfidenceBadge level={result.level} />;
  }

  if (part.toolName === "lookup_order") {
    const result = part.output as LookupOrderResult;
    if (!result.found) {
      return (
        <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500 max-w-sm">
          找不到訂單 <span className="font-mono text-zinc-700">{result.orderNumber}</span>，請確認訂單編號是否正確。
        </div>
      );
    }
    return (
      <div className="mt-2">
        <OrderStatusCard order={result.order} />
      </div>
    );
  }

  if (part.toolName === "escalate_to_human") {
    const result = part.output as EscalateResult;
    return (
      <div className="mt-2">
        <EscalationBanner reason={result.reason} contact={result.contact} />
      </div>
    );
  }

  return null;
}

type Props = {
  message: UIMessage;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-0.5 shrink-0">
          T
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        {message.parts.map((part, i) => {
          if (part.type === "text") {
            const text = (part as { type: "text"; text: string }).text;
            return (
              <div
                key={i}
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-zinc-100 text-zinc-800 rounded-bl-sm"
                }`}
              >
                {isUser ? (
                  <span className="whitespace-pre-wrap">{text}</span>
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="leading-snug">{children}</li>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      code: ({ children }) => <code className="bg-zinc-200 px-1 rounded text-xs font-mono">{children}</code>,
                      a: ({ href, children }) => {
                        const safe = href && /^https?:\/\//.test(href) ? href : "#";
                        return <a href={safe} target="_blank" rel="noopener noreferrer" className="underline">{children}</a>;
                      },
                      hr: () => <hr className="my-2 border-zinc-300" />,
                    }}
                  >
                    {text}
                  </ReactMarkdown>
                )}
              </div>
            );
          }

          if (part.type === "dynamic-tool") {
            return (
              <div key={i}>
                {renderDynamicTool(part as unknown as DynamicToolPart)}
              </div>
            );
          }

          if (typeof part.type === "string" && (part.type as string).startsWith("tool-")) {
            const toolPart = part as unknown as DynamicToolPart & { type: string };
            return (
              <div key={i}>
                {renderDynamicTool({
                  type: "dynamic-tool",
                  toolName: (part.type as string).replace(/^tool-/, ""),
                  toolCallId: toolPart.toolCallId,
                  state: toolPart.state,
                  output: toolPart.output,
                })}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
