import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Inputs from "./pages/Inputs";
import KnowledgeBase from "./pages/KnowledgeBase";
import ClientProfile from "./pages/ClientProfile";
import Drafts from "./pages/Drafts";
import CreateDraft from "./pages/CreateDraft";
import DraftEditor from "./pages/DraftEditor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/innervalue-ai-forge">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/inputs" element={<Inputs />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/client" element={<ClientProfile />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/drafts/create" element={<CreateDraft />} />
            <Route path="/drafts/:id" element={<DraftEditor />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
