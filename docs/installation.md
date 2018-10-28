# Installation

The project follows the [GoodCode.io](https://goodcode.io/articles/django-env-settings/) guide on storing configuration in the environment and the [12factor](https://12factor.net/) methodology. Thus, each deployment needs to have its own isolated environment and its own configuration, which shall be stored in the *.env* file.

## Steps

1. Setup and activate a **virtual environment** with `python3.6`. A useful guide on how to do this can be found [here](https://docs.python-guide.org/dev/virtualenvs/#lower-level-virtualenv).
1. Run `pip install .` if in a production environment, or `pip install .[dev]` if in a development environment.
1. Copy *env.sample* to *.env* and edit *.env* to customize the configuration for your local deployment.
1. Using MySQL for the database is highly recommended. Create a database and a user and configure the `DATABASE_URL` parameter accordingly. A client library may be needed (e.g. `default-libmysqlclient-dev` for Linux).
1. Run the migrations `manage.py migrate`.