# @s2m-pac/claude-agent

Modified fork of `@anthropic-ai/claude-agent-sdk` with API key injection support for Speak2Me.

## Modifications

This package is based on `@anthropic-ai/claude-agent-sdk` version 0.1.9 with the following changes:

### 1. Added `apiKey` Option

**File**: `src/sdkTypes.d.ts` (line ~227)

Added optional `apiKey` parameter to the `Options` type:

```typescript
export type Options = {
    // ... other options
    /**
     * Anthropic API key to use for this query.
     * If not provided, will fall back to ANTHROPIC_API_KEY environment variable.
     */
    apiKey?: string;
    // ... more options
}
```

### 2. API Key Injection

**File**: `src/sdk.mjs` (lines 6361, 6468-6470)

- Added `apiKey` to options destructuring
- Inject `apiKey` into environment before spawning Claude Code process

```javascript
// Line 6361: Added to destructuring
const {
    additionalDirectories = [],
    agents,
    apiKey,  // ← Added
    cwd,
    // ...
} = this.options;

// Lines 6468-6470: Inject into environment
if (apiKey) {
    env.ANTHROPIC_API_KEY = apiKey;
}
```

## Usage

```typescript
import { query } from '@s2m-pac/claude-agent';

for await (const message of query({
  prompt: "Help me build a feature",
  options: {
    apiKey: userAnthropicApiKey,  // ← User's API key from database
    mcpServers: {
      speak2me: customMcpServer
    },
    workingDirectory: projectPath,
    allowedTools: ['Read', 'Write', 'mcp__speak2me__speak']
  }
})) {
  // Stream messages to user
}
```

## Benefits

- **Multi-user support**: Each user can provide their own API key
- **No environment pollution**: No need to modify `process.env` globally
- **Concurrent sessions**: Multiple agents can run simultaneously with different keys
- **Secure**: API keys stay in user's database, not in environment variables

## Original License

See LICENSE.md - Original package is from Anthropic PBC.
