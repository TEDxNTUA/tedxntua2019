# About



This page is about the translation architecture we use in the project.







## Usage



### Translation of static fields

When you need a translatable string, instead of using the string itself use: 

`gettext_lazy("A new translatable string")` if you are inside a controller, or `{% trans "A new translatable string" %}` if you are inside a template.

After that run `make` at the root folder of your project, so django can produce empty translation strings for your new string at `locale/{locale_id}`.

Then go to `locale/`, find your string and set the translation.

Run `make` again, in order for your change to have effect on the project (compiled mo files).



### Translation of database fields

We are using [django-parler](https://github.com/django-parler/django-parler) for database fields translation.

The model should inherit from `TranslatableModel` class of `parler.models` and declare translatable fields explicitly in the `translations = TranslatedFields(<field1>, <field2>, ..., <fieldN>)` variable.

The admin integration is smooth. The only thing you need to do is to create an admin class that inherits from `TranslatableAdmin` class of `parler.admin`, associate it with a `TranslatableModelForm` and register it to the admin backend.

