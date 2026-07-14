import { useState, useMemo, useRef } from "react";
import { useCrm } from "../CrmContext";
import { useInventory, type InventoryItem } from "../InventoryContext";
import {
  Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight,
  ArrowUpDown, Package, AlertTriangle, XCircle, X, ImageIcon,
  Upload, Link as LinkIcon,
} from "lucide-react";

type SortKey = "sku" | "name" | "category" | "stock" | "price" | "status";
type SortDir = "asc" | "desc";

const FLOWER_CATEGORIES = ["Flowers", "Dried Flowers", "Potted Plants", "Supplies", "Accessories"];
const RETAIL_CATEGORIES = ["Clothing", "Electronics", "Footwear", "Bags", "Accessories", "Home & Living", "Beauty"];

function getStatus(stock: number): { label: string; bg: string; text: string } {
  if (stock === 0) return { label: "Out of Stock", bg: "#ffebee", text: "#c62828" };
  if (stock <= 10) return { label: "Low Stock", bg: "#fff3e0", text: "#e65100" };
  return { label: "In Stock", bg: "#e8f5e9", text: "#2e7d32" };
}

export function InventoryPage() {
  const { config, crmType } = useCrm();
  const color = config.color;
  const isFlower = crmType === "flowershop";
  const categories = isFlower ? FLOWER_CATEGORIES : RETAIL_CATEGORIES;

  const { flowerItems, retailItems, setFlowerItems, setRetailItems } = useInventory();
  const items = isFlower ? flowerItems : retailItems;
  const setItems = isFlower ? setFlowerItems : setRetailItems;

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const ROWS_PER_PAGE = 8;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let result = items.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase())
    );
    if (sortKey) {
      result = [...result].sort((a, b) => {
        let cmp = 0;
        if (sortKey === "sku") cmp = a.sku.localeCompare(b.sku);
        else if (sortKey === "name") cmp = a.name.localeCompare(b.name);
        else if (sortKey === "category") cmp = a.category.localeCompare(b.category);
        else if (sortKey === "stock") cmp = a.stock - b.stock;
        else if (sortKey === "price") cmp = a.price - b.price;
        else if (sortKey === "status") cmp = a.stock - b.stock;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [items, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const totalItems = items.length;
  const lowStock = items.filter((i) => i.stock > 0 && i.stock <= 10).length;
  const outOfStock = items.filter((i) => i.stock === 0).length;

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setDeleteConfirm(null);
    if (paginated.length === 1 && page > 1) setPage(page - 1);
  };

  const handleSaveItem = (item: InventoryItem) => {
    if (editItem) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    } else {
      setItems((prev) => [...prev, { ...item, id: `item_${Date.now()}` }]);
    }
    setShowAddModal(false);
    setEditItem(null);
  };

  return (
    <div className="max-w-[1210px] mx-auto px-4 md:px-6 py-5 font-['Inter',sans-serif]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h1 className="text-[29px] font-medium tracking-[-0.58px]" style={{ color }}>
          Inventory
        </h1>
        <button
          onClick={() => { setEditItem(null); setShowAddModal(true); }}
          className="h-[39px] px-5 rounded-[10px] border text-[13px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors hover:opacity-90"
          style={{ borderColor: color, color }}
        >
          <Plus size={15} /> Add Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-5">
        <div className="bg-white rounded-[12px] border border-[#e9e9e9] pt-[15px] pb-[1px] px-[15px]">
          <p className="text-[#5d5d5d] text-[12px]">Total Items</p>
          <p className="text-[#383838] text-[23px] font-semibold">{totalItems}</p>
        </div>
        <div className="bg-white rounded-[12px] border border-[#e9e9e9] pt-[15px] pb-[1px] px-[15px]">
          <div className="flex items-center gap-1.5">
            <p className="text-[#5d5d5d] text-[12px]">Low Stock</p>
            {lowStock > 0 && <AlertTriangle size={12} className="text-[#e65100]" />}
          </div>
          <p className="text-[#e65100] text-[23px] font-semibold">{lowStock}</p>
        </div>
        <div className="bg-white rounded-[12px] border border-[#e9e9e9] pt-[15px] pb-[1px] px-[15px]">
          <div className="flex items-center gap-1.5">
            <p className="text-[#5d5d5d] text-[12px]">Out of Stock</p>
            {outOfStock > 0 && <XCircle size={12} className="text-[#c62828]" />}
          </div>
          <p className="text-[#c62828] text-[23px] font-semibold">{outOfStock}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-[320px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b0b0b0]" />
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full h-[38px] bg-white border border-[#e0e0e0] rounded-[10px] pl-9 pr-4 text-[13px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#999] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] border border-[#c3c3c3] overflow-x-auto relative hidden md:block">
        {/* Header Row */}
        <div className="grid border-b border-[#c3c3c3]" style={{ gridTemplateColumns: "72px 90px 330px 220px 80px 90px 125px 130px" }}>
          <div className="px-4 py-4 text-[13px] font-medium" style={{ color }}>Photo</div>
          {(["sku", "name", "category", "stock", "price", "status"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => toggleSort(key)}
              className="px-4 py-4 text-[13px] font-medium text-left flex items-center gap-1 cursor-pointer hover:opacity-80"
              style={{ color }}
            >
              {key === "name" ? "Item Name" : key === "sku" ? "SKU#" : key.charAt(0).toUpperCase() + key.slice(1)}
              <ArrowUpDown size={12} className="opacity-40" />
            </button>
          ))}
          <div className="px-4 py-4 text-[13px] font-medium" style={{ color }}>Action</div>
        </div>

        {/* Body Rows */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#9a9a9a]">
            <Package size={36} className="mb-2 opacity-40" />
            <p className="text-[14px]">No items found</p>
          </div>
        ) : (
          paginated.map((item, idx) => {
            const status = getStatus(item.stock);
            return (
              <div
                key={item.id}
                className="grid items-center border-b border-[#f0f0f0] last:border-b-0"
                style={{
                  gridTemplateColumns: "72px 90px 330px 220px 80px 90px 125px 130px",
                  backgroundColor: idx % 2 === 0 ? "#f6f6f6" : "#fff",
                }}
              >
                {/* Photo */}
                <div className="px-4 py-2.5">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-[36px] h-[36px] rounded-[9px] object-cover" />
                  ) : (
                    <div className="w-[36px] h-[36px] rounded-[9px] bg-[#f0f0f0] flex items-center justify-center">
                      <ImageIcon size={16} className="text-[#c0c0c0]" />
                    </div>
                  )}
                </div>
                {/* SKU# */}
                <p className="px-4 py-2.5 text-[#9a9a9a] text-[11px] font-mono whitespace-nowrap">{item.sku}</p>
                {/* Name */}
                <p className="px-4 py-2.5 text-[#5d5d5d] text-[12px] whitespace-nowrap truncate">{item.name}</p>
                {/* Category */}
                <p className="px-4 py-2.5 text-[#5d5d5d] text-[12px]">{item.category}</p>
                {/* Stock */}
                <p className="px-4 py-2.5 text-[#5d5d5d] text-[12px]">{item.stock}</p>
                {/* Price */}
                <p className="px-4 py-2.5 text-[#5d5d5d] text-[12px]">P{item.price.toLocaleString()}</p>
                {/* Status */}
                <div className="px-4 py-2.5">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{ backgroundColor: status.bg, color: status.text }}
                  >
                    {status.label}
                  </span>
                </div>
                {/* Actions */}
                <div className="px-4 py-2.5 flex items-center gap-2">
                  <button
                    onClick={() => { setEditItem(item); setShowAddModal(true); }}
                    className="h-[30px] px-3.5 rounded-[5px] border text-[12px] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ borderColor: color, color }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="h-[28px] px-3 rounded-[5px] text-white text-[12px] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: color }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#9a9a9a] bg-white rounded-[14px] border border-[#c3c3c3]">
            <Package size={36} className="mb-2 opacity-40" />
            <p className="text-[14px]">No items found</p>
          </div>
        ) : (
          paginated.map((item) => {
            const status = getStatus(item.stock);
            return (
              <div key={item.id} className="bg-white rounded-[14px] border border-[#e0e0e0] p-4">
                <div className="flex items-start gap-3">
                  {/* Photo */}
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-[52px] h-[52px] rounded-[10px] object-cover shrink-0" />
                  ) : (
                    <div className="w-[52px] h-[52px] rounded-[10px] bg-[#f0f0f0] flex items-center justify-center shrink-0">
                      <ImageIcon size={20} className="text-[#c0c0c0]" />
                    </div>
                  )}
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#383838] text-[14px] font-medium truncate">{item.name}</p>
                    <p className="text-[#9a9a9a] text-[11px] font-mono mt-0.5">{item.sku}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[12px] font-semibold" style={{ color }}>P{item.price.toLocaleString()}</span>
                      <span className="text-[#b0b0b0] text-[11px]">·</span>
                      <span className="text-[#5d5d5d] text-[12px]">{item.category}</span>
                      <span className="text-[#b0b0b0] text-[11px]">·</span>
                      <span className="text-[#5d5d5d] text-[12px]">Stock: {item.stock}</span>
                    </div>
                  </div>
                  {/* Status */}
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium shrink-0"
                    style={{ backgroundColor: status.bg, color: status.text }}
                  >
                    {status.label}
                  </span>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f0f0f0]">
                  <button
                    onClick={() => { setEditItem(item); setShowAddModal(true); }}
                    className="flex-1 h-[32px] rounded-[6px] border text-[12px] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ borderColor: color, color }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="flex-1 h-[32px] rounded-[6px] text-white text-[12px] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: color }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-[12px] text-[#9a9a9a]">
            Showing {(page - 1) * ROWS_PER_PAGE + 1} to {Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border border-[#e0e0e0] flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-[#f5f5f5]"
            >
              <ChevronLeft size={16} className="text-[#5d5d5d]" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-[12px] font-medium cursor-pointer transition-colors ${
                  p === page ? "text-white" : "text-[#5d5d5d] border border-[#e0e0e0] hover:bg-[#f5f5f5]"
                }`}
                style={p === page ? { backgroundColor: color } : {}}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg border border-[#e0e0e0] flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-[#f5f5f5]"
            >
              <ChevronRight size={16} className="text-[#5d5d5d]" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setDeleteConfirm(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[16px] shadow-2xl p-6 z-50 w-[380px]">
            <h3 className="text-[#383838] text-[16px] font-semibold mb-2">Delete Item</h3>
            <p className="text-[#5d5d5d] text-[14px] mb-5">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="h-[36px] px-5 rounded-[10px] border border-[#e0e0e0] text-[13px] font-medium text-[#5d5d5d] cursor-pointer hover:bg-[#f5f5f5]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="h-[36px] px-5 rounded-[10px] text-white text-[13px] font-medium cursor-pointer hover:opacity-90"
                style={{ backgroundColor: "#e53e00" }}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add / Edit Modal */}
      {showAddModal && (
        <AddEditModal
          item={editItem}
          color={color}
          categories={categories}
          onSave={handleSaveItem}
          onClose={() => { setShowAddModal(false); setEditItem(null); }}
        />
      )}
    </div>
  );
}

/* ──────────────────────────── Add / Edit Modal ──────────────────────────── */

type ImageMode = "url" | "upload";

const MAX_UPLOAD_SIZE = 100 * 1024; // 100KB

function AddEditModal({
  item,
  color,
  categories,
  onSave,
  onClose,
}: {
  item: InventoryItem | null;
  color: string;
  categories: string[];
  onSave: (item: InventoryItem) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(item?.name || "");
  const [sku, setSku] = useState(item?.sku || "");
  const [category, setCategory] = useState(item?.category || "");
  const [stock, setStock] = useState(item?.stock?.toString() || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [image, setImage] = useState(item?.image || "");
  const [imageMode, setImageMode] = useState<ImageMode>(
    item?.image && item.image.startsWith("data:") ? "upload" : "url"
  );
  const [uploadError, setUploadError] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError("");
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Only JPEG, PNG, WebP, GIF files are allowed");
      return;
    }

    // Validate size
    if (file.size > MAX_UPLOAD_SIZE) {
      setUploadError(`File too large (${(file.size / 1024).toFixed(1)}KB). Max 100KB allowed.`);
      return;
    }

    // Read as data URL
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setUploadFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: item?.id || "",
      name: name.trim(),
      sku: sku.trim(),
      category,
      stock: parseInt(stock) || 0,
      price: parseFloat(price) || 0,
      image: image || "",
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[16px] shadow-2xl z-50 w-[calc(100%-2rem)] max-w-[460px] max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-5 border-b border-[#e8e8e8]">
          <h3 className="text-[18px] font-semibold" style={{ color }}>{item ? "Edit Item" : "Add Item"}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[#f5f5f5] flex items-center justify-center cursor-pointer">
            <X size={18} className="text-[#9a9a9a]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Item Name */}
          <div>
            <label className="block text-[#383838] text-[13px] font-medium mb-1.5">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              className="w-full h-[40px] bg-white border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#999]"
              required
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-[#383838] text-[13px] font-medium mb-1.5">SKU#</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Enter SKU#"
              className="w-full h-[40px] bg-white border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#999]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#383838] text-[13px] font-medium mb-1.5">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[40px] bg-white border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] text-[#383838] outline-none focus:border-[#999] cursor-pointer appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
            >
              <option value="" disabled>Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Stock + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#383838] text-[13px] font-medium mb-1.5">Stock</label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="w-full h-[40px] bg-white border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#999]"
              />
            </div>
            <div>
              <label className="block text-[#383838] text-[13px] font-medium mb-1.5">Price</label>
              <input
                type="text"
                value={price ? `P${price}` : ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/^P/, "");
                  setPrice(val);
                }}
                placeholder="P60/stem"
                className="w-full h-[40px] bg-white border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#999]"
              />
            </div>
          </div>

          {/* Image (optional) */}
          <div>
            <label className="block text-[#383838] text-[13px] font-medium mb-1.5">
              Image <span className="text-[#b0b0b0] font-normal">(optional)</span>
            </label>

            {/* Toggle: URL / Upload */}
            <div className="flex bg-[#f3f3f3] rounded-full p-[3px] mb-3">
              <button
                type="button"
                onClick={() => { setImageMode("url"); setUploadError(""); }}
                className={`flex-1 h-[32px] rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  imageMode === "url"
                    ? "bg-white shadow-sm text-[#383838]"
                    : "text-[#9a9a9a]"
                }`}
              >
                <LinkIcon size={13} />
                URL
              </button>
              <button
                type="button"
                onClick={() => { setImageMode("upload"); setUploadError(""); }}
                className={`flex-1 h-[32px] rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  imageMode === "upload"
                    ? "text-white shadow-sm"
                    : "text-[#9a9a9a]"
                }`}
                style={imageMode === "upload" ? { backgroundColor: color } : {}}
              >
                <Upload size={13} />
                Upload
              </button>
            </div>

            {/* URL Mode */}
            {imageMode === "url" && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={image && !image.startsWith("data:") ? image : ""}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 h-[40px] bg-white border border-[#e0e0e0] rounded-[10px] px-4 text-[14px] text-[#383838] placeholder:text-[#b0b0b0] outline-none focus:border-[#999]"
                />
                {image && !image.startsWith("data:") ? (
                  <img src={image} alt="" className="w-[40px] h-[40px] rounded-[9px] object-cover border border-[#e0e0e0]" />
                ) : (
                  <div className="w-[40px] h-[40px] rounded-[9px] bg-[#f0f0f0] flex items-center justify-center shrink-0">
                    <ImageIcon size={16} className="text-[#c0c0c0]" />
                  </div>
                )}
              </div>
            )}

            {/* Upload Mode */}
            {imageMode === "upload" && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {image && image.startsWith("data:") ? (
                  /* Preview uploaded file */
                  <div className="border-2 border-dashed border-[#e0e0e0] rounded-[12px] p-4 flex items-center gap-3">
                    <img src={image} alt="Uploaded" className="w-[56px] h-[56px] rounded-[9px] object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#383838] text-[13px] font-medium truncate">{uploadFileName}</p>
                      <p className="text-[#9a9a9a] text-[11px]">Uploaded successfully</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setImage("");
                        setUploadFileName("");
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="w-7 h-7 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#eee] cursor-pointer shrink-0"
                    >
                      <X size={14} className="text-[#999]" />
                    </button>
                  </div>
                ) : (
                  /* Upload drop zone */
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-[#e0e0e0] rounded-[12px] py-6 flex flex-col items-center gap-1.5 cursor-pointer hover:border-[#ccc] hover:bg-[#fafafa] transition-colors"
                  >
                    <Upload size={22} className="text-[#c0c0c0]" />
                    <p className="text-[#9a9a9a] text-[13px]">Click to upload photo</p>
                    <p className="text-[#c0c0c0] text-[11px]">JPEG, PNG, WebP, GIF (max 100KB)</p>
                  </button>
                )}

                {uploadError && (
                  <p className="text-[#c62828] text-[12px] mt-2 flex items-center gap-1">
                    <XCircle size={12} />
                    {uploadError}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-[40px] rounded-[10px] border text-[13px] font-semibold cursor-pointer hover:bg-[#f5f5f5] transition-colors"
              style={{ borderColor: color, color }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-[40px] rounded-[10px] text-white text-[13px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: color }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}