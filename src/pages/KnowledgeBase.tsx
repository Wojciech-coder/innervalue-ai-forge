import { useState } from "react";
import { Database, Plus, CheckCircle2, AlertTriangle, Search, Send, FileText, Mail, Globe, ToggleLeft, ToggleRight } from "lucide-react";

const collections = [
  { id: 1, name: "Pilot Corp – Main", docs: 180, lastIndexed: "Feb 12, 2026 14:30", status: "Indexed", errors: 0 },
];

const collectionSources = [
  { id: 1, name: "Q4 2025 Financial Results", type: "Outlook", date: "2026-02-10" },
  { id: 2, name: "Q4 Talking Points.docx", type: "Upload", date: "2026-02-10" },
  { id: 3, name: "New Board Member Appointment", type: "Outlook", date: "2026-02-08" },
  { id: 4, name: "Board meeting transcript", type: "Paste", date: "2026-02-09" },
  { id: 5, name: "Revenue breakdown.xlsx", type: "Upload", date: "2026-02-07" },
  { id: 6, name: "Strategic Partnership Announcement", type: "Outlook", date: "2026-01-28" },
];

const mockRetrievalResults = [
  { snippet: "Q4 revenue increased by 12% year-over-year, reaching €245M driven by strong performance in the DACH region.", source: "Q4 2025 Financial Results", type: "Outlook", relevance: 0.94 },
  { snippet: "The board approved a dividend increase of 5% for 2025, reflecting confidence in the company's growth trajectory.", source: "Q4 Talking Points.docx", type: "Upload", relevance: 0.87 },
  { snippet: "CEO stated: 'We remain focused on sustainable growth and value creation for our shareholders.'", source: "Board meeting transcript", type: "Paste", relevance: 0.81 },
];

export default function KnowledgeBase() {
  const [selectedCollection, setSelectedCollection] = useState(collections[0]);
  const [publicSources, setPublicSources] = useState(false);
  const [testQuery, setTestQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const sourceIcon = (type: string) => {
    if (type === "Outlook") return <Mail className="h-3.5 w-3.5 text-info" />;
    if (type === "Upload") return <FileText className="h-3.5 w-3.5 text-primary" />;
    return <FileText className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Knowledge Base</h1>
        <p className="text-sm text-muted-foreground mt-1">RAG collections for grounded draft generation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collections */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-sm font-semibold text-foreground">Collections</h3>
            <button className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
              <Plus className="h-3 w-3" /> New
            </button>
          </div>
          <div className="divide-y">
            {collections.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCollection(c)}
                className={`w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors ${selectedCollection.id === c.id ? "bg-accent/50" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span>{c.docs} docs</span>
                  <span>·</span>
                  <span className="status-badge-success">
                    <CheckCircle2 className="h-3 w-3" /> {c.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Last indexed: {c.lastIndexed}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Collection details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sources */}
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-foreground">Sources in "{selectedCollection.name}"</h3>
              <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                <Plus className="h-3 w-3" /> Add sources
              </button>
            </div>
            <div className="divide-y">
              {collectionSources.map((s) => (
                <div key={s.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                  {sourceIcon(s.type)}
                  <span className="text-foreground font-medium flex-1">{s.name}</span>
                  <span className="status-badge-neutral">{s.type}</span>
                  <span className="text-xs text-muted-foreground">{s.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source policy */}
          <div className="rounded-lg border bg-card shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Source Policy</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Internal sources (Outlook + Inputs) are always prioritized.</p>
              </div>
              <button
                onClick={() => setPublicSources(!publicSources)}
                className="flex items-center gap-2 text-sm"
              >
                {publicSources ? (
                  <ToggleRight className="h-6 w-6 text-primary" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-muted-foreground" />
                )}
                <span className={`text-xs font-medium ${publicSources ? "text-primary" : "text-muted-foreground"}`}>
                  Public web sources
                </span>
              </button>
            </div>
            {publicSources && (
              <div className="mt-3 rounded-md bg-warning/10 border border-warning/20 px-3 py-2 text-xs text-warning-foreground flex items-start gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
                <span>Public sources may include unverified information. Always review AI-generated content against internal sources.</span>
              </div>
            )}
          </div>

          {/* Test retrieval */}
          <div className="rounded-lg border bg-card shadow-sm">
            <div className="px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-foreground">Test Retrieval Sandbox</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Ask a question to test what the RAG retrieves from this collection.</p>
            </div>
            <div className="p-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="e.g. What were the Q4 revenue highlights?"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button
                  onClick={() => setShowResults(true)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" /> Test
                </button>
              </div>

              {showResults && (
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-medium text-muted-foreground">{mockRetrievalResults.length} snippets retrieved</p>
                  {mockRetrievalResults.map((r, i) => (
                    <div key={i} className="rounded-md border p-3 space-y-2">
                      <p className="text-sm text-foreground">&ldquo;{r.snippet}&rdquo;</p>
                      <div className="flex items-center gap-3 text-xs">
                        {sourceIcon(r.type)}
                        <span className="text-muted-foreground">{r.source}</span>
                        <span className="status-badge-neutral">{r.type}</span>
                        <span className="ml-auto text-muted-foreground">Relevance: {(r.relevance * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
