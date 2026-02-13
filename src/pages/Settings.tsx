import { useState } from "react";
import { Shield, Users, Mail, CheckCircle2, XCircle, Clock } from "lucide-react";

const roles = [
  { name: "Maria R.", email: "maria@innervalue.it", role: "Admin" },
  { name: "Marco L.", email: "marco@innervalue.it", role: "Writer" },
  { name: "Giulia S.", email: "giulia@innervalue.it", role: "Reviewer" },
];

const permissions = [
  { label: "Mail.Read (delegated)", status: "granted" },
  { label: "Mail.ReadBasic (delegated)", status: "granted" },
  { label: "User.Read (delegated)", status: "granted" },
  { label: "MailboxSettings.Read (delegated)", status: "pending" },
];

const auditLog = [
  { time: "Feb 12, 15:42", user: "Maria R.", action: "Generated draft: Q4 Financial Results", type: "Draft" },
  { time: "Feb 12, 14:30", user: "System", action: "Knowledge base re-indexed: 180 docs", type: "System" },
  { time: "Feb 12, 14:22", user: "System", action: "Outlook sync completed: 3 new items", type: "System" },
  { time: "Feb 11, 16:10", user: "Marco L.", action: "Created draft: New CFO Appointment", type: "Draft" },
  { time: "Feb 11, 11:00", user: "Maria R.", action: "Uploaded: Q4 Talking Points.docx", type: "Input" },
  { time: "Feb 10, 09:30", user: "Maria R.", action: "Updated client profile: Pilot Corp", type: "Client" },
  { time: "Feb 09, 15:20", user: "Giulia S.", action: "Viewed draft: Strategic Partnership PR", type: "Draft" },
  { time: "Feb 09, 10:00", user: "Marco L.", action: "Pasted text: Board meeting transcript", type: "Input" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"roles" | "outlook" | "audit">("roles");

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Administration and configuration</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {[
          { key: "roles" as const, label: "Roles & Users", icon: Users },
          { key: "outlook" as const, label: "Outlook Connector", icon: Mail },
          { key: "audit" as const, label: "Audit Log", icon: Shield },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Roles */}
      {activeTab === "roles" && (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {roles.map((r) => (
                <tr key={r.email} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                  <td className="px-4 py-3">
                    <span className={
                      r.role === "Admin" ? "status-badge-info" :
                      r.role === "Writer" ? "status-badge-success" :
                      "status-badge-neutral"
                    }>
                      {r.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Outlook */}
      {activeTab === "outlook" && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-card shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Microsoft 365 / Graph API</p>
                <p className="text-xs text-muted-foreground">Connected to: pilot-mailbox@pilotcorp.com</p>
              </div>
              <span className="ml-auto status-badge-success"><CheckCircle2 className="h-3 w-3" /> Connected</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              This connector pulls outgoing press releases from the configured Outlook folder. Ensure the required Graph API permissions are granted.
            </p>
            <h4 className="text-xs font-semibold text-foreground mb-2">Permissions Checklist</h4>
            <div className="space-y-2">
              {permissions.map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm">
                  {p.status === "granted" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Clock className="h-4 w-4 text-warning" />
                  )}
                  <span className="text-foreground">{p.label}</span>
                  <span className={p.status === "granted" ? "status-badge-success ml-auto" : "status-badge-warning ml-auto"}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audit log */}
      {activeTab === "audit" && (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Time</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Action</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {auditLog.map((log, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{log.time}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{log.user}</td>
                  <td className="px-4 py-3 text-foreground">{log.action}</td>
                  <td className="px-4 py-3"><span className="status-badge-neutral">{log.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
