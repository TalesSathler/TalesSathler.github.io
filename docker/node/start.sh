#!/bin/bash
sudo chmod 775 -R ../

echo 'Container started. Ready for development.'
echo 'Run: yarn build (for production build)'

yarn start
tail -f /dev/null
