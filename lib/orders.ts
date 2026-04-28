export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled" | "refunding";

export type Order = {
  orderNumber: string;
  status: OrderStatus;
  statusLabel: string;
  product: string;
  amount: number;
  createdAt: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  trackingNumber?: string;
  carrier?: string;
};

const MOCK_ORDERS: Record<string, Order> = {
  TS20240001: {
    orderNumber: "TS20240001",
    status: "shipped",
    statusLabel: "已出貨・配送中",
    product: "TechShop Pro 15 手機",
    amount: 28900,
    createdAt: "2024-04-20",
    estimatedDelivery: "2024-04-23",
    trackingNumber: "7118234567890",
    carrier: "黑貓宅急便",
  },
  TS20240002: {
    orderNumber: "TS20240002",
    status: "delivered",
    statusLabel: "已送達",
    product: "TechShop Air 14 筆電",
    amount: 35900,
    createdAt: "2024-04-15",
    deliveredAt: "2024-04-18",
    trackingNumber: "7118234567891",
    carrier: "宅配通",
  },
  TS20240003: {
    orderNumber: "TS20240003",
    status: "processing",
    statusLabel: "付款確認中",
    product: "TechShop Pro Buds 耳機 ×2",
    amount: 13980,
    createdAt: "2024-04-22",
    estimatedDelivery: "2024-04-25",
  },
  TS20240004: {
    orderNumber: "TS20240004",
    status: "refunding",
    statusLabel: "退款處理中",
    product: "TechShop Student 13 筆電",
    amount: 18900,
    createdAt: "2024-04-10",
  },
  TS20240005: {
    orderNumber: "TS20240005",
    status: "cancelled",
    statusLabel: "已取消",
    product: "TechShop Ultra Fold 折疊手機",
    amount: 52900,
    createdAt: "2024-04-21",
  },
};

export function lookupOrder(orderNumber: string): Order | null {
  const normalized = orderNumber.trim().toUpperCase().replace(/[\s-]/g, "");
  return MOCK_ORDERS[normalized] ?? null;
}
