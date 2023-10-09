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

Users have the ability to create update and delete tasks, columns and boards that will be mirrored withing Google Calendar.
![image](https://github.com/NoahIce/Senior-Project-React/assets/54463292/de9f5c66-b868-4a4c-acc9-e28b9625a5c5)

## Planning
Extensive planning was done to creat this project. Below are some of the design documents
As mentioned, the solution includes a React web front end.These front ends connect to a NodeJS API. The API is responsible to getting data from the MySQL database a repackaging it. From the users perspective, they will login, see a list of boards or create a board, and will be brought to board page where they can interact with their board, creating or updating tasks and doing anything else allowed by the functionality of the app.
A flowchart of the user flow is provided below.
![image](https://github.com/NoahIce/Senior-Project-React/assets/54463292/19b303f9-d086-4779-87c1-6f2e61a72b06)

As shown in the flowchart, the user will be first prompted to sign in. Then the user will choose a board or create a new one at which point they will be brought to the main page where the will be able to create, delete or update tasks, and complete all other functionality afforded by the app. Additionally, the user can sign out. Below is a flowchart for creating tasks.
 ![image](https://github.com/NoahIce/Senior-Project-React/assets/54463292/afbd2c68-d639-4eab-bbcb-fe072aa9f685)


As shown, the user will be presented with a modal view to allow them to update fields. Although this flowchart is for creating tasks it also extends to creating columns or boards. Additionally, updating tasks or anything else will be done in the same way. The user will click the edit button, then a modal view will be shown where the user can update the fields. Instead of being empty, the fields will contain the original information. Then the user can click the submit button to submit the request. This functionality also extends to editing columns and board titles. Below is what these pages may look like. Note that the admin will not have a dedicated user interface.
 ![image](https://github.com/NoahIce/Senior-Project-React/assets/54463292/16378deb-65fc-4891-ba7d-813aeec10d3f)
![image](https://github.com/NoahIce/Senior-Project-React/assets/54463292/ae91ea6b-f265-4aca-8b33-d851d43badbb)

 
Additionally, the sitemap is include below
![image](https://github.com/NoahIce/Senior-Project-React/assets/54463292/d58d14e9-09e4-4d13-b7ca-5528f8ac368e)




 
