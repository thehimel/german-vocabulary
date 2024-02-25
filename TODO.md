## TODO

* Connect Postgres database.
* Create home page with a button to login page.
* Create login page.
  * Users are created via management command.
* Connect cloudinary.
  * Directory format: words/a/a.jpg
* Add app 'vocabulary'
* Add vocabulary model.
  * There will be table for each language i.e. english, bengali.
  * There will be a common part for all languages.
    * Common fields are: image, parts of speech, approved
  * Every language table will have the following fields:
    * word, meaning, sentence in German, meaning of the sentence
* Create a view to add a word.
* Create a view to list the word.
* Create a view to update the word.
* Create a view to list the words to approve.
* Workflow:
  * Data entry operator will add the data.
  * Admin will have to approve the data.
  * Only approved data will be listed in list view.
* Create a rest api to get data for a word.
* Create a command line script to get the full database in a json file.
