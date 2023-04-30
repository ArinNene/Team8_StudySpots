# Team8_StudySpots
A webapp that helps students find the best study spots nearby.

To install on your Eclipse:
1. Using eclipse, create a Dynamic Web Project with Tomcat version 9.
2. Using your system explorer (e.g. Finder), navigate to your Eclipse workspace folder. 
3. Open a new instance of Terminal. Type "cd " and drag and drop the folder icon into the terminal window. It should automatically fill in the classpath.
4. git init
5. git add remote origin git@github.com:ArinNene/Team8_StudySpots
6. git pull

The above should work, not sure though.

After pulling from the repo, you will have to add your local version of a mysql-connector.jar for use with MySQL.
You should create a localproperties.java file with your SQL link saved as a global variable to make sure pulls don't overwrite sql links in any relevant files.

Presentation:
https://drive.google.com/file/d/1hqnFFOr3Da3xIgD9QAaVKX5rqUx3stoA/view

Demo:
https://drive.google.com/file/d/1P2_ZbNg0ijGCO09odt22XNJbseSvQ7na/view
