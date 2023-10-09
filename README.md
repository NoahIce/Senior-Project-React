# ProgLog
Developed by Noah Ice for CST-452 Senior Project II

## Abstract
The aim of this project is to create a more readable and versatile view of Google tasks.
The project will consist of a workflow management program similar to Jira or other like product but with the extra functionality of integrating with Google Calendar. It will be available through a web app. It will use a MySQL database. The data will be managed by a Node.js API. The API will connect to a React front end for the web view. 
The purpose of this project is to create an app unlike anything on the market right now. It will have unique value because of the Google Integration. It will interact with the Google Tasks and Google Calendar API’s t enable this functionality. The app will be developed utilizing the Christian worldview which will allow for a unique perspective while making design decisions.
Overall, the app will allow a user to create boards that manage tasks. Tasks are containers that store information like a description story points and other relevant information. The user will be able to interact with this information through the frontend and will be able to access other people boards via an invite system. These tasks will be synced with the users Google Calendar.

## Implementation
This project will solve the problem of integration between an agile methodology board and Google Calendar and Tasks. The App implements Google's API to authenticate a user and access their tasks. Here are some example endpoints: 
### - https://www.googleapis.com/oauth2/v1/userinfo
### - https://tasks.googleapis.com/tasks/v1/users/@me/lists
### - https://tasks.googleapis.com/tasks/v1/lists/

ProgLog creates the ability for users to manage tasks using Scrum methodologies as seen below
![image](https://github.com/NoahIce/Senior-Project-React/assets/54463292/de8fb132-bffe-457c-b47b-cd232655c59c)
