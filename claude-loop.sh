#!/bin/bash

# Auto-restart wrapper for Claude Code
# Usage: ./claude-loop.sh [claude arguments]
# Example: ./claude-loop.sh --continue

CLAUDE_BIN="/home/codingbutter/.claude/local/claude"
MAX_CRASHES=10
CRASH_COUNT=0

echo "=== Claude Code Auto-Restart Script ==="
echo "Started at: $(date)"
echo "Arguments: $@"
echo ""

# Loop for auto-restart
while true; do
  # Determine arguments to pass
  if [ $CRASH_COUNT -eq 0 ]; then
    # First run - use provided arguments or default
    if [ $# -eq 0 ]; then
      ARGS="--continue continue"
    else
      ARGS="$@"
    fi
  else
    # After crash - always use --continue
    ARGS="--continue continue"
  fi

  echo "Running: $CLAUDE_BIN $ARGS"
  echo ""

  # Run Claude (allows full interaction)
  $CLAUDE_BIN $ARGS
  EXIT_CODE=$?

  # If clean exit (0), we're done
  if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Claude exited cleanly. Goodbye!"
    exit 0
  fi

  # Crashed - increment counter
  CRASH_COUNT=$((CRASH_COUNT + 1))

  echo ""
  echo "⚠️  Claude crashed with exit code $EXIT_CODE!"
  echo "Restart attempt #$CRASH_COUNT of $MAX_CRASHES"

  # Check if exceeded max crashes
  if [ $CRASH_COUNT -ge $MAX_CRASHES ]; then
    echo "❌ Max crashes reached. Giving up."
    exit 1
  fi

  # Wait before restart
  echo "Restarting in 3 seconds..."
  sleep 3
  echo ""
  echo "=== Restarting Claude ==="
  echo ""
done
