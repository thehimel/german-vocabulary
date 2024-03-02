import argparse
from pathlib import Path

from django.core.management.utils import get_random_secret_key


def read_data(file_path: str | Path) -> dict:
    file_path = Path(file_path)
    result = {}
    if file_path.is_file():
        with open(file_path, "r") as file:
            for line in file:
                # Ignore comments and empty lines
                if line.strip() and not line.startswith("#"):
                    key, value = line.strip().split("=", 1)
                    result[key] = value.strip("'\"")  # strip both ' and "
    else:
        print(f"Error fetching data from {file_path}: File does not exists.")
    return result


def write_data(file_path: str | Path, data: dict):
    with open(file_path, "w") as file:
        for key, value in data.items():
            file.write(f"{key}='{value}'\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create an environment file from a template.")
    parser.add_argument("--env_template", dest="env_template", required=True, help="Environment template file path.")
    parser.add_argument("--env", dest="env", default=".env", help="Environment file path.")

    args = parser.parse_args()
    env_template, env = args.env_template, args.env

    env_data = read_data(file_path=env_template)
    env_data["SECRET_KEY"] = get_random_secret_key()

    write_data(file_path=env, data=env_data)
