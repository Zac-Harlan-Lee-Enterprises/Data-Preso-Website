#!/usr/bin/env bash
set -euo pipefail

PORT=3000

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  USS LEE ENTERPRISE — INITIALIZING SHIP SYSTEMS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Kill stale process on port
echo "→ Clearing port $PORT..."
lsof -ti:"$PORT" | xargs -r kill -9 2>/dev/null || true
sleep 0.5

# Install dependencies
echo "→ Installing dependencies..."
npm install --silent

# Copy crew photos to public/
echo "→ Copying crew assets..."
mkdir -p public/crew
cp crew-pictures/VirginiaFletcher.jpg  public/crew/ 2>/dev/null || echo "  ⚠ VirginiaFletcher.jpg not found in crew-pictures/"
cp crew-pictures/ZacHarlan.jpeg        public/crew/ 2>/dev/null || echo "  ⚠ ZacHarlan.jpeg not found in crew-pictures/"

# Add .nojekyll for GitHub Pages
touch public/.nojekyll

# Start dev server in background
echo "→ Starting development server..."
npm run dev &
DEV_PID=$!
echo "  Dev server PID: $DEV_PID"

# Wait for health
echo "→ Waiting for server to come online..."
ATTEMPTS=0
until curl -sf "http://localhost:$PORT" > /dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [ $ATTEMPTS -ge 40 ]; then
    echo "  ⚠ Server did not respond in time. Check http://localhost:$PORT manually."
    break
  fi
  sleep 1
done

HTTP=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" 2>/dev/null || echo "000")

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$HTTP" = "200" ]; then
  echo "  ✓ USS LEE ENTERPRISE ONLINE"
else
  echo "  ⚠ Server status: HTTP $HTTP (may still be starting)"
fi
echo "  URL:  http://localhost:$PORT"
echo "  PID:  $DEV_PID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
