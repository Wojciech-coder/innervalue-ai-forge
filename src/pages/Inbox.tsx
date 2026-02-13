import { useState } from "react";
import { CheckCircle2, AlertTriangle, RefreshCw, Search, Filter, Mail, ExternalLink, X } from "lucide-react";

const mockEmails = [
  { id: 1, subject: "Q4 2025 Financial Results", sender: "press@pilotcorp.com", date: "2026-02-10", type: "Financial", confidence: "High", status: "Ingested", threadId: "TH-001" },
  { id: 2, subject: "New Board Member Appointment", sender: "press@pilotcorp.com", date: "2026-02-08", type: "Expert", confidence: "High", status: "Ingested", threadId: "TH-002" },
  { id: 3, subject: "Strategic Partnership Announcement", sender: "press@pilotcorp.com", date: "2026-01-28", type: "Transactional", confidence: "Medium", status: "Ingested", threadId: "TH-003" },
  { id: 4, subject: "H2 2025 Revenue Update", sender: "press@pilotcorp.com", date: "2026-01-15", type: "Financial", confidence: "High", status: "Auto-ingested", threadId: "TH-004" },
  { id: 5, subject: "CEO Interview Summary", sender: "comms@pilotcorp.com", date: "2026-01-10", type: "Expert", confidence: "Medium", status: "Ingested", threadId: "TH-005" },
  { id: 6, subject: "M&A Completion Notice", sender: "press@pilotcorp.com", date: "2025-12-20", type: "Transactional", confidence: "High", status: "Ingested", threadId: "TH-006" },
  { id: 7, subject: "Q3 2025 Earnings Release", sender: "press@pilotcorp.com", date: "2025-11-12", type: "Financial", confidence: "High", status: "Ingested", threadId: "TH-007" },
];

const types = ["All", "Financial", "Expert", "Transactional"];

const errorLogs = [
  { time: "Feb 10, 14:22", message: "Rate limit reached – retrying in 30s", level: "warning" },
  { time: "Feb 09, 09:01", message: "Sync completed: 3 new items", level: "success" },
  { time: "Feb 08, 11:45", message: "Graph API token refreshed", level: "info" },
];

export default function Inbox() {
  const [activeType, setActiveType] = useState("All");
  const [showLogs, setShowLogs] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = mockEmails.filter(
    (e) =>
      (activeType === "All" || e.type === activeType) &&
      (search === "" || e.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Inbox (Outlook)</h1>
          <p className="text-sm text-muted-foreground mt-1">Ingested outgoing press releases — Pilot client</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-badge-success">
            <CheckCircle2 className="h-3 w-3" /> Connected
          </span>
          <button className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <RefreshCw className="h-3 w-3" /> Sync now
          </button>
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            Logs
          </button>
        </div>
      </div>

      {/* Connection info */}
      <div className="rounded-lg border bg-card p-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">Microsoft 365 – Pilot Client Mailbox</p>
            <p className="text-xs text-muted-foreground">Last sync: 2 minutes ago · 142 items processed · 0 errors</p>
          </div>
        </div>
        <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
          Configure <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search press releases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-card pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={activeType === t ? "filter-chip-active" : "filter-chip-inactive"}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Subject</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Sender</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Confidence</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-medium text-foreground">{e.subject}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.sender}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.date}</td>
                  <td className="px-4 py-3">
                    <span className="status-badge-neutral">{e.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={e.confidence === "High" ? "status-badge-success" : "status-badge-warning"}>
                      {e.confidence}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={e.status === "Auto-ingested" ? "status-badge-info" : "status-badge-success"}>
                      {e.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No press releases match your filters.
          </div>
        )}
      </div>

      {/* Logs panel */}
      {showLogs && (
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold text-foreground">Ingestion Logs</h3>
            <button onClick={() => setShowLogs(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="divide-y">
            {errorLogs.map((log, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 text-xs">
                {log.level === "warning" ? (
                  <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />
                ) : log.level === "success" ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                ) : (
                  <Mail className="h-3.5 w-3.5 text-info shrink-0" />
                )}
                <span className="text-muted-foreground">{log.time}</span>
                <span className="text-foreground">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
