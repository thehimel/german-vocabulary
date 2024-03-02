pip install -r src/requirements.txt
python set_env.py --env_template .env_template
python src/manage.py makemigrations
python src/manage.py migrate
