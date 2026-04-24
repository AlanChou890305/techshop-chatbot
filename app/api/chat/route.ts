import { streamText, tool, convertToModelMessages, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { products } from "@/lib/products";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(3),
    tools: {
      recommend_products: tool({
        description:
          "當你決定推薦商品時呼叫此工具。只在已充分了解用戶需求後才呼叫，不可在需求模糊時使用。",
        inputSchema: z.object({
          summary: z
            .string()
            .describe("用一句話總結用戶的核心需求，例如：「通勤使用、預算三千內的降噪耳機」"),
          recommendations: z
            .array(
              z.object({
                productId: z.string().describe("商品 ID，必須是 product_catalog 中存在的 ID"),
                reason: z.string().describe("推薦原因，必須對應用戶說的具體需求點，2-3 句話"),
              })
            )
            .min(1)
            .max(3),
        }),
        execute: async ({ summary, recommendations }) => {
          const resolved = recommendations.map(({ productId, reason }) => {
            const product = products.find((p) => p.id === productId);
            return { product: product ?? null, reason };
          });
          return { summary, recommendations: resolved };
        },
      }),

      escalate_to_human: tool({
        description:
          "當問題超出你的能力範圍、需要具體訂單資訊、或用戶要求轉真人時呼叫此工具。",
        inputSchema: z.object({
          reason: z.string().describe("為什麼需要轉真人客服，一句話說明"),
        }),
        execute: async ({ reason }) => {
          return {
            reason,
            contact: { email: "support@techshop.tw", phone: "02-1234-5678", hours: "週一至週五 9:00-18:00" },
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
