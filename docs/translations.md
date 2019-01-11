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

There are 2 options here:

* Use seeders
* Use admin interface
  * Connect with your credentials to admin site as superuser. Go to the appropriate table and add/update the database entry.

