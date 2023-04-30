# Team8_StudySpots
A webapp that helps students find the best study spots nearby.

<p><a href="https://docs.google.com/presentation/d/1GYQSMaSoYn7sRimBo3pdfNkwEWsBokWD/edit?usp=share_link&ouid=111930462798243880615&rtpof=true&sd=true" target="_blank">Additional details</a></p>
<p><a href="https://drive.google.com/file/d/1hqnFFOr3Da3xIgD9QAaVKX5rqUx3stoA/view" target="_blank">Presentation</a></p>
<p><a href="https://drive.google.com/file/d/1P2_ZbNg0ijGCO09odt22XNJbseSvQ7na/view" target="_blank">Demo</a></p>

<img width="500" src="https://user-images.githubusercontent.com/89865515/235334357-f04d3283-e81d-4ebf-b024-ca64b74d6bee.png">



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

