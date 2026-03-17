"use client";

import { Plus, Trash2 } from "lucide-react";

export interface LineItemRow {
  description: string;
  quantity: number;
  rate: number;
}

interface Props {
  items: LineItemRow[];
  onChange: (items: LineItemRow[]) => void;
  readonly?: boolean;
}

export default function LineItemsEditor({ items, onChange, readonly }: Props) {
  const addRow = () => {
    onChange([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const removeRow = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: keyof LineItemRow, value: string | number) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-[1fr_80px_100px_100px_40px] gap-2 px-1">
        <span className="font-mono text-[10px] text-concrete/40 uppercase tracking-widest">Description</span>
        <span className="font-mono text-[10px] text-concrete/40 uppercase tracking-widest text-center">Qty</span>
        <span className="font-mono text-[10px] text-concrete/40 uppercase tracking-widest text-right">Rate</span>
        <span className="font-mono text-[10px] text-concrete/40 uppercase tracking-widest text-right">Amount</span>
        <span />
      </div>

      {/* Rows */}
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-[1fr_80px_100px_100px_40px] gap-2 items-center">
          <input
            type="text"
            value={item.description}
            onChange={(e) => updateRow(i, "description", e.target.value)}
            placeholder="Item description..."
            disabled={readonly}
            className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete placeholder:text-concrete/30 focus:outline-none focus:border-safety-amber/40 transition-colors disabled:opacity-50"
          />
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateRow(i, "quantity", parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            disabled={readonly}
            className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete text-center focus:outline-none focus:border-safety-amber/40 transition-colors disabled:opacity-50"
          />
          <input
            type="number"
            value={item.rate}
            onChange={(e) => updateRow(i, "rate", parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            disabled={readonly}
            className="bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete text-right focus:outline-none focus:border-safety-amber/40 transition-colors disabled:opacity-50"
          />
          <div className="text-right font-mono text-sm text-safety-amber font-bold px-1">
            ${(item.quantity * item.rate).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          {!readonly && (
            <button
              onClick={() => removeRow(i)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}

      {/* Add row button */}
      {!readonly && (
        <button
          onClick={addRow}
          className="flex items-center gap-2 text-safety-amber/70 hover:text-safety-amber text-sm font-heading font-bold uppercase tracking-wider py-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Line Item
        </button>
      )}

      {/* Subtotal */}
      <div className="flex justify-end pt-2 border-t border-white/5">
        <div className="text-right">
          <span className="font-mono text-xs text-concrete/40 uppercase tracking-widest mr-4">Subtotal</span>
          <span className="font-mono text-lg text-concrete font-bold">
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
