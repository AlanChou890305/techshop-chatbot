"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  reason: string;
};

export default function ProductCard({ product, reason }: Props) {
  return (
    <Card className="border border-zinc-200 shadow-sm hover:shadow-md transition-shadow w-full max-w-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold leading-snug text-zinc-900">
            {product.name}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {product.category}
          </Badge>
        </div>
        <p className="text-lg font-bold text-blue-600 mt-1">
          NT${product.price.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <p className="text-xs text-zinc-500 leading-relaxed">{product.description}</p>

        <div className="bg-blue-50 rounded-md px-3 py-2">
          <p className="text-xs font-medium text-blue-700 mb-1">推薦原因</p>
          <p className="text-xs text-blue-800 leading-relaxed">{reason}</p>
        </div>

        <div className="space-y-1">
          {Object.entries(product.specs)
            .slice(0, 4)
            .map(([key, value]) => (
              <div key={key} className="flex text-xs gap-1">
                <span className="text-zinc-400 shrink-0 w-16">{key}</span>
                <span className="text-zinc-700">{value}</span>
              </div>
            ))}
        </div>

        {!product.inStock && (
          <Badge variant="destructive" className="text-xs">
            目前缺貨
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
