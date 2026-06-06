#!/usr/bin/env bash
set -euo pipefail

ISSUES=0

flag() {
  echo "  ✗ $1"
  ISSUES=$((ISSUES + 1))
}

ok() {
  echo "  ✓ $1"
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  USS LEE ENTERPRISE — QUALITY SWEEP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "[ Architecture Tests ]"
if npm test -- --reporter=verbose 2>&1 | grep -q "PASS\|passed"; then
  ok "All test suites passing"
else
  flag "Test suite failures detected — run 'npm test' for details"
fi

echo ""
echo "[ Debug Artifacts ]"
CONSOLE_LOGS=$(grep -rn "console\.log(" src/ 2>/dev/null | grep -v "//.*console" || true)
if [ -z "$CONSOLE_LOGS" ]; then
  ok "No console.log statements"
else
  flag "console.log found in source:"
  echo "$CONSOLE_LOGS"
fi

DEBUGGERS=$(grep -rn "\bdebugger\b" src/ 2>/dev/null || true)
if [ -z "$DEBUGGERS" ]; then
  ok "No debugger statements"
else
  flag "debugger found:"
  echo "$DEBUGGERS"
fi

echo ""
echo "[ Config Integrity ]"
if node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))" 2>/dev/null; then
  ok "package.json: valid JSON"
else
  flag "package.json: invalid JSON"
fi

if node -e "JSON.parse(require('fs').readFileSync('feature_list.json','utf8'))" 2>/dev/null; then
  ok "feature_list.json: valid JSON"
else
  flag "feature_list.json: invalid JSON or missing"
fi

echo ""
echo "[ Key Files ]"
for f in \
  "src/app/layout.tsx" \
  "src/app/page.tsx" \
  "src/data/computer-qa.ts" \
  "src/data/architecture-nodes.ts" \
  "src/data/acquisition-steps.ts" \
  "src/components/virginia-mode/VirginiaMode.tsx" \
  "public/crew/VirginiaFletcher.jpg" \
  "public/.nojekyll"; do
  if [ -f "$f" ]; then
    ok "$f"
  else
    flag "$f — MISSING"
  fi
done

echo ""
echo "[ TypeScript ]"
if npx tsc --noEmit 2>/dev/null; then
  ok "TypeScript: no errors"
else
  flag "TypeScript: compile errors — run 'npm run type-check'"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$ISSUES" -eq 0 ]; then
  echo "  ✓ Quality sweep clean — $ISSUES issues"
else
  echo "  ✗ Quality sweep: $ISSUES issue(s) found"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ "$ISSUES" -eq 0 ] || exit 1
