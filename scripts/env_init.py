import argparse
from files import read_data, write_data

from django.core.management.utils import get_random_secret_key


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create an environment file from a template.")
    parser.add_argument("--env_template", dest="env_template", default=".env_template", help="Environment template file path.")
    parser.add_argument("--env", dest="env", default=".env", help="Environment file path.")

    args = parser.parse_args()
    env_template, env = args.env_template, args.env

    env_data = read_data(file_path=env_template)
    env_data["SECRET_KEY"] = get_random_secret_key()

    write_data(file_path=env, data=env_data)
