import { Building2, Database, Save } from "lucide-react";

const toneOptions = ["Professional & formal", "Confident & authoritative", "Clear & concise", "Neutral & factual"];

export default function ClientProfile() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Client Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Pilot client configuration and style guidelines</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Save className="h-3.5 w-3.5" /> Save changes
        </button>
      </div>

      {/* Client info */}
      <div className="rounded-lg border bg-card shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-foreground">Client Name</label>
            <input
              type="text"
              defaultValue="Pilot Corp S.p.A."
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">Sector</label>
            <input
              type="text"
              defaultValue="Financial Services / Banking"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground">Short Description</label>
          <textarea
            rows={3}
            defaultValue="Pilot Corp is a leading European financial services group, providing retail and corporate banking, insurance, and asset management across 12 markets."
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>
      </div>

      {/* Tone & Style */}
      <div className="rounded-lg border bg-card shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Tone & Style Guidelines</h2>
        <div>
          <label className="text-xs font-medium text-foreground">Default Tone</label>
          <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            {toneOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-foreground flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-success" /> Do's
            </label>
            <textarea
              rows={4}
              defaultValue={"• Use precise financial terminology\n• Reference specific data and metrics\n• Maintain a forward-looking but grounded tone\n• Cite regulatory frameworks where relevant"}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-destructive" /> Don'ts
            </label>
            <textarea
              rows={4}
              defaultValue={"• Don't use superlatives ('best', 'leading')\n• Don't speculate on future performance\n• Don't reference competitors by name\n• Don't use informal language or slang"}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* Assigned collections */}
      <div className="rounded-lg border bg-card shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Assigned Knowledge Collections</h2>
          <button className="text-xs text-primary font-medium hover:underline">Manage</button>
        </div>
        <div className="rounded-md border p-4 flex items-center gap-3">
          <Database className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Pilot Corp – Main</p>
            <p className="text-xs text-muted-foreground">180 documents · Last indexed: Feb 12, 2026</p>
          </div>
          <span className="ml-auto status-badge-success">Active</span>
        </div>
      </div>
    </div>
  );
}
