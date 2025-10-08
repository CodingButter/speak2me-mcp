import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProjectLayout } from "./components/ProjectLayout";
import { Projects } from "./pages/Projects";
import { Chat } from "./pages/Chat";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Notes } from "./pages/Notes";
import { Project } from "./pages/Project";
import { Processes } from "./pages/Processes";
import { System } from "./pages/System";
import { Logs } from "./pages/Logs";
import { SettingsHub } from "./pages/SettingsHub";
import { SettingsEditor } from "./pages/SettingsEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Projects landing page */}
        <Route path="/" element={<Projects />} />

        {/* Global settings (not project-scoped) */}
        <Route path="/settings" element={<SettingsHub />} />
        <Route path="/settings/global" element={<SettingsEditor level="global" />} />

        {/* All project-scoped routes */}
        <Route path="/project/:projectId" element={<ProjectLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat/:conversationId" element={<Chat />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="notes" element={<Notes />} />
          <Route path="project" element={<Project />} />
          <Route path="processes" element={<Processes />} />
          <Route path="system" element={<System />} />
          <Route path="logs" element={<Logs />} />

          {/* Project-scoped settings */}
          <Route path="settings" element={<SettingsHub />} />
          <Route path="settings/project" element={<SettingsEditor level="project" />} />
          <Route path="settings/conversation/:conversationId" element={<SettingsEditor level="conversation" />} />
        </Route>

        {/* Catch-all redirect to projects */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
