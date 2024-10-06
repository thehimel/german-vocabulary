# German Words

## Getting Started

### Initialize Client

* Steps are mentioned [here](src/client/README.md)

### Initialize Server

* Clone the repository.
* Create the `.env` file from `.env-template`.
* Upgrade pip: `python -m pip install --upgrade pip`
* Installing packages: `pip install -r requirements.txt`
* Migrating Database:
  * `python3 manage.py makemigrations`
  * `python3 manage.py migrate`

### Create Super User

* `python manage.py create_superuser`
