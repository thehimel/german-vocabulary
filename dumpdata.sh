mkdir -p dist
python src/manage.py dumpdata words previews --indent 2 > dist/data.json
