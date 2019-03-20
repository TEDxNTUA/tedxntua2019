'''Setup script

Usage: pip install .

To install development dependencies too, run: pip install .[dev]
'''
from setuptools import setup, find_packages
from _version import __version__

setup(
    name='tedxntua2019',
    version=__version__,
    packages=find_packages(),
    scripts=['manage.py'],
    url='https://github.com/TEDxNTUA/tedxntua2019',
    author='TEDxNTUA 2019 IT Team',
    author_email='webmaster@tedxntua.com',
    install_requires=[
        'dj-database-url',
        'Django',
        'mysqlclient',
        'django-versatileimagefield',
        'django-webpack-loader',
        'django-parler',
    ],
    extras_require={
        'dev': [
            'pylint',
            'pylint-django',
            'pylint-quotes',
            'git-pylint-commit-hook',
            'django-extensions',
        ],
    },
)
