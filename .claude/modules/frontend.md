# MODULE: Frontend (id: FE)

Scope: React PWA (audio, chat, ops).

Open if: frontend|react|vite|tailwind|ui|component|pwa.

Checklist:
- Key cmp: ChatView, AudioControls, ConversationList, Settings.
- Services: audioProcessor, audioEncoder, forcedAlignment, speechRecognition.
- State via Zustand; simple fetch for REST.
- Dev `bun run dev` in `apps/frontend` → http://localhost:5174
- Provide VAD UI; show metrics (TTFB, latency, audio sec).

Example (diagnostics stub):
```tsx
// TODO: DiagnosticsPanel (metrics, statuses, logs, device test)
// labels: enhancement, frontend, pwa
```
Gotchas:
- Keep HMR-friendly structure; avoid heavy globals.
