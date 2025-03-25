This project on backend with chai aur code channel
This project is mainly on video series on backend with Javascript 

Now firstly pushed in github with all basic steps 
git init
git add .
git commit -m "this project"
Create a new repo in github with backend project
git branch -M main
git remote add origin https://github.com/
git push -u origin main
All the project is pushed in github

Now we created a file witn folder but git donot take it so to add folder file
we add .gitkeep (to keep empty folder)
Adding .gitignore file to add all sensitive files related to the project
Now creating src folder file with some folder files plus js files 
In terminal -->cd src -->ls -->touch app.js constants.js index.js
To create new folder file in src -->mkdir controller db middlewares models routes utils

Controller --> major functionality
db --> how to connect database in this folder connection logic is written here
middlewares --> any code we want to run in between file for eg: any req came form server but you are asking server any question but add middleware ki muje apni cookies do 
taki me pta karu ki ap us info ko lene ki yogiye ho yha nhi ho
models--> adding mongo db full setup connecting with any database 
routes--> routes were written in index.js file but for web application we need different pages so routes help in distinguish the file
utils --> shortcut for utility like file upload is utility mail is utility 


In package.json file Type:module
When server reload then server start and stop to smoothly run server we add utility nodemon package for server help in reload server
we take dev dependencies because we take in developement but not in production in terminal --> npm i -D nodemon
In package.json file scripts -->dev : nodemon src/index.js

We use Prettier --> Code formatter which help in project
npm i -D Prettier add file in project after prettier .prettierignore 
.prettierrc -->{
  "singleQoute": false,
  "bracketSpacing": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "semi": true
}
