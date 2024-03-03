pip install --upgrade pip
pip install -r src/requirements.txt
python set_env.py --env_template .env_template
./migrate.sh
