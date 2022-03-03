# 11.1 Warming up

Ok, so you're a member of team developing Python application.
The app is starting to get ready and you need to start thinking about releasing it.
In this short text, I will go through what kind of CI setup you will need.

To get started, consider using a starter-workflow (for Github Actions), for example this one:
https://github.com/actions/starter-workflows/blob/main/ci/python-package.yml

Note that this is a template that you can use as a basis for your setup. Edit it
to the required format.


### Linting

As you may have noticed, the template sets up flake8 for linting. It can detect logical 
and stylistic lint. Flake8 will work nicely but if you want you can use another linter
such as PyLint or PyFlakes.


### Testing

The starter-workflow sets up pytest for testing. However, Python code can also be tested
using packages listed below. For example:

    - Robot Framework
    - PyUnit
    - Testify
    - nose2

### Building

Python is an interpreted language. This means that you don't actually need to "translate" 
your code for computers to run it.

In Python, the "build" step will more likely include test execution and installing dependencies.
