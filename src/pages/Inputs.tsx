import { useState } from "react";
import { Upload, FileText, ClipboardPaste, Search, Filter, Eye, Plus, X, File, Lock, Unlock } from "lucide-react";

const mockInputs = [
  { id: 1, name: "Q4 Talking Points.docx", type: "Word", source: "Upload", client: "Pilot Corp", prType: "Financial", confidentiality: "Confidential", date: "2026-02-10", versions: 2 },
  { id: 2, name: "Board meeting transcript", type: "Paste", source: "Paste", client: "Pilot Corp", prType: "Expert", confidentiality: "Internal", date: "2026-02-09", versions: 1 },
  { id: 3, name: "Revenue breakdown.xlsx", type: "Excel", source: "Upload", client: "Pilot Corp", prType: "Financial", confidentiality: "Confidential", date: "2026-02-07", versions: 3 },
  { id: 4, name: "CEO quote draft", type: "Paste", source: "Paste", client: "Pilot Corp", prType: "Expert", confidentiality: "Internal", date: "2026-02-05", versions: 1 },
  { id: 5, name: "Partnership details.pdf", type: "PDF", source: "Upload", client: "Pilot Corp", prType: "Transactional", confidentiality: "Confidential", date: "2026-01-30", versions: 1 },
];

const sourceTypes = ["All", "Upload", "Paste"];

export default function Inputs() {
  const [activeSource, setActiveSource] = useState("All");
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [selectedInput, setSelectedInput] = useState<typeof mockInputs[0] | null>(null);

  const filtered = mockInputs.filter(
    (inp) =>
      (activeSource === "All" || inp.source === activeSource) &&
      (search === "" || inp.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Inputs</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload files or paste text as context for draft generation</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Upload className="h-3.5 w-3.5" /> Upload file
          </button>
          <button
            onClick={() => setShowPaste(true)}
            className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            <ClipboardPaste className="h-3.5 w-3.5" /> Paste text
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inputs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border bg-card pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          {sourceTypes.map((t) => (
            <button
              key={t}
              onClick={() => setActiveSource(t)}
              className={activeSource === t ? "filter-chip-active" : "filter-chip-inactive"}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">PR Type</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Confidentiality</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Versions</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((inp) => (
                  <tr
                    key={inp.id}
                    onClick={() => setSelectedInput(inp)}
                    className={`hover:bg-muted/30 transition-colors cursor-pointer ${selectedInput?.id === inp.id ? "bg-accent/50" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                      {inp.source === "Paste" ? <ClipboardPaste className="h-3.5 w-3.5 text-muted-foreground" /> : <File className="h-3.5 w-3.5 text-muted-foreground" />}
                      {inp.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{inp.type}</td>
                    <td className="px-4 py-3"><span className="status-badge-neutral">{inp.prType}</span></td>
                    <td className="px-4 py-3">
                      <span className={inp.confidentiality === "Confidential" ? "status-badge-warning" : "status-badge-info"}>
                        {inp.confidentiality === "Confidential" ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                        {inp.confidentiality}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{inp.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inp.versions}</td>
                    <td className="px-4 py-3">
                      <button className="text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No inputs yet. Upload a file or paste text to get started.</p>
            </div>
          )}
        </div>

        {/* Preview panel */}
        {selectedInput && (
          <div className="w-80 shrink-0 rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-foreground">Preview</h3>
              <button onClick={() => setSelectedInput(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Name</p>
                <p className="text-sm font-medium text-foreground">{selectedInput.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="text-sm text-foreground">{selectedInput.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Source</p>
                  <p className="text-sm text-foreground">{selectedInput.source}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">PR Type</p>
                  <span className="status-badge-neutral">{selectedInput.prType}</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Confidentiality</p>
                  <span className={selectedInput.confidentiality === "Confidential" ? "status-badge-warning" : "status-badge-info"}>
                    {selectedInput.confidentiality}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Versions ({selectedInput.versions})</p>
                <div className="space-y-1.5">
                  {Array.from({ length: selectedInput.versions }, (_, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2 text-xs">
                      <span className="text-foreground">v{selectedInput.versions - i}</span>
                      <span className="text-muted-foreground">{i === 0 ? "Current" : "Previous"}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-md border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors">
                  <Plus className="h-3 w-3" /> Add new version
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowUpload(false)}>
          <div className="bg-card rounded-lg border shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Upload File</h3>
              <button onClick={() => setShowUpload(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="border-2 border-dashed rounded-lg p-8 text-center mb-4 hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-foreground font-medium">Drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Word, PDF, Excel, PowerPoint, TXT</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-foreground">PR Type</label>
                <select className="mt-1 w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Financial</option>
                  <option>Expert</option>
                  <option>Transactional</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Confidentiality</label>
                <select className="mt-1 w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Confidential</option>
                  <option>Internal</option>
                </select>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Lock className="h-3 w-3" /> Uploaded files are stored securely and never shared externally.
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowUpload(false)} className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Upload</button>
            </div>
          </div>
        </div>
      )}

      {/* Paste Modal */}
      {showPaste && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowPaste(false)}>
          <div className="bg-card rounded-lg border shadow-lg w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Paste Text</h3>
              <button onClick={() => setShowPaste(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-foreground">Title</label>
                <input type="text" placeholder="e.g. Board meeting notes" className="mt-1 w-full rounded-md border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Content</label>
                <textarea rows={6} placeholder="Paste your text here..." className="mt-1 w-full rounded-md border bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground">PR Type</label>
                  <select className="mt-1 w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Financial</option>
                    <option>Expert</option>
                    <option>Transactional</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Confidentiality</label>
                  <select className="mt-1 w-full rounded-md border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Internal</option>
                    <option>Confidential</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowPaste(false)} className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
