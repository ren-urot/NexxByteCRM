import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  image: string;
}

interface InventoryContextType {
  flowerItems: InventoryItem[];
  retailItems: InventoryItem[];
  setFlowerItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  setRetailItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  deductStock: (crmType: string, productName: string, qty: number) => void;
  getItems: (crmType: string) => InventoryItem[];
}

const DEFAULT_INVENTORY_CONTEXT: InventoryContextType = {
  flowerItems: [],
  retailItems: [],
  setFlowerItems: () => {},
  setRetailItems: () => {},
  deductStock: () => {},
  getItems: () => [],
};

const InventoryContext = createContext<InventoryContextType>(DEFAULT_INVENTORY_CONTEXT);

const FLOWER_ITEMS: InventoryItem[] = [
  { id: "fi1", sku: "SKU001", name: "Red Rose Bouquet", category: "Bouquets", stock: 24, price: 1200, image: "https://images.unsplash.com/photo-1714153990387-fd0eaeee0ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjByb3NlJTIwYm91cXVldCUyMGFycmFuZ2VtZW50fGVufDF8fHx8MTc3MzYzMzkxOXww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "fi2", sku: "SKU002", name: "White Lily Arrangement", category: "Arrangements", stock: 12, price: 1800, image: "https://images.unsplash.com/photo-1772211506068-3d3f0ce794b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGxpbHklMjBmbG93ZXIlMjBhcnJhbmdlbWVudCUyMHZhc2V8ZW58MXx8fHwxNzczNjMzOTE5fDA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "fi3", sku: "SKU003", name: "Sunflower Bundle", category: "Bouquets", stock: 18, price: 950, image: "https://images.unsplash.com/photo-1551558099-0044fe016e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBidW5kbGUlMjBib3VxdWV0JTIweWVsbG93fGVufDF8fHx8MTc3MzYzMzkyMHww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "fi4", sku: "SKU004", name: "Orchid Pot (Purple)", category: "Potted Plants", stock: 8, price: 2500, image: "https://images.unsplash.com/photo-1767380753017-b7681c1bc172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBvcmNoaWQlMjBwb3R0ZWQlMjBwbGFudHxlbnwxfHx8fDE3NzM2MzM5MjB8MA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "fi5", sku: "SKU005", name: "Mixed Tulip Bouquet", category: "Bouquets", stock: 15, price: 1400, image: "https://images.unsplash.com/photo-1522482999650-be954a7c0392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHR1bGlwJTIwYm91cXVldCUyMG1peGVkfGVufDF8fHx8MTc3MzYzMzkyMXww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "fi6", sku: "SKU006", name: "Dried Flower Set", category: "Dried Flowers", stock: 30, price: 750, image: "https://images.unsplash.com/photo-1748125807728-f742d9cdfed0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZsb3dlciUyMGFycmFuZ2VtZW50JTIwc2V0fGVufDF8fHx8MTc3MzYzMzkyMXww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "fi7", sku: "SKU007", name: "Carnation Basket", category: "Baskets", stock: 10, price: 1600, image: "https://images.unsplash.com/photo-1770929243033-03e4ed34c406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJuYXRpb24lMjBmbG93ZXIlMjBiYXNrZXR8ZW58MXx8fHwxNzczNjMzOTIxfDA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "fi8", sku: "SKU008", name: "Pink Tulip Bouquet", category: "Bouquets", stock: 5, price: 1100, image: "https://images.unsplash.com/photo-1711277039621-1eb031dad6ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwdHVsaXAlMjBib3VxdWV0JTIwc3ByaW5nfGVufDF8fHx8MTc3MzYzMzkyMnww&ixlib=rb-4.1.0&q=80&w=400" },
];

const RETAIL_ITEMS: InventoryItem[] = [
  { id: "ri1", sku: "SKU101", name: "Wireless Headphones", category: "Electronics", stock: 42, price: 2499, image: "https://images.unsplash.com/photo-1578517581165-61ec5ab27a19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBwcm9kdWN0JTIwd2hpdGV8ZW58MXx8fHwxNzczNTU4NDk3fDA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri2", sku: "SKU102", name: "Leather Wallet", category: "Accessories", stock: 65, price: 899, image: "https://images.unsplash.com/photo-1772651983030-565c2b7be181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwd2FsbGV0JTIwYnJvd24lMjBhY2Nlc3Nvcnl8ZW58MXx8fHwxNzczNjMzOTcyfDA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri3", sku: "SKU103", name: "Running Shoes", category: "Footwear", stock: 28, price: 3499, image: "https://images.unsplash.com/photo-1739138054456-0aca1b90e4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2VycyUyMHJlZHxlbnwxfHx8fDE3NzM2MzM5NzJ8MA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri4", sku: "SKU104", name: "Cotton T-Shirt", category: "Apparel", stock: 120, price: 599, image: "https://images.unsplash.com/photo-1642761589121-ec47d4c425ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNvdHRvbiUyMHRzaGlydCUyMHByb2R1Y3R8ZW58MXx8fHwxNzczNjMzOTczfDA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri5", sku: "SKU105", name: "Designer Sunglasses", category: "Accessories", stock: 0, price: 1999, image: "https://images.unsplash.com/photo-1722842529114-f2d851f91597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHN1bmdsYXNzZXMlMjBwcm9kdWN0fGVufDF8fHx8MTc3MzU3MTQ4Mnww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri6", sku: "SKU106", name: "Smart Watch", category: "Electronics", stock: 7, price: 4999, image: "https://images.unsplash.com/photo-1760804876235-42ba2ac060f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VudGVkJTIwY2FuZGxlJTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3MzU3MDg4OHww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri7", sku: "SKU107", name: "Backpack", category: "Bags", stock: 35, price: 1799, image: "https://images.unsplash.com/photo-1579718067654-cda6d61706e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZyUyMHByb2R1Y3QlMjBzaG90fGVufDF8fHx8MTc3MzYzMzk3NHww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri8", sku: "SKU108", name: "Ceramic Mug Set", category: "Home & Living", stock: 48, price: 650, image: "https://images.unsplash.com/photo-1666713711218-8ea7743c8ed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwY29mZmVlJTIwbXVnJTIwc2V0fGVufDF8fHx8MTc3MzYzMzk3NHww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri9", sku: "SKU109", name: "Scented Candle", category: "Home & Living", stock: 72, price: 450, image: "https://images.unsplash.com/photo-1760804876235-42ba2ac060f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VudGVkJTIwY2FuZGxlJTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3MzU3MDg4OHww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri10", sku: "SKU110", name: "Yoga Mat", category: "Fitness", stock: 20, price: 1299, image: "https://images.unsplash.com/photo-1746796751590-a8c0f15d4900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZml0bmVzcyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc3MzYzMzk3NXww&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri11", sku: "SKU111", name: "Bluetooth Speaker", category: "Electronics", stock: 15, price: 1899, image: "https://images.unsplash.com/photo-1674303324806-7018a739ed11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVldG9vdGglMjBzcGVha2VyJTIwcG9ydGFibGV8ZW58MXx8fHwxNzczNTc0NDY5fDA&ixlib=rb-4.1.0&q=80&w=400" },
  { id: "ri12", sku: "SKU112", name: "Water Bottle", category: "Home & Living", stock: 55, price: 450, image: "https://images.unsplash.com/photo-1700506844069-6da3871c78e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMHdhdGVyJTIwYm90dGxlJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzM2MzM5NzZ8MA&ixlib=rb-4.1.0&q=80&w=400" },
];

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [flowerItems, setFlowerItems] = useState<InventoryItem[]>(FLOWER_ITEMS);
  const [retailItems, setRetailItems] = useState<InventoryItem[]>(RETAIL_ITEMS);

  const getItems = useCallback(
    (crmType: string) => (crmType === "flowershop" ? flowerItems : retailItems),
    [flowerItems, retailItems]
  );

  const deductStock = useCallback((crmType: string, productName: string, qty: number) => {
    const setter = crmType === "flowershop" ? setFlowerItems : setRetailItems;
    setter((prev) =>
      prev.map((item) =>
        item.name === productName
          ? { ...item, stock: Math.max(0, item.stock - qty) }
          : item
      )
    );
  }, []);

  return (
    <InventoryContext.Provider value={{ flowerItems, retailItems, setFlowerItems, setRetailItems, deductStock, getItems }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}