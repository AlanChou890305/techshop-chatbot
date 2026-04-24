export type Product = {
  id: string;
  name: string;
  category: "手機" | "筆電" | "耳機" | "平板" | "配件";
  price: number;
  description: string;
  specs: Record<string, string>;
  tags: string[];
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "P001",
    name: "TechShop Pro 15 手機",
    category: "手機",
    price: 28900,
    description: "旗艦級 6.7 吋 AMOLED 螢幕，搭載最新處理器，適合重度使用者與攝影愛好者。",
    specs: {
      螢幕: "6.7 吋 AMOLED 120Hz",
      處理器: "Snapdragon 8 Gen 3",
      記憶體: "12GB RAM",
      儲存空間: "256GB",
      電池: "5000mAh",
      相機: "主鏡頭 50MP + 超廣角 12MP + 望遠 10MP",
      系統: "Android 15",
      防水: "IP68",
    },
    tags: ["旗艦", "攝影", "商務", "重度使用"],
    inStock: true,
  },
  {
    id: "P002",
    name: "TechShop Lite 13 手機",
    category: "手機",
    price: 12900,
    description: "輕薄入門機，日常通話、社群媒體、輕度使用的最佳選擇。",
    specs: {
      螢幕: "6.1 吋 IPS 60Hz",
      處理器: "Snapdragon 6s Gen 3",
      記憶體: "6GB RAM",
      儲存空間: "128GB",
      電池: "4500mAh",
      相機: "主鏡頭 48MP + 超廣角 8MP",
      系統: "Android 15",
      防水: "IP54",
    },
    tags: ["入門", "學生", "輕度使用", "日常"],
    inStock: true,
  },
  {
    id: "P003",
    name: "TechShop Ultra Fold 手機",
    category: "手機",
    price: 52900,
    description: "折疊螢幕手機，展開為 7.6 吋平板體驗，商務人士的生產力利器。",
    specs: {
      螢幕: "折疊內螢幕 7.6 吋 + 外螢幕 6.2 吋",
      處理器: "Snapdragon 8 Gen 3",
      記憶體: "12GB RAM",
      儲存空間: "512GB",
      電池: "4400mAh",
      相機: "主鏡頭 50MP + 超廣角 12MP",
      系統: "Android 15",
      防水: "IPX8",
    },
    tags: ["折疊", "旗艦", "商務", "生產力"],
    inStock: false,
  },
  {
    id: "P004",
    name: "TechBook Air 14 筆電",
    category: "筆電",
    price: 35900,
    description: "輕薄商務筆電，1.2kg 機身，全天續航，適合經常出差的工作者。",
    specs: {
      螢幕: "14 吋 2K IPS 防眩光",
      處理器: "Intel Core Ultra 7 155H",
      記憶體: "16GB RAM",
      儲存空間: "512GB NVMe SSD",
      電池: "72Wh（約 12 小時）",
      重量: "1.2kg",
      連接埠: "Thunderbolt 4 x2、USB-A x2、HDMI",
      作業系統: "Windows 11 Pro",
    },
    tags: ["商務", "輕薄", "出差", "長效續航"],
    inStock: true,
  },
  {
    id: "P005",
    name: "TechBook Pro 16 筆電",
    category: "筆電",
    price: 62900,
    description: "高效能創作者筆電，獨顯 RTX 4070，適合影片剪輯、3D 建模、遊戲開發。",
    specs: {
      螢幕: "16 吋 QHD OLED 240Hz",
      處理器: "Intel Core i9-14900HX",
      記憶體: "32GB DDR5 RAM",
      儲存空間: "1TB NVMe SSD",
      顯示卡: "NVIDIA RTX 4070",
      電池: "99Wh（約 8 小時輕度使用）",
      重量: "2.1kg",
      作業系統: "Windows 11 Pro",
    },
    tags: ["遊戲", "創作", "影片剪輯", "3D設計", "高效能"],
    inStock: true,
  },
  {
    id: "P006",
    name: "TechBook Student 13 筆電",
    category: "筆電",
    price: 18900,
    description: "學生入門款，跑課報告、線上上課、文書處理皆宜，CP 值高。",
    specs: {
      螢幕: "13.3 吋 FHD IPS",
      處理器: "AMD Ryzen 5 7530U",
      記憶體: "8GB RAM",
      儲存空間: "256GB SSD",
      電池: "54Wh（約 10 小時）",
      重量: "1.4kg",
      作業系統: "Windows 11 Home",
    },
    tags: ["學生", "入門", "文書", "線上課程"],
    inStock: true,
  },
  {
    id: "P007",
    name: "TechBuds Pro 無線耳機",
    category: "耳機",
    price: 6990,
    description: "主動降噪旗艦耳塞，通勤、遠端會議必備，支援空間音訊。",
    specs: {
      類型: "入耳式",
      主動降噪: "支援，最高 -42dB",
      連接: "藍牙 5.3",
      續航: "耳機 8 小時 + 充電盒 32 小時",
      防水: "IPX5",
      麥克風: "雙麥克風陣列（通話降噪）",
      充電: "USB-C / Qi 無線充電",
    },
    tags: ["通勤", "降噪", "遠端會議", "音樂"],
    inStock: true,
  },
  {
    id: "P008",
    name: "TechBuds Sport 運動耳機",
    category: "耳機",
    price: 2990,
    description: "運動專用開放式耳塞，穩固耳掛設計，跑步騎車不脫落。",
    specs: {
      類型: "半入耳開放式",
      主動降噪: "不支援",
      連接: "藍牙 5.2",
      續航: "耳機 10 小時 + 充電盒 30 小時",
      防水: "IPX7",
      麥克風: "單麥克風",
      充電: "USB-C",
    },
    tags: ["運動", "跑步", "騎車", "戶外"],
    inStock: true,
  },
  {
    id: "P009",
    name: "TechBuds Studio 頭戴耳機",
    category: "耳機",
    price: 9900,
    description: "頭戴式主動降噪耳機，40mm 大單體，適合居家聆聽、影片剪輯監聽。",
    specs: {
      類型: "頭戴式",
      主動降噪: "支援，最高 -35dB",
      連接: "藍牙 5.3 / 3.5mm",
      續航: "30 小時（ANC 開啟）/ 40 小時（ANC 關閉）",
      防水: "不支援（室內使用為主）",
      麥克風: "收縮式麥克風臂",
      充電: "USB-C",
    },
    tags: ["居家", "音樂", "影片剪輯", "監聽", "長時間配戴"],
    inStock: true,
  },
  {
    id: "P010",
    name: "TechPad Air 11 平板",
    category: "平板",
    price: 14900,
    description: "輕盈 11 吋平板，適合閱讀、追劇、線上課程，支援手寫筆（選購）。",
    specs: {
      螢幕: "11 吋 LCD 90Hz",
      處理器: "Snapdragon 7s Gen 2",
      記憶體: "6GB RAM",
      儲存空間: "128GB",
      電池: "8000mAh",
      重量: "460g",
      手寫筆: "TechPen 1（選購 $1,490）",
      連接: "WiFi 6 / 選配 5G",
    },
    tags: ["閱讀", "追劇", "學生", "輕度使用", "線上課程"],
    inStock: true,
  },
  {
    id: "P011",
    name: "TechPad Pro 13 平板",
    category: "平板",
    price: 34900,
    description: "13 吋旗艦平板，OLED 螢幕，支援 USB 4，可連接外接螢幕，作為輕量工作站使用。",
    specs: {
      螢幕: "13 吋 OLED 120Hz",
      處理器: "Snapdragon 8 Gen 3",
      記憶體: "12GB RAM",
      儲存空間: "256GB",
      電池: "10090mAh",
      重量: "571g",
      手寫筆: "TechPen 2（選購 $2,490）",
      連接: "WiFi 7 / USB 4 / 支援外接螢幕",
    },
    tags: ["生產力", "繪圖", "商務", "旗艦", "外接螢幕"],
    inStock: true,
  },
  {
    id: "P012",
    name: "TechCharge 65W GaN 充電器",
    category: "配件",
    price: 990,
    description: "氮化鎵多孔充電器，1C2A 三孔同時輸出，出差必備。",
    specs: {
      總輸出功率: "65W",
      連接埠: "USB-C x2、USB-A x1",
      技術: "PD 3.0、QC 4.0",
      尺寸: "65mm x 32mm x 32mm",
      重量: "120g",
      相容: "筆電 / 手機 / 平板",
    },
    tags: ["充電", "出差", "多埠", "快充"],
    inStock: true,
  },
  {
    id: "P013",
    name: "TechCharge 10000 行動電源",
    category: "配件",
    price: 1490,
    description: "10000mAh 雙向快充行動電源，輸入 30W、輸出 22.5W，輕薄機身。",
    specs: {
      容量: "10000mAh",
      輸出: "USB-C 22.5W + USB-A 18W",
      輸入: "USB-C 30W",
      重量: "215g",
      尺寸: "145mm x 68mm x 14mm",
    },
    tags: ["充電", "外出", "緊急備電"],
    inStock: true,
  },
  {
    id: "P014",
    name: "TechHub USB-C 七合一集線器",
    category: "配件",
    price: 1290,
    description: "支援 HDMI 4K、SD 讀卡、PD 直通 100W，擴充筆電連接埠的首選。",
    specs: {
      連接埠: "USB-C PD 100W + HDMI 4K60 + USB-A 3.0 x3 + SD + MicroSD",
      資料傳輸: "USB 3.0（最高 5Gbps）",
      相容: "Windows / macOS / ChromeOS",
      重量: "95g",
    },
    tags: ["筆電", "擴充", "HDMI", "讀卡機", "出差"],
    inStock: true,
  },
  {
    id: "P015",
    name: "TechPen 手寫筆 2 代",
    category: "配件",
    price: 2490,
    description: "相容 TechPad 系列平板，4096 階壓感，磁吸充電，繪圖筆記兩用。",
    specs: {
      壓感: "4096 階",
      傾斜感應: "支援，±60°",
      充電: "磁吸式無線充電",
      延遲: "2.8ms",
      相容: "TechPad Air 11 / TechPad Pro 13",
    },
    tags: ["繪圖", "筆記", "創作", "學生"],
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatProductForPrompt(p: Product): string {
  const specsText = Object.entries(p.specs)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join("\n");
  return `[${p.id}] ${p.name}（${p.category}）- NT$${p.price.toLocaleString()}
描述: ${p.description}
規格:
${specsText}
標籤: ${p.tags.join("、")}
庫存: ${p.inStock ? "有貨" : "缺貨"}`;
}
