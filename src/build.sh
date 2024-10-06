echo "Building react application..."
cd client && npm install --force && npx vite build && rm -rf node_modules && cd ..

echo "Upgrading pip..."
python3 -m pip install --upgrade pip setuptools

echo "Installing packages..."
pip3 install -r requirements.txt

echo "Migrating Database..."
python3 manage.py makemigrations
python3 manage.py migrate

echo "Collecting static files."
python3 manage.py collectstatic --no-input
