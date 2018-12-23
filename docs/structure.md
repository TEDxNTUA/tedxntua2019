# Project structure

* `__sized__/`
  * `static/`
    Resized (warmed) image files are saved here by default
* `docs/`  
  Project-level documentation needs to be stored here and be written in Markdown. Module-specific documentation may be located only in source files.
* [`bundles/`](webpack/structure.md)
* `assets/`  
  Project-level CSS and JS scripts. For documentation on the bundling process, check [here](webpack/index.md).
* `etc/`
  Extra files that accompany the project, such as configuration of external tools etc.
* `project/`
    * [`home/`](home/index.md)
    * [`program/`](program/index.md)
    * [`team/`](team/index.md)
    * [`about/`](about/index.md)
    * [`partners/`](partners/index.md)
    * [`privacy/`](privacy/index.md)
    * [`license/`](license/index.md)
    * [`contact/`](contact/index.md)
    * `settings/`  
      Settings module that reads from *.env* and exports configuration parameters to Django.
    * `urls.py`  
      Top-level routing instructions.
* `static/`
  Static files like image files, will be saved here.
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
