# Contributing

## Workflow

### Repository

The project uses the [Forking Workflow with Pull Requests](https://www.atlassian.com/git/tutorials/making-a-pull-request). This is experimental for the time being, but is expected to help towards the goal of building a complete documentation and a well-organized repository for future TEDxNTUA websites.

In short:

1. Fork the [upstream](https://github.com/TEDxNTUA/tedxntua2019) repository and clone it to your local machine.
1. Follow the [installation instructions](installation.md).
1. Create a branch for the feature you want to work on.
1. When finished, push the feature branch to your repository.
1. Create a pull request on the upstream repo and describe the changes you've made.
1. Participate in discussion between the team members on whether the feature needs improvements or should be merged.
1. Repeat!

### Development

English should be used for variable names, docstrings, documentation etc for uniformity.

[Pylint](https://www.pylint.org/) is used to enforce proper guidelines:

1. [PEP 8](https://www.python.org/dev/peps/pep-0008/) compliance.
1. Docstrings everywhere :)

Rules are meant to be broken though, so if you disagree when Pylint complains about something, feel free to edit the [pylintrc](../pylintrc) configuration accordingly.

### Testing

> `raise NotImplemented`


## Contribute what?

Check the [running projects](https://github.com/TEDxNTUA/tedxntua2019/projects) to find things to work on.