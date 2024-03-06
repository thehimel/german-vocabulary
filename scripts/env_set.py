import argparse
from files import read_data, write_data

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Select environment in the .env file.")
    parser.add_argument("--file_path", dest="file_path", default=".env", help="Environment file path.")
    parser.add_argument("--env", dest="env", required=True, help="Selected environment. Options: DEV, PROD")

    args = parser.parse_args()
    file_path = args.file_path

    data = read_data(file_path=file_path)
    data["ENVIRONMENT"] = args.env
    print(f"Successfully set ENVIRONMENT='{args.env}' in {file_path}")

    write_data(file_path=file_path, data=data, overwrite=True)
