cd src/client && npm install --force && npx vite build && cd ../..
pip install --upgrade pip
pip install -r src/requirements.txt
python scripts/env_init.py
./migrate.sh
