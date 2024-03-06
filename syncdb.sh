# Fetch data from PROD database and save to a file.
./prod.sh && ./dumpdata.sh
echo "Fetched data from PROD database."

# Insert data to DEV database from that file.
./dev.sh && ./loaddata.sh
echo "Inserted data to DEV database."
