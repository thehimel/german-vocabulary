find . -name "db.sqlite3" -exec rm -f {} +
find . -path "*/migrations/*.py" -not -name "__init__.py" -exec rm -f {} +
