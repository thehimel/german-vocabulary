# Fetch data from PROD database and save to a file.
./prod.sh && ./dumpdata.sh

# Insert data to DEV database from that file.
./dev.sh && ./loaddata.sh
