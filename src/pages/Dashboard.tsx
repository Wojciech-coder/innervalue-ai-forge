import { Mail, Upload, Database, FileText, ArrowRight, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const metrics = [
  {
    label: "Inbox Ingested",
    value: "142",
    sub: "Last sync: 2 min ago",
    icon: Mail,
    status: "success" as const,
  },
  {
    label: "Inputs Uploaded",
    value: "38",
    sub: "12 tagged, 26 pending",
    icon: Upload,
    status: "warning" as const,
  },
  {
    label: "Knowledge Base",
    value: "1 collection",
    sub: "180 docs indexed",
    icon: Database,
    status: "success" as const,
  },
  {
    label: "Active Drafts",
    value: "5",
    sub: "2 in progress",
    icon: FileText,
    status: "info" as const,
  },
];

const statusColors = {
  success: "status-badge-success",
  warning: "status-badge-warning",
  error: "status-badge-error",
  info: "status-badge-info",
};

const statusIcons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Clock,
};

const recentDrafts = [
  { id: 1, title: "Q4 Financial Results Press Release", type: "Financial", date: "Feb 12, 2026", status: "In progress" },
  { id: 2, title: "New CFO Appointment", type: "Expert", date: "Feb 11, 2026", status: "Generated" },
  { id: 3, title: "Annual Report Highlights", type: "Financial", date: "Feb 10, 2026", status: "In progress" },
];

const quickActions = [
  { label: "Create new draft", to: "/drafts/create", icon: FileText },
  { label: "Upload inputs", to: "/inputs", icon: Upload },
  { label: "View inbox", to: "/inbox", icon: Mail },
  { label: "Test retrieval", to: "/knowledge-base", icon: Database },
];

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Pilot client overview — InnerValue AI PoC</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const StatusIcon = statusIcons[m.status];
          return (
            <div key={m.label} className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <m.icon className="h-5 w-5 text-muted-foreground" />
                <span className={statusColors[m.status]}>
                  <StatusIcon className="h-3 w-3" />
                  {m.status === "success" ? "OK" : m.status === "warning" ? "Action needed" : m.status}
                </span>
              </div>
              <p className="text-2xl font-semibold text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Drafts */}
        <div className="lg:col-span-2 rounded-lg border bg-card shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="text-sm font-semibold text-foreground">Recent Drafts</h2>
            <Link to="/drafts" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y">
            {recentDrafts.map((d) => (
              <Link
                key={d.id}
                to={`/drafts/${d.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.type} · {d.date}</p>
                </div>
                <span className="status-badge-info shrink-0 ml-4">{d.status}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="px-5 py-4 border-b">
            <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="p-3 space-y-1">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <a.icon className="h-4 w-4 text-primary" />
                {a.label}
                <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
