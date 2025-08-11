#!/usr/bin/env bash
set -euo pipefail

# ===== Config =====
BRANCH="main"                 
PROJECT_NAME="timorya"          
EXTERNAL_NET="rahat-kuca_default"   
FE_ENV_FILE_REL="./frontend/.env.production"  # FE build-time envs for NEXT_PUBLIC_*


echo "==> Fetching latest code for branch: $BRANCH"
git fetch --all --prune
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

if [[ ! -f "$FE_ENV_FILE_REL" ]]; then
  echo "ERROR: Frontend env file '$FE_ENV_FILE_REL' not found."
  echo "Create it with at least:"
  echo "  NEXT_PUBLIC_API_URL=https://api.timorya.com/api"
  echo "  NEXT_PUBLIC_ENVIRONMENT=production"
  exit 1
fi

echo "==> Ensuring external network exists: $EXTERNAL_NET"
if ! docker network inspect "$EXTERNAL_NET" >/dev/null 2>&1; then
  docker network create "$EXTERNAL_NET"
fi

echo "==> Bringing stack down (keep data, remove orphans)"
docker compose -p "$PROJECT_NAME" down --remove-orphans || true

echo "==> Building images (with FE build-time envs)"
docker compose \
  -p "$PROJECT_NAME" \
  --env-file "$FE_ENV_FILE_REL" \
  build --pull

echo "==> Starting updated services"
docker compose \
  -p "$PROJECT_NAME" \
  --env-file "$FE_ENV_FILE_REL" \
  up -d --remove-orphans

echo "==> Pruning dangling images"
docker image prune -f

echo "==> Deployment complete."
docker compose -p "$PROJECT_NAME" ps
