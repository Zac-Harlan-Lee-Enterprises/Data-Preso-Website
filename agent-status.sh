#!/usr/bin/env bash
set -euo pipefail

PORT=3000
PASS=0
FAIL=0

check() {
  local label="$1"
  local cmd="$2"
  if eval "$cmd" > /dev/null 2>&1; then
    echo "  ✓ $label"
    PASS=$((PASS + 1))
  else
    echo "  ✗ $label"
    FAIL=$((FAIL + 1))
  fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  USS LEE ENTERPRISE — AGENT STATUS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo ""
echo "[ GIT ]"
git status --short 2>/dev/null | head -5 || echo "  Not a git repo"
git log --oneline -3 2>/dev/null || true

echo ""
echo "[ SERVER ]"
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" 2>/dev/null || echo "000")
if [ "$HTTP" = "200" ]; then
  echo "  ✓ Dev server: http://localhost:$PORT  (HTTP $HTTP)"
else
  echo "  ✗ Dev server: NOT running on port $PORT  (HTTP $HTTP)"
fi

echo ""
echo "[ FILES ]"
check "package.json exists"        "test -f package.json"
check "next.config.ts exists"      "test -f next.config.ts"
check "src/app/layout.tsx exists"  "test -f src/app/layout.tsx"
check "Crew photos present"        "test -f public/crew/VirginiaFletcher.jpg"
check ".nojekyll present"          "test -f public/.nojekyll"
check "node_modules installed"     "test -d node_modules"

echo ""
echo "[ BUILD ]"
check "TypeScript compiles" "npx tsc --noEmit 2>/dev/null"

echo ""
echo "[ TESTS ]"
npm test -- --reporter=verbose 2>&1 | tail -10

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Checks: $PASS passed, $FAIL failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ "$FAIL" -eq 0 ] || exit 1
