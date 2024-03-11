find src -path "*/migrations/*.py" -not -name "__init__.py" -exec rm -f {} +
./migrate.sh
