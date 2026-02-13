import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mail,
  FileText,
  ClipboardPaste,
  Lock,
  Unlock,
  Maximize2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  { id: 1, title: "Headline", grounded: 2 },
  { id: 2, title: "Opening Paragraph", grounded: 3 },
  { id: 3, title: "Key Financial Highlights", grounded: 4 },
  { id: 4, title: "CEO Quote", grounded: 1 },
  { id: 5, title: "Outlook", grounded: 0 },
  { id: 6, title: "Boilerplate & Disclaimer", grounded: 1 },
];

const sourcesUsed = [
  { name: "Q4 2025 Financial Results", type: "Outlook", date: "Feb 10, 2026", confidentiality: "Confidential", snippet: "Revenue reached €245M in Q4, a 12% increase YoY..." },
  { name: "Q4 Talking Points.docx", type: "Upload", date: "Feb 10, 2026", confidentiality: "Confidential", snippet: "Key messages: sustainable growth, shareholder value, digital transformation..." },
  { name: "Board meeting transcript", type: "Paste", date: "Feb 09, 2026", confidentiality: "Internal", snippet: "CEO emphasized the importance of disciplined capital allocation..." },
  { name: "Revenue breakdown.xlsx", type: "Upload", date: "Feb 07, 2026", confidentiality: "Confidential", snippet: "DACH region: €98M (+15%), Southern Europe: €72M (+8%)..." },
];

const draftContent = `Pilot Corp S.p.A. Reports Strong Q4 2025 Results, Revenue Up 12% YoY

Milan, February 12, 2026 – Pilot Corp S.p.A. (BIT: PLTC), a leading European financial services group, today announced its financial results for the fourth quarter ended December 31, 2025.

Key Financial Highlights

• Group revenue reached €245 million in Q4 2025, representing a 12% increase year-over-year, driven by strong performance across all business segments.
• The DACH region contributed €98 million (+15% YoY), while Southern Europe delivered €72 million (+8% YoY).
• Net income for the quarter was €48 million, with an operating margin of 19.6%.
• The Board of Directors has proposed a dividend increase of 5% for the fiscal year 2025.

CEO Comment

"We are pleased to report another quarter of strong results that demonstrate the resilience and growth potential of our business model," said [CEO Name], Chief Executive Officer of Pilot Corp. "Our disciplined approach to capital allocation and continued investment in digital transformation are delivering tangible value for our shareholders."

Outlook

[This section needs additional sources to provide a well-grounded outlook statement. Consider adding forward-looking guidance documents or recent analyst presentations.]

About Pilot Corp S.p.A.

Pilot Corp S.p.A. is a leading European financial services group providing retail and corporate banking, insurance, and asset management services across 12 markets. Founded in 1925 and headquartered in Milan, the company serves over 15 million customers.`;

export default function DraftEditor() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(1);
  const [content, setContent] = useState(draftContent);

  const sourceIcon = (type: string) => {
    if (type === "Outlook") return <Mail className="h-3.5 w-3.5 text-info" />;
    if (type === "Upload") return <FileText className="h-3.5 w-3.5 text-primary" />;
    return <ClipboardPaste className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b bg-card shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/drafts")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Q4 Financial Results Press Release</h1>
            <p className="text-xs text-muted-foreground">Financial · Pilot Corp · Last edited: just now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <RefreshCw className="h-3 w-3" /> Regenerate all
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">
            <Maximize2 className="h-3 w-3" /> Tighten to sources
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Outline */}
        <div className="w-56 shrink-0 border-r bg-card overflow-y-auto">
          <div className="px-3 py-3 border-b">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sections</p>
          </div>
          <div className="py-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                  activeSection === s.id ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted/50"
                }`}
              >
                {activeSection === s.id ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />}
                <span className="flex-1 truncate">{s.title}</span>
                {s.grounded > 0 ? (
                  <span className="text-[10px] text-success font-medium">{s.grounded}src</span>
                ) : (
                  <AlertTriangle className="h-3 w-3 text-warning shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Editor */}
        <div className="flex-1 overflow-y-auto p-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[calc(100vh-200px)] bg-transparent text-foreground text-sm leading-relaxed resize-none focus:outline-none font-mono"
          />
        </div>

        {/* Right: AI Controls + Sources */}
        <div className="w-80 shrink-0 border-l bg-card overflow-y-auto">
          {/* AI Controls */}
          <div className="px-4 py-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Controls</h3>
          </div>
          <div className="p-4 space-y-3 border-b">
            <div>
              <label className="text-xs font-medium text-foreground">Tone</label>
              <select className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Professional & formal</option>
                <option>Confident & authoritative</option>
                <option>Clear & concise</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Template</label>
              <select className="mt-1 w-full rounded-md border bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Standard PR</option>
                <option>ESPI-like</option>
                <option>Short note</option>
              </select>
            </div>
            <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Sparkles className="h-3.5 w-3.5" /> Regenerate section
            </button>
          </div>

          {/* Grounding status */}
          <div className="px-4 py-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grounding</h3>
          </div>
          <div className="p-4 space-y-2 border-b">
            {sections.map((s) => (
              <div key={s.id} className="flex items-center justify-between text-xs">
                <span className="text-foreground truncate">{s.title}</span>
                {s.grounded > 0 ? (
                  <span className="status-badge-success">
                    <CheckCircle2 className="h-3 w-3" /> {s.grounded} sources
                  </span>
                ) : (
                  <span className="status-badge-warning">
                    <AlertTriangle className="h-3 w-3" /> Needs sources
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Sources used */}
          <div className="px-4 py-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sources Used ({sourcesUsed.length})</h3>
          </div>
          <div className="divide-y">
            {sourcesUsed.map((s, i) => (
              <div key={i} className="px-4 py-3 space-y-1.5">
                <div className="flex items-center gap-2">
                  {sourceIcon(s.type)}
                  <span className="text-xs font-medium text-foreground flex-1 truncate">{s.name}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">&ldquo;{s.snippet}&rdquo;</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="status-badge-neutral">{s.type}</span>
                  <span>{s.date}</span>
                  <span className={s.confidentiality === "Confidential" ? "status-badge-warning" : "status-badge-info"}>
                    {s.confidentiality === "Confidential" ? <Lock className="h-2.5 w-2.5" /> : <Unlock className="h-2.5 w-2.5" />}
                    {s.confidentiality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
