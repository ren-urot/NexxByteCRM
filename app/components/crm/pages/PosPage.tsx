import { useState, useRef, useMemo } from "react";
import { useCrm } from "../CrmContext";
import { useInventory } from "../InventoryContext";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  Store,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  Printer,
  ShoppingCart,
  CheckCircle2,
  X,
  Receipt,
  ImageIcon,
} from "lucide-react";

// Product data derived from inventory
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

const flowerCategories = ["All", "Flowers", "Dried Flowers", "Potted Plants", "Supplies", "Accessories"];
const retailCategories = ["All", "Clothing", "Electronics", "Footwear", "Bags", "Accessories", "Home & Living", "Beauty"];

interface CartItem {
  product: Product;
  quantity: number;
}

type PaymentMethod = "card" | "gcash" | "cash";

interface PaymentState {
  method: PaymentMethod;
  step: "processing" | "change" | "success";
  cashTendered?: number;
}

export function PosPage() {
  const { config, crmType, activeSubscription } = useCrm();
  const isRetail = crmType === "retail";
  const inventory = useInventory();
  const inventoryItems = inventory.getItems(crmType);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  // Derive products from shared inventory
  const products: Product[] = useMemo(
    () =>
      inventoryItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image,
        stock: item.stock,
      })),
    [inventoryItems]
  );

  const categories = isRetail ? retailCategories : flowerCategories;
  const storeName = isRetail ? "ShopWise Retail" : (activeSubscription?.businessName || "Bloom & Petal Flower Shop");
  const storeAddress = isRetail ? "456 Retail Ave., BGC, Taguig" : "123 Flower St., Makati City";

  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [autoPrint, setAutoPrint] = useState(false);
  const [payment, setPayment] = useState<PaymentState | null>(null);
  const [cashInput, setCashInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const color = config.color;

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // Check stock limit
        const currentInCart = existing.quantity;
        if (currentInCart >= product.stock) return prev;
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id !== productId) return item;
          const newQty = item.quantity + delta;
          // Check stock limit
          const invItem = inventoryItems.find((i) => i.id === productId);
          if (invItem && newQty > invItem.stock) return item;
          return { ...item, quantity: newQty };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax;

  const scrollProducts = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Payment flow handlers
  const initiatePayment = (method: PaymentMethod) => {
    if (cart.length === 0) return;
    if (method === "cash") {
      setPayment({ method, step: "change" });
      setCashInput("");
    } else {
      setPayment({ method, step: "processing" });
      // Simulate card/gcash processing
      setTimeout(() => {
        setPayment({ method, step: "success" });
        // Deduct stock from inventory
        deductCartFromInventory();
      }, 2000);
    }
  };

  const handleCashPayment = () => {
    const tendered = parseFloat(cashInput);
    if (isNaN(tendered) || tendered < total) return;
    setPayment({ method: "cash", step: "processing", cashTendered: tendered });
    setTimeout(() => {
      setPayment({ method: "cash", step: "success", cashTendered: tendered });
      // Deduct stock from inventory
      deductCartFromInventory();
    }, 1200);
  };

  const deductCartFromInventory = () => {
    cart.forEach((item) => {
      inventory.deductStock(crmType, item.product.name, item.quantity);
    });
  };

  const completeOrder = () => {
    setPayment(null);
    setCart([]);
    setCashInput("");
  };

  const cashTendered = payment?.cashTendered || 0;
  const change = cashTendered - total;

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-0 font-['Inter',sans-serif]">
      {/* Left: Products Section */}
      <div className="flex-1 flex flex-col px-4 md:px-8 py-5 overflow-auto relative">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[29px] font-semibold" style={{ color }}>
            Point of Sale
          </h1>
          {/* Mobile cart toggle */}
          <button
            onClick={() => setMobileCartOpen(!mobileCartOpen)}
            className="md:hidden relative w-10 h-10 rounded-[10px] flex items-center justify-center border border-[#e9e9e9] bg-white cursor-pointer"
          >
            <ShoppingCart size={18} style={{ color }} />
            {totalItems > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-[20px] h-[20px] rounded-full text-white text-[10px] font-semibold flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`h-[30px] px-4 rounded-[9px] text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "text-white shadow-sm"
                  : "bg-white text-[#5d5d5d] border border-[#e9e9e9] hover:border-[#ccc]"
              }`}
              style={activeCategory === cat ? { backgroundColor: color } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid with Carousel Arrows */}
        <div className="flex-1 relative">
          <div className="flex items-center gap-2">
            {/* Left Arrow */}
            <button
              onClick={() => scrollProducts("left")}
              className="shrink-0 w-[29px] h-[29px] rounded-full flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity cursor-pointer"
              style={{ backgroundColor: color }}
            >
              <ChevronLeft size={18} className="text-white" />
            </button>

            {/* Products Scroll Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-x-auto overflow-y-hidden relative scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex flex-wrap gap-3 pb-4 content-start">
                {filteredProducts.map((product) => {
                  const outOfStock = product.stock <= 0;
                  return (
                    <button
                      key={product.id}
                      onClick={() => addToCart(product)}
                      disabled={outOfStock}
                      className={`w-[131px] bg-white rounded-[7px] border border-[#e9e9e9] overflow-hidden text-left hover:shadow-md transition-shadow cursor-pointer shrink-0 group relative ${
                        outOfStock ? "opacity-50 cursor-not-allowed hover:shadow-none" : ""
                      }`}
                    >
                      <div className="w-full h-[149px] overflow-hidden relative">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                            <ImageIcon size={28} className="text-[#d0d0d0]" />
                          </div>
                        )}
                        {outOfStock && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <span className="bg-white/90 text-[#c62828] text-[10px] font-semibold px-2 py-1 rounded-full">
                              Out of Stock
                            </span>
                          </div>
                        )}
                        {/* Stock badge */}
                        {!outOfStock && product.stock <= 10 && (
                          <div className="absolute top-1.5 right-1.5 bg-[#fff3e0] text-[#e65100] text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                            {product.stock} left
                          </div>
                        )}
                      </div>
                      <div className="p-1.5 pt-[5px]">
                        <p className="text-[#383838] text-[11px] font-medium truncate leading-[16px]">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-[12px] font-semibold leading-[18px]" style={{ color }}>
                            P{product.price.toLocaleString()}
                          </p>
                          <p
                            className={`text-[9px] font-medium leading-[18px] ${
                              product.stock <= 0
                                ? "text-[#c62828]"
                                : product.stock <= 10
                                ? "text-[#e65100]"
                                : "text-[#9a9a9a]"
                            }`}
                          >
                            {product.stock <= 0 ? "No stock" : `${product.stock} left`}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollProducts("right")}
              className="shrink-0 w-[29px] h-[29px] rounded-full flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity cursor-pointer"
              style={{ backgroundColor: color }}
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Current Order Sidebar */}
      <div className={`${mobileCartOpen ? "fixed inset-0 z-50 bg-white" : "hidden"} md:flex md:static md:w-[286px] bg-white border-l border-[#e9e9e9] flex flex-col shrink-0`}>
        {/* Mobile close button */}
        <div className="flex md:hidden items-center justify-between px-4 pt-4 pb-2">
          <span className="text-[#383838] text-[16px] font-semibold">Cart</span>
          <button onClick={() => setMobileCartOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer">
            <X size={20} className="text-[#6b6b6b]" />
          </button>
        </div>

        {/* Header */}
        <div className="px-[18px] pt-[18px] pb-3 border-b border-[#e9e9e9]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} style={{ color }} />
            <span className="text-[#383838] text-[16px] font-semibold">Current Order</span>
            {totalItems > 0 && (
              <span
                className="ml-auto w-[22px] h-[22px] rounded-full text-white text-[11px] font-semibold flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                {totalItems}
              </span>
            )}
          </div>
        </div>

        {/* Pickup / Delivery Toggle */}
        <div className="px-[14px] pt-[11px] pb-[9px] border-b border-[#e9e9e9]">
          <div className="bg-[#f6f6f6] rounded-[9px] p-[4px] flex">
            <button
              onClick={() => setOrderType("pickup")}
              className={`flex-1 h-[32px] rounded-[7px] text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                orderType === "pickup"
                  ? "text-white shadow-sm"
                  : "text-[#5d5d5d]"
              }`}
              style={orderType === "pickup" ? { backgroundColor: color } : {}}
            >
              <Store size={13} />
              {isRetail ? "In-Store" : "Store Pickup"}
            </button>
            <button
              onClick={() => setOrderType("delivery")}
              className={`flex-1 h-[32px] rounded-[7px] text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                orderType === "delivery"
                  ? "text-white shadow-sm"
                  : "text-[#5d5d5d]"
              }`}
              style={orderType === "delivery" ? { backgroundColor: color } : {}}
            >
              <Truck size={13} />
              Delivery
            </button>
          </div>

          {/* Store Location */}
          <div className="mt-[9px] rounded-[9px] p-[9px] flex items-start gap-2" style={{ backgroundColor: `${color}10` }}>
            <Store size={14} className="mt-0.5 shrink-0" style={{ color }} />
            <div className="min-w-0">
              <p className="text-[#383838] text-[11px] font-medium truncate">{storeName}</p>
              <p className="text-[#5d5d5d] text-[10px]">{storeAddress}</p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto relative min-h-0">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
              <ShoppingCart size={36} className="text-[#e0e0e0] mb-3" />
              <p className="text-[#9a9a9a] text-[13px]">No items yet</p>
              <p className="text-[#c0c0c0] text-[11px] mt-1">Click a product to add it to the order</p>
            </div>
          ) : (
            cart.map((item) => {
              const invItem = inventoryItems.find((i) => i.id === item.product.id);
              const maxStock = invItem?.stock ?? item.quantity;
              return (
                <div
                  key={item.product.id}
                  className="flex items-center gap-[11px] px-[14px] py-[9px] border-b border-[#f0f0f0]"
                >
                  {/* Product Thumb */}
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-[36px] h-[36px] rounded-[9px] object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-[36px] h-[36px] rounded-[9px] bg-[#f0f0f0] flex items-center justify-center shrink-0">
                      <ImageIcon size={14} className="text-[#c0c0c0]" />
                    </div>
                  )}
                  {/* Name + Price */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#383838] text-[12px] font-medium truncate leading-[18px]">
                      {item.product.name}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[12px] font-semibold leading-[18px]" style={{ color }}>
                        P{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity >= maxStock && (
                        <span className="text-[9px] text-[#e65100] bg-[#fff3e0] px-1.5 py-0.5 rounded-full font-medium">Max</span>
                      )}
                    </div>
                  </div>
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-[4px] shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="w-[22px] h-[22px] rounded-full border border-[#e9e9e9] flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer"
                    >
                      <Minus size={11} className="text-[#0a0a0a]" />
                    </button>
                    <span className="w-[22px] text-center text-[12px] font-medium text-[#0a0a0a]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      disabled={item.quantity >= maxStock}
                      className="w-[22px] h-[22px] rounded-full border border-[#e9e9e9] flex items-center justify-center hover:bg-[#f5f5f5] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus size={11} className="text-[#0a0a0a]" />
                    </button>
                  </div>
                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="shrink-0 cursor-pointer hover:opacity-70"
                  >
                    <Trash2 size={14} className="text-[#ccc]" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Totals + Payment */}
        <div className="border-t border-[#e9e9e9] px-[14px] pt-[11px] pb-[14px]">
          {/* Subtotal */}
          <div className="flex justify-between text-[13px] mb-1">
            <span className="text-[#9a9a9a]">Subtotal</span>
            <span className="text-[#383838]">P{subtotal.toLocaleString()}</span>
          </div>
          {/* Tax */}
          <div className="flex justify-between text-[13px] mb-2">
            <span className="text-[#9a9a9a]">Tax (12%)</span>
            <span className="text-[#383838]">P{tax.toLocaleString()}</span>
          </div>
          {/* Total */}
          <div className="flex justify-between text-[15px] font-semibold mb-3">
            <span className="text-[#383838]">Total</span>
            <span style={{ color }}>P{total.toLocaleString()}</span>
          </div>

          {/* Auto-print receipt */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-[#9a9a9a] text-[12px]">
              <Printer size={14} />
              Auto-print receipt
            </div>
            <button
              onClick={() => setAutoPrint(!autoPrint)}
              className={`w-[36px] h-[20px] rounded-full relative transition-all cursor-pointer ${
                autoPrint ? "" : "bg-[#e0e0e0]"
              }`}
              style={autoPrint ? { backgroundColor: color } : {}}
            >
              <div
                className={`absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-all ${
                  autoPrint ? "left-[18px]" : "left-[2px]"
                }`}
              />
            </button>
          </div>

          {/* Payment Buttons */}
          <div className="flex flex-col gap-[7px]">
            <button
              onClick={() => initiatePayment("card")}
              disabled={cart.length === 0}
              className="h-[38px] rounded-[9px] text-white text-[13px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: color }}
            >
              <CreditCard size={15} />
              Pay with Card
            </button>
            <button
              onClick={() => initiatePayment("gcash")}
              disabled={cart.length === 0}
              className="h-[38px] rounded-[9px] bg-[#0070E0] text-white text-[13px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Smartphone size={15} />
              Pay with GCash
            </button>
            <button
              onClick={() => initiatePayment("cash")}
              disabled={cart.length === 0}
              className="h-[38px] rounded-[9px] bg-[#4CAF50] text-white text-[13px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Banknote size={15} />
              Pay with Cash
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {payment && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => payment.step !== "processing" && setPayment(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[20px] shadow-2xl z-50 w-[calc(100%-2rem)] max-w-[420px] overflow-hidden">
            {/* Processing State */}
            {payment.step === "processing" && (
              <div className="py-16 px-8 flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 animate-pulse"
                  style={{ backgroundColor: `${color}15` }}
                >
                  {payment.method === "card" && <CreditCard size={28} style={{ color }} />}
                  {payment.method === "gcash" && <Smartphone size={28} className="text-[#0070E0]" />}
                  {payment.method === "cash" && <Banknote size={28} className="text-[#4CAF50]" />}
                </div>
                <p className="text-[#383838] text-[18px] font-semibold mb-2">Processing Payment...</p>
                <p className="text-[#9a9a9a] text-[14px]">
                  {payment.method === "card" && "Waiting for card authorization"}
                  {payment.method === "gcash" && "Waiting for GCash confirmation"}
                  {payment.method === "cash" && "Processing cash payment"}
                </p>
                <div className="mt-6 w-48 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color, animation: "loading 1.5s ease-in-out infinite" }}
                  />
                </div>
                <style>{`
                  @keyframes loading {
                    0% { width: 0%; }
                    50% { width: 80%; }
                    100% { width: 100%; }
                  }
                `}</style>
              </div>
            )}

            {/* Cash Tendered Input */}
            {payment.step === "change" && payment.method === "cash" && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[#383838] text-[18px] font-semibold">Cash Payment</h3>
                  <button
                    onClick={() => setPayment(null)}
                    className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer"
                  >
                    <X size={18} className="text-[#9a9a9a]" />
                  </button>
                </div>

                <div className="bg-[#f8f8f8] rounded-[12px] p-4 mb-5">
                  <div className="flex justify-between text-[14px] mb-1.5">
                    <span className="text-[#9a9a9a]">Total Amount</span>
                    <span className="font-semibold text-[#383838]">P{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#9a9a9a]">{cart.length} item(s)</span>
                    <span className="text-[#9a9a9a]">incl. 12% tax</span>
                  </div>
                </div>

                <label className="block text-[#383838] text-[14px] font-medium mb-2">Cash Tendered</label>
                <div className="relative mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9a9a] text-[15px] font-medium">P</span>
                  <input
                    type="number"
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                    placeholder="0"
                    autoFocus
                    className="w-full h-[52px] bg-[#f6f6f6] border border-[#e0e0e0] rounded-[12px] pl-8 pr-4 text-[20px] font-semibold text-[#383838] placeholder:text-[#d0d0d0] outline-none focus:border-[#999] transition-colors"
                  />
                </div>

                {/* Quick cash amount buttons */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[total, Math.ceil(total / 100) * 100, Math.ceil(total / 500) * 500, Math.ceil(total / 1000) * 1000]
                    .filter((v, i, arr) => arr.indexOf(v) === i)
                    .slice(0, 4)
                    .map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setCashInput(amount.toString())}
                        className="h-[36px] rounded-[8px] border border-[#e0e0e0] text-[13px] font-medium text-[#5d5d5d] hover:bg-[#f5f5f5] cursor-pointer transition-colors"
                      >
                        P{amount.toLocaleString()}
                      </button>
                    ))}
                </div>

                {/* Change preview */}
                {cashInput && parseFloat(cashInput) >= total && (
                  <div className="bg-[#e8f5e9] rounded-[12px] p-4 mb-5 flex items-center justify-between">
                    <span className="text-[#2e7d32] text-[14px] font-medium">Change</span>
                    <span className="text-[#2e7d32] text-[20px] font-semibold">
                      P{(parseFloat(cashInput) - total).toLocaleString()}
                    </span>
                  </div>
                )}

                {cashInput && parseFloat(cashInput) < total && (
                  <div className="bg-[#ffebee] rounded-[12px] p-3 mb-5">
                    <p className="text-[#c62828] text-[13px] font-medium">
                      Insufficient amount. Need P{(total - parseFloat(cashInput)).toLocaleString()} more.
                    </p>
                  </div>
                )}

                <button
                  onClick={handleCashPayment}
                  disabled={!cashInput || parseFloat(cashInput) < total}
                  className="w-full h-[46px] rounded-[12px] bg-[#4CAF50] text-white text-[15px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Banknote size={18} />
                  Confirm Cash Payment
                </button>
              </div>
            )}

            {/* Success State */}
            {payment.step === "success" && (
              <div className="py-10 px-8 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center mb-5">
                  <CheckCircle2 size={32} className="text-[#2e7d32]" />
                </div>
                <p className="text-[#383838] text-[20px] font-semibold mb-1">Payment Successful!</p>
                <p className="text-[#9a9a9a] text-[14px] mb-6">
                  {payment.method === "card" && "Card payment authorized"}
                  {payment.method === "gcash" && "GCash payment confirmed"}
                  {payment.method === "cash" && "Cash payment received"}
                </p>

                <div className="w-full bg-[#f8f8f8] rounded-[12px] p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#9a9a9a]">Amount Paid</span>
                    <span className="font-semibold text-[#383838]">
                      P{(payment.method === "cash" ? cashTendered : total).toLocaleString()}
                    </span>
                  </div>
                  {payment.method === "cash" && change > 0 && (
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[#9a9a9a]">Change</span>
                      <span className="font-semibold text-[#2e7d32]">P{change.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#9a9a9a]">Payment Method</span>
                    <span className="font-medium text-[#383838] capitalize">
                      {payment.method === "gcash" ? "GCash" : payment.method === "card" ? "Card" : "Cash"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#9a9a9a]">Items</span>
                    <span className="font-medium text-[#383838]">{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#9a9a9a]">Transaction ID</span>
                    <span className="font-mono text-[12px] text-[#5d5d5d]">TXN-{Date.now().toString(36).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#9a9a9a]">Inventory Updated</span>
                    <span className="font-medium text-[#2e7d32]">Stock deducted</span>
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={completeOrder}
                    className="flex-1 h-[44px] rounded-[12px] border border-[#e0e0e0] text-[14px] font-medium text-[#5d5d5d] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#f5f5f5]"
                  >
                    <Receipt size={16} />
                    {autoPrint ? "Receipt Printed" : "Print Receipt"}
                  </button>
                  <button
                    onClick={completeOrder}
                    className="flex-1 h-[44px] rounded-[12px] text-white text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer hover:opacity-90"
                    style={{ backgroundColor: color }}
                  >
                    New Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}