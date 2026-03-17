"use client";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-white/5 text-concrete/50 border-white/10",
  sent: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  overdue: "bg-red-500/10 text-red-400 border-red-500/20",
  received: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  unpaid: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] || STATUS_COLORS.draft;
  return (
    <span className={`px-3 py-1 rounded-lg border text-xs font-mono uppercase tracking-wider ${color}`}>
      {status}
    </span>
  );
}
