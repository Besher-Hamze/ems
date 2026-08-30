#!/bin/bash
set -euo pipefail
cd /var/www
if [ ! -d /var/www/ems/.git ]; then
  git clone https://github.com/Besher-Hamze/ems.git /var/www/ems
else
  cd /var/www/ems
  git fetch origin
  git reset --hard origin/main
fi
cd /var/www/ems
if [ ! -f .env ]; then
  SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
  cat > .env <<ENVEOF
MONGODB_URI=mongodb://127.0.0.1:27017/ems
AUTH_SECRET=$SECRET
AUTH_URL=http://217.76.56.247:3080
ADMIN_EMAIL=admin@ems.pro
ADMIN_PASSWORD=admin123
ENVEOF
fi
mkdir -p public/uploads
chmod 755 public/uploads
npm install
npm run seed
npm run build
pm2 delete ems >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 show ems
curl -sI http://127.0.0.1:3080 | head -5
