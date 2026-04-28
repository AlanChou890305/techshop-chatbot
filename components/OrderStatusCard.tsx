"use client";

import type { Order, OrderStatus } from "@/lib/orders";

const statusStyle: Record<OrderStatus, string> = {
  processing: "bg-amber-100 text-amber-800 border-amber-200",
  shipped:    "bg-blue-100 text-blue-800 border-blue-200",
  delivered:  "bg-green-100 text-green-800 border-green-200",
  cancelled:  "bg-zinc-100 text-zinc-500 border-zinc-200",
  refunding:  "bg-red-100 text-red-700 border-red-200",
};

export default function OrderStatusCard({ order }: { order: Order }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3 w-full max-w-sm shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400 font-mono">{order.orderNumber}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyle[order.status]}`}>
          {order.statusLabel}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-900">{order.product}</p>
        <p className="text-base font-bold text-blue-600 mt-0.5">NT${order.amount.toLocaleString()}</p>
      </div>
      <div className="space-y-1.5 pt-2 border-t border-zinc-100 text-xs">
        <Row label="下單日期" value={order.createdAt} />
        {order.estimatedDelivery && <Row label="預計到貨" value={order.estimatedDelivery} />}
        {order.deliveredAt && <Row label="送達日期" value={order.deliveredAt} />}
        {order.carrier && <Row label="物流商" value={order.carrier} />}
        {order.trackingNumber && <Row label="追蹤編號" value={order.trackingNumber} />}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-zinc-400 w-14 shrink-0">{label}</span>
      <span className="text-zinc-700 font-mono">{value}</span>
    </div>
  );
}
