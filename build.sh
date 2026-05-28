#!/bin/bash
sudo chmod 775 -R ../
docker compose -f docker-compose.yml up --force-recreate --build -d
docker exec profile-web bash -c 'cd /var/www && npx nx build'
echo 'Build complete. Output in dist/tales-sathler/browser/'
