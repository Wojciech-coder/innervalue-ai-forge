import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, FileText } from "lucide-react";

const mockDrafts = [
  { id: 1, title: "Q4 Financial Results Press Release", type: "Financial", createdBy: "Maria R.", created: "2026-02-12", lastEdited: "2026-02-12", status: "In progress" },
  { id: 2, title: "New CFO Appointment", type: "Expert", createdBy: "Marco L.", created: "2026-02-11", lastEdited: "2026-02-11", status: "Generated" },
  { id: 3, title: "Annual Report Highlights", type: "Financial", createdBy: "Maria R.", created: "2026-02-10", lastEdited: "2026-02-12", status: "In progress" },
  { id: 4, title: "Strategic Partnership Press Release", type: "Transactional", createdBy: "Marco L.", created: "2026-02-08", lastEdited: "2026-02-09", status: "Generated" },
  { id: 5, title: "H2 Revenue Update Summary", type: "Financial", createdBy: "Maria R.", created: "2026-02-05", lastEdited: "2026-02-06", status: "Generated" },
];

const types = ["All", "Financial", "Expert", "Transactional"];

export default function Drafts() {
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockDrafts.filter(
    (d) =>
      (activeType === "All" || d.type === activeType) &&
      (search === "" || d.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Drafts</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-generated press release drafts</p>
        </div>
        <Link
          to="/drafts/create"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> Create draft
        </Link>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search drafts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-card pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          {types.map((t) => (
            <button key={t} onClick={() => setActiveType(t)} className={activeType === t ? "filter-chip-active" : "filter-chip-inactive"}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created by</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Last edited</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/drafts/${d.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                      {d.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><span className="status-badge-neutral">{d.type}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{d.createdBy}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.created}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.lastEdited}</td>
                  <td className="px-4 py-3"><span className="status-badge-info">{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No drafts yet. Create your first AI-generated draft.</p>
          </div>
        )}
      </div>
    </div>
  );
}
