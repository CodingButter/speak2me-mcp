# MODULE: Voice + MCP (id: VMS)

Scope: speak/listen tools; SSML; STT/TTS.

Open if: voice|speak|listen|ssml|stt|tts|elevenlabs|gemini.

Flow:
- speak(text) -> SSML enrich -> ElevenLabs TTS -> save file -> return metrics.
- listen(mode) -> PWA capture -> VAD/chunk -> Gemini STT -> store transcript.

Checklist:
- Target TTFB < 500ms; stream when possible.
- Validate SSML for ElevenLabs compatibility; fallback to plain text on error.
- Save audio under `./data/audio/:convId/:messageId.mp3`.
- Track metrics: ttfbMs, totalMs, audioSecSent, chunks, latencyMs.

Example (speak call sketch):
```ts
await speak({ text, voiceId, model, stream: true })
```

Gotchas:
- PWA must send audio; `listen` may have placeholder `audioData` until wired.
