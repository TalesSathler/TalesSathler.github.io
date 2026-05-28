#!/bin/bash
sudo chmod 775 -R ../
echo 'Container started. Ready for development.'
echo 'Run: docker exec profile-web bash'
echo 'Then: npx nx serve --host 0.0.0.0 (for dev server)'
echo 'Or: npx nx build (for production build)'
tail -f /dev/null
