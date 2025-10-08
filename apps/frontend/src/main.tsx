import { StrictMode } from "react"
const elem = document.getElementById("root")!
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AppProvider } from "./contexts/AppContext"
import App from "./App"
import "@s2m-pac/ui/styles/globals.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const app = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
)

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem))
  root.render(app)
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app)
}

// TODO: Register service worker for PWA functionality
// Project Scope: §3.1 (PWA Features), §6 (Reliability - offline fallback)
// Implementation:
// 1. Check if service workers are supported:
//    if ('serviceWorker' in navigator)
// 2. Register sw.js in production only:
//    navigator.serviceWorker.register('/sw.js')
// 3. Handle registration lifecycle:
//    - onInstalled: Show "App is ready for offline use" notification
//    - onUpdated: Show "New version available" with reload button
//    - onError: Log error, continue without offline support
// 4. Implement update check on app focus:
//    - Check for updates when user returns to app
//    - Prompt user to reload if update available
// 5. Handle offline detection:
//    - Listen to online/offline events
//    - Show offline indicator in UI
//    - Queue failed requests for retry when back online
// 6. Background sync (future):
//    - Sync audio uploads when connection restored
//    - Sync conversation history
// Related: Improve public/sw.js with proper caching strategies
// assignees: codingbutter
// labels: enhancement, pwa, frontend
// milestone: MVP Launch
