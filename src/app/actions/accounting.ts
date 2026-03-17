"use server";

import { getServiceClient } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  notes: string | null;
  type: "customer" | "vendor" | "both";
}

export interface LineItem {
  id?: string;
  parent_type: "quote" | "invoice" | "purchase_order" | "bill";
  parent_id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  sort_order: number;
}

export interface Quote {
  id: string;
  created_at: string;
  quote_number: string;
  customer_id: string | null;
  customer_name: string;
  customer_email: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  date: string;
  expiry_date: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  converted_to_invoice_id: string | null;
  line_items?: LineItem[];
  customer?: Customer;
}

export interface Invoice {
  id: string;
  created_at: string;
  invoice_number: string;
  customer_id: string | null;
  customer_name: string;
  customer_email: string;
  status: "draft" | "sent" | "paid" | "overdue";
  date: string;
  due_date: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  from_quote_id: string | null;
  paid_date: string | null;
  line_items?: LineItem[];
  customer?: Customer;
}

export interface PurchaseOrder {
  id: string;
  created_at: string;
  po_number: string;
  vendor_id: string | null;
  vendor_name: string;
  vendor_email: string;
  status: "draft" | "sent" | "received";
  date: string;
  expected_date: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  converted_to_bill_id: string | null;
  line_items?: LineItem[];
  vendor?: Customer;
}

export interface Bill {
  id: string;
  created_at: string;
  bill_number: string;
  vendor_id: string | null;
  vendor_name: string;
  status: "unpaid" | "paid";
  date: string;
  due_date: string | null;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes: string | null;
  from_po_id: string | null;
  paid_date: string | null;
  line_items?: LineItem[];
  vendor?: Customer;
}

// ─── Database bootstrap (create tables if not exist) ─────────────────────────

export async function ensureTablesExist() {
  const sb = getServiceClient();

  // We'll attempt to query each table; if they fail, we create them via raw SQL
  const { error: custCheck } = await sb.from("customers").select("id").limit(1);
  if (custCheck && custCheck.code === "PGRST204") {
    // Tables don't exist – but we can't run raw DDL from the client.
    // Instead we'll handle this through Supabase SQL Editor.
    // For now, this function is a no-op; tables must be created via migration.
    console.warn("Tables may not exist. Run the SQL migration in Supabase.");
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function generateNextNumber(
  table: string,
  column: string,
  prefix: string
): Promise<string> {
  const sb = getServiceClient();
  const { data } = await sb
    .from(table)
    .select(column)
    .order(column, { ascending: false })
    .limit(1);

  if (!data || data.length === 0) {
    return `${prefix}-0001`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const last = (data[0] as any)[column] as string;
  const numPart = parseInt(last.split("-")[1] || "0", 10);
  const next = (numPart + 1).toString().padStart(4, "0");
  return `${prefix}-${next}`;
}

// ─── Customers ───────────────────────────────────────────────────────────────

export async function getCustomers(): Promise<Customer[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("customers")
    .select("*")
    .order("name");
  if (error) throw new Error(error.message);
  return (data || []) as Customer[];
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Customer;
}

export async function createCustomer(
  customer: Omit<Customer, "id" | "created_at">
): Promise<Customer> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("customers")
    .insert(customer)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Customer;
}

export async function updateCustomer(
  id: string,
  updates: Partial<Omit<Customer, "id" | "created_at">>
): Promise<Customer> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("customers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Customer;
}

export async function deleteCustomer(id: string): Promise<void> {
  const sb = getServiceClient();
  const { error } = await sb.from("customers").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Line Items (shared) ────────────────────────────────────────────────────

async function getLineItems(
  parentType: LineItem["parent_type"],
  parentId: string
): Promise<LineItem[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("line_items")
    .select("*")
    .eq("parent_type", parentType)
    .eq("parent_id", parentId)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return (data || []) as LineItem[];
}

async function saveLineItems(
  parentType: LineItem["parent_type"],
  parentId: string,
  items: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<void> {
  const sb = getServiceClient();

  // Delete existing line items
  await sb
    .from("line_items")
    .delete()
    .eq("parent_type", parentType)
    .eq("parent_id", parentId);

  // Insert new ones
  if (items.length > 0) {
    const rows = items.map((item, i) => ({
      parent_type: parentType,
      parent_id: parentId,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.quantity * item.rate,
      sort_order: i,
    }));

    const { error } = await sb.from("line_items").insert(rows);
    if (error) throw new Error(error.message);
  }
}

// ─── Quotes ──────────────────────────────────────────────────────────────────

export async function getQuotes(): Promise<Quote[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  const quotes = (data || []) as Quote[];
  // Attach line items
  for (const q of quotes) {
    q.line_items = await getLineItems("quote", q.id);
  }
  return quotes;
}

export async function getQuote(id: string): Promise<Quote | null> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("quotes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  const quote = data as Quote;
  quote.line_items = await getLineItems("quote", quote.id);
  return quote;
}

export async function createQuote(
  quote: {
    customer_id?: string | null;
    customer_name: string;
    customer_email: string;
    date: string;
    expiry_date?: string | null;
    tax_rate?: number;
    notes?: string | null;
  },
  items: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<Quote> {
  const sb = getServiceClient();
  const quoteNumber = await generateNextNumber("quotes", "quote_number", "QT");

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const taxRate = quote.tax_rate || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const { data, error } = await sb
    .from("quotes")
    .insert({
      quote_number: quoteNumber,
      customer_id: quote.customer_id || null,
      customer_name: quote.customer_name,
      customer_email: quote.customer_email,
      status: "draft",
      date: quote.date,
      expiry_date: quote.expiry_date || null,
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total,
      notes: quote.notes || null,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  const created = data as Quote;
  await saveLineItems("quote", created.id, items);
  created.line_items = await getLineItems("quote", created.id);
  return created;
}

export async function updateQuote(
  id: string,
  quote: {
    customer_id?: string | null;
    customer_name?: string;
    customer_email?: string;
    status?: Quote["status"];
    date?: string;
    expiry_date?: string | null;
    tax_rate?: number;
    notes?: string | null;
  },
  items?: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<Quote> {
  const sb = getServiceClient();

  const updates: Record<string, unknown> = { ...quote };

  if (items) {
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
    const taxRate = quote.tax_rate ?? 0;
    const taxAmount = subtotal * (taxRate / 100);
    updates.subtotal = subtotal;
    updates.tax_amount = taxAmount;
    updates.total = subtotal + taxAmount;
  }

  const { data, error } = await sb
    .from("quotes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  if (items) {
    await saveLineItems("quote", id, items);
  }

  const updated = data as Quote;
  updated.line_items = await getLineItems("quote", updated.id);
  return updated;
}

export async function deleteQuote(id: string): Promise<void> {
  const sb = getServiceClient();
  await sb.from("line_items").delete().eq("parent_type", "quote").eq("parent_id", id);
  const { error } = await sb.from("quotes").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Invoices ────────────────────────────────────────────────────────────────

export async function getInvoices(): Promise<Invoice[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const invoices = (data || []) as Invoice[];
  for (const inv of invoices) {
    inv.line_items = await getLineItems("invoice", inv.id);
  }
  return invoices;
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  const inv = data as Invoice;
  inv.line_items = await getLineItems("invoice", inv.id);
  return inv;
}

export async function createInvoice(
  invoice: {
    customer_id?: string | null;
    customer_name: string;
    customer_email: string;
    date: string;
    due_date?: string | null;
    tax_rate?: number;
    notes?: string | null;
    from_quote_id?: string | null;
  },
  items: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<Invoice> {
  const sb = getServiceClient();
  const invNumber = await generateNextNumber("invoices", "invoice_number", "INV");

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const taxRate = invoice.tax_rate || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const { data, error } = await sb
    .from("invoices")
    .insert({
      invoice_number: invNumber,
      customer_id: invoice.customer_id || null,
      customer_name: invoice.customer_name,
      customer_email: invoice.customer_email,
      status: "draft",
      date: invoice.date,
      due_date: invoice.due_date || null,
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total,
      notes: invoice.notes || null,
      from_quote_id: invoice.from_quote_id || null,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  const created = data as Invoice;
  await saveLineItems("invoice", created.id, items);
  created.line_items = await getLineItems("invoice", created.id);
  return created;
}

export async function updateInvoice(
  id: string,
  invoice: {
    customer_id?: string | null;
    customer_name?: string;
    customer_email?: string;
    status?: Invoice["status"];
    date?: string;
    due_date?: string | null;
    tax_rate?: number;
    notes?: string | null;
    paid_date?: string | null;
  },
  items?: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<Invoice> {
  const sb = getServiceClient();
  const updates: Record<string, unknown> = { ...invoice };

  if (items) {
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
    const taxRate = invoice.tax_rate ?? 0;
    const taxAmount = subtotal * (taxRate / 100);
    updates.subtotal = subtotal;
    updates.tax_amount = taxAmount;
    updates.total = subtotal + taxAmount;
  }

  const { data, error } = await sb
    .from("invoices")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  if (items) {
    await saveLineItems("invoice", id, items);
  }

  const updated = data as Invoice;
  updated.line_items = await getLineItems("invoice", updated.id);
  return updated;
}

export async function deleteInvoice(id: string): Promise<void> {
  const sb = getServiceClient();
  await sb.from("line_items").delete().eq("parent_type", "invoice").eq("parent_id", id);
  const { error } = await sb.from("invoices").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function markInvoicePaid(id: string): Promise<Invoice> {
  return updateInvoice(id, {
    status: "paid",
    paid_date: new Date().toISOString().split("T")[0],
  });
}

// ─── Purchase Orders ────────────────────────────────────────────────────────

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("purchase_orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const pos = (data || []) as PurchaseOrder[];
  for (const po of pos) {
    po.line_items = await getLineItems("purchase_order", po.id);
  }
  return pos;
}

export async function getPurchaseOrder(id: string): Promise<PurchaseOrder | null> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("purchase_orders")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  const po = data as PurchaseOrder;
  po.line_items = await getLineItems("purchase_order", po.id);
  return po;
}

export async function createPurchaseOrder(
  po: {
    vendor_id?: string | null;
    vendor_name: string;
    vendor_email: string;
    date: string;
    expected_date?: string | null;
    tax_rate?: number;
    notes?: string | null;
  },
  items: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<PurchaseOrder> {
  const sb = getServiceClient();
  const poNumber = await generateNextNumber("purchase_orders", "po_number", "PO");

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const taxRate = po.tax_rate || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const { data, error } = await sb
    .from("purchase_orders")
    .insert({
      po_number: poNumber,
      vendor_id: po.vendor_id || null,
      vendor_name: po.vendor_name,
      vendor_email: po.vendor_email,
      status: "draft",
      date: po.date,
      expected_date: po.expected_date || null,
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total,
      notes: po.notes || null,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  const created = data as PurchaseOrder;
  await saveLineItems("purchase_order", created.id, items);
  created.line_items = await getLineItems("purchase_order", created.id);
  return created;
}

export async function updatePurchaseOrder(
  id: string,
  po: {
    vendor_id?: string | null;
    vendor_name?: string;
    vendor_email?: string;
    status?: PurchaseOrder["status"];
    date?: string;
    expected_date?: string | null;
    tax_rate?: number;
    notes?: string | null;
  },
  items?: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<PurchaseOrder> {
  const sb = getServiceClient();
  const updates: Record<string, unknown> = { ...po };

  if (items) {
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
    const taxRate = po.tax_rate ?? 0;
    const taxAmount = subtotal * (taxRate / 100);
    updates.subtotal = subtotal;
    updates.tax_amount = taxAmount;
    updates.total = subtotal + taxAmount;
  }

  const { data, error } = await sb
    .from("purchase_orders")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);

  if (items) {
    await saveLineItems("purchase_order", id, items);
  }

  const updated = data as PurchaseOrder;
  updated.line_items = await getLineItems("purchase_order", updated.id);
  return updated;
}

export async function deletePurchaseOrder(id: string): Promise<void> {
  const sb = getServiceClient();
  await sb.from("line_items").delete().eq("parent_type", "purchase_order").eq("parent_id", id);
  const { error } = await sb.from("purchase_orders").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ─── Bills ───────────────────────────────────────────────────────────────────

export async function getBills(): Promise<Bill[]> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("bills")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const bills = (data || []) as Bill[];
  for (const b of bills) {
    b.line_items = await getLineItems("bill", b.id);
  }
  return bills;
}

export async function getBill(id: string): Promise<Bill | null> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("bills")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  const bill = data as Bill;
  bill.line_items = await getLineItems("bill", bill.id);
  return bill;
}

export async function createBill(
  bill: {
    vendor_id?: string | null;
    vendor_name: string;
    date: string;
    due_date?: string | null;
    tax_rate?: number;
    notes?: string | null;
    from_po_id?: string | null;
  },
  items: Omit<LineItem, "id" | "parent_type" | "parent_id">[]
): Promise<Bill> {
  const sb = getServiceClient();
  const billNumber = await generateNextNumber("bills", "bill_number", "BILL");

  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const taxRate = bill.tax_rate || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  const { data, error } = await sb
    .from("bills")
    .insert({
      bill_number: billNumber,
      vendor_id: bill.vendor_id || null,
      vendor_name: bill.vendor_name,
      status: "unpaid",
      date: bill.date,
      due_date: bill.due_date || null,
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total,
      notes: bill.notes || null,
      from_po_id: bill.from_po_id || null,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);

  const created = data as Bill;
  await saveLineItems("bill", created.id, items);
  created.line_items = await getLineItems("bill", created.id);
  return created;
}

export async function updateBill(
  id: string,
  bill: {
    status?: Bill["status"];
    paid_date?: string | null;
    notes?: string | null;
  }
): Promise<Bill> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("bills")
    .update(bill)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  const updated = data as Bill;
  updated.line_items = await getLineItems("bill", updated.id);
  return updated;
}

export async function markBillPaid(id: string): Promise<Bill> {
  return updateBill(id, {
    status: "paid",
    paid_date: new Date().toISOString().split("T")[0],
  });
}

// ─── Conversion Flows ───────────────────────────────────────────────────────

export async function convertQuoteToInvoice(quoteId: string): Promise<Invoice> {
  const quote = await getQuote(quoteId);
  if (!quote) throw new Error("Quote not found");
  if (quote.converted_to_invoice_id) throw new Error("Quote already converted");

  const items = (quote.line_items || []).map((li) => ({
    description: li.description,
    quantity: li.quantity,
    rate: li.rate,
    amount: li.amount,
    sort_order: li.sort_order,
  }));

  const invoice = await createInvoice(
    {
      customer_id: quote.customer_id,
      customer_name: quote.customer_name,
      customer_email: quote.customer_email,
      date: new Date().toISOString().split("T")[0],
      due_date: null,
      tax_rate: quote.tax_rate,
      notes: quote.notes,
      from_quote_id: quoteId,
    },
    items
  );

  // Update quote to reference the new invoice
  const sb = getServiceClient();
  await sb
    .from("quotes")
    .update({
      converted_to_invoice_id: invoice.id,
      status: "accepted",
    })
    .eq("id", quoteId);

  return invoice;
}

export async function convertPOToBill(poId: string): Promise<Bill> {
  const po = await getPurchaseOrder(poId);
  if (!po) throw new Error("Purchase Order not found");
  if (po.converted_to_bill_id) throw new Error("PO already converted to bill");

  const items = (po.line_items || []).map((li) => ({
    description: li.description,
    quantity: li.quantity,
    rate: li.rate,
    amount: li.amount,
    sort_order: li.sort_order,
  }));

  const bill = await createBill(
    {
      vendor_id: po.vendor_id,
      vendor_name: po.vendor_name,
      date: new Date().toISOString().split("T")[0],
      due_date: null,
      tax_rate: po.tax_rate,
      notes: po.notes,
      from_po_id: poId,
    },
    items
  );

  // Update PO to reference the new bill
  const sb = getServiceClient();
  await sb
    .from("purchase_orders")
    .update({
      converted_to_bill_id: bill.id,
      status: "received",
    })
    .eq("id", poId);

  return bill;
}
