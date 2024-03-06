find src -name "db.sqlite3" -exec rm -f {} +
find src -path "*/migrations/*.py" -not -name "__init__.py" -exec rm -f {} +
