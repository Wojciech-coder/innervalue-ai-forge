import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, FileText, Mail, ClipboardPaste, Sparkles, File } from "lucide-react";

const contextSources = [
  { id: 1, name: "Q4 2025 Financial Results", type: "Outlook", icon: Mail },
  { id: 2, name: "Q4 Talking Points.docx", type: "Upload", icon: File },
  { id: 3, name: "Board meeting transcript", type: "Paste", icon: ClipboardPaste },
  { id: 4, name: "Revenue breakdown.xlsx", type: "Upload", icon: File },
  { id: 5, name: "New Board Member Appointment", type: "Outlook", icon: Mail },
  { id: 6, name: "CEO quote draft", type: "Paste", icon: ClipboardPaste },
];

const steps = ["Client & Type", "Select Sources", "Generate"];

export default function CreateDraft() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [prType, setPrType] = useState("Financial");
  const [selectedSources, setSelectedSources] = useState<number[]>([]);
  const [generating, setGenerating] = useState(false);

  const toggleSource = (id: number) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      navigate("/drafts/1");
    }, 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate("/drafts")} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to drafts
      </button>

      <h1 className="text-2xl font-semibold text-foreground">Create New Draft</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
              i < step ? "bg-success/10 text-success" :
              i === step ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="font-semibold">{i + 1}</span>}
              {s}
            </div>
            {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <div className="rounded-lg border bg-card shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Pilot Corp S.p.A.</p>
              <p className="text-xs text-muted-foreground">Financial Services / Banking</p>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">Press Release Type</label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["Financial", "Expert", "Transactional"].map((t) => (
                <button
                  key={t}
                  onClick={() => setPrType(t)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    prType === t ? "border-primary bg-accent" : "hover:bg-muted"
                  }`}
                >
                  <FileText className={`h-5 w-5 mb-2 ${prType === t ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="text-sm font-medium text-foreground">{t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t === "Financial" ? "Earnings, results, dividends" : t === "Expert" ? "Appointments, interviews" : "M&A, partnerships, deals"}
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <div className="rounded-lg border bg-card shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Select Context Sources</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Choose Outlook items and uploaded inputs to ground the draft.</p>
          </div>
          <div className="space-y-2">
            {contextSources.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleSource(s.id)}
                className={`w-full flex items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                  selectedSources.includes(s.id) ? "border-primary bg-accent/50" : "hover:bg-muted/50"
                }`}
              >
                <div className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                  selectedSources.includes(s.id) ? "bg-primary border-primary" : "border-muted-foreground"
                }`}>
                  {selectedSources.includes(s.id) && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                </div>
                <s.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium text-foreground flex-1">{s.name}</span>
                <span className="status-badge-neutral">{s.type}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{selectedSources.length} source{selectedSources.length !== 1 ? "s" : ""} selected</p>
          <div className="flex justify-between">
            <button onClick={() => setStep(0)} className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={selectedSources.length === 0}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Next <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <div className="rounded-lg border bg-card shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Generate Draft</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Review settings and generate your AI draft.</p>
          </div>
          <div className="rounded-md border p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Client</span>
              <span className="font-medium text-foreground">Pilot Corp S.p.A.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium text-foreground">{prType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sources</span>
              <span className="font-medium text-foreground">{selectedSources.length} selected</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-foreground">Tone</label>
              <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Professional & formal</option>
                <option>Confident & authoritative</option>
                <option>Clear & concise</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Structure Template</label>
              <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Standard PR</option>
                <option>ESPI-like</option>
                <option>Short note</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="rounded-md border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Back
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse-slow" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Draft
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
