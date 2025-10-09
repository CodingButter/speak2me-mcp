# MODULE: Security (id: SEC)

Scope: keys, auth, privacy, safety.

Open if: secret|token|auth|pii|privacy|csp|csrf|xss|cors.

Checklist:
- Never print secrets; read from session or env.
- Ask before destructive ops; provide dry-run when possible.
- Validate SSML → TTS whitelist only.
- Sanitize user content rendered in FE; enforce CSP.
- Avoid storing raw audio transcripts with secrets.
- Log minimally; strip PII; rotate logs.

Gotchas:
- CORS & preflight; auth headers.
- SSE should not leak keys in URL or events.
