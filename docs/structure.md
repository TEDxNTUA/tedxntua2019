# Project structure

* `docs/`  
  Project-level documentation needs to be stored here and be written in Markdown. Module-specific documentation may be located only in source files.
* `etc/`
  Extra files that accompany the project, such as configuration of external tools etc.
* `project/`
    * `settings/`  
      Settings module that reads from *.env* and exports configuration parameters to Django.
    * `urls.py`  
      Top-level routing instructions.
* `manage.py`  
  Django command-line tool.
* `pylintrc`  
  Pylint configuration file.
* `env.sample`  
  Example of a *.env* configuration file.
* `_version.py`  
  Contains a `__version__` variable to indicate the current version of the website. Calendar versioning is used.
* `setup.py`  
  Setup script.
* `requirements.txt`  
  Pinned production dependencies.
* `requirements-dev.txt`
  Pinned development dependencies.