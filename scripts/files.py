from pathlib import Path


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


def write_data(file_path: str | Path, data: dict, overwrite: bool = False):
    file_path = Path(file_path)
    if not file_path.is_file() or (file_path.is_file() and overwrite):
        with open(file_path, "w") as file:
            for key, value in data.items():
                file.write(f"{key}='{value}'\n")
