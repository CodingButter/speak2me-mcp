# MODULE: TODO Workflow (id: TODO)

Scope: TODO-driven development; GitHub automation.

Open if: todo|fixme|hack|bug|note|optimize|issue|project board.

Checklist (always):
- Add TODO **before** code/feature/fix/stub.
- Commit TODOs → GH issues → Project #11 (auto Backlog).
- Status sync every 15 min → labels: backlog|in-progress|done|todo.
- After impl, remove TODO → issue closes (auto).

Identifiers → labels:
- TODO → todo
- FIXME → bug, fixme
- HACK → tech-debt, hack
- BUG → bug, todo
- NOTE → documentation
- OPTIMIZE → performance, enhancement

Canonical TODO:
```ts
// TODO: Implement feature X
// Steps: 1) ... 2) ... 3) ...
// labels: enhancement, backend; assignees: codingbutter; milestone: MVP Launch
```

Gotchas:
- Editing a TODO after URL insertion creates a new issue; update the issue instead.
