📚 Dashboard 2.2-flex | Documentation

Table of Contents (Clickable)

Introduction
Scope
✨ Features
Why is it called flex?
Drag and Drop Task Columns:
Editors as Admins
New Task Announcement Email
Reminder Email Notifications
Sort Tasks
Archive Passed and Completed Tasks
🔨 Set-Up
Automated Set-Up
Authentication Pop-Up
Setting up Triggers
Manual Set-Up / Make it yours
Features in Detail
Assigning a New Task
Adding a new Task Column
Filling out Task Details
Sorting Tasks
Archiving Completed Tasks
Reporting on Assigned Tasks
Email Notifications Example
New Task Announcement Email
Task Reminder Email
🚫 Please do not touch
The Code
Epilogue - Bug Reporting

Introduction
Dashboard is a tool developed using technologies such as Google Spreadsheets and JavaScript code implemented using the Google Apps Script environment. 

Scope
This tool aims to help teams of people, either boards, organising committees, or a national organisation, communicate their tasks more effectively while keeping track of deadlines. In addition, it improves the transparency of who is working on what in said team. 

✨ Features
Why is it called flex?
Getting to the features of the Dashboard 2.2-flex, the main one is in the version naming. Flex, as in flexible, refers to the ability to scale dynamically in two dimensions. One is the number of assignees, whereas the other is the number of task sheets. With this version, you can add new assignees simply by adding new rows. Likewise, new task sheets can be added from the “🌌 ESN Menu”. 
Drag and Drop Task Columns:
You can freely drag, drop, or rearrange any task column. 
Note: To do so, you must keep columns D and the last column hidden.
Editors as Admins
Dashboard 2.2 checks if the current user has editor access to the Google Spreadsheet. If they do, they can see the “🌌 ESN Menu” and perform certain operations such as sorting and archiving. 
New Task Announcement Email
If the B column is populated between the “-start” and “-end” with valid email addresses, all the task required (the ones with the *) fields are filled out, you can set the Notification Status to “Ready to Email 📫”. Those email addresses will receive a notification email to inform them about that task. This will not affect those marked as “Not Applicable” or “Done ✅”. 

Reminder Email Notifications
Upon setup, Dashboard can check daily if it should send a reminder email notification to assignees who are not marked as “Not Applicable” or “Done ✅”. Reminders are controlled using the Priority 🔴 options. 
Sort Tasks
From the “🌌 ESN Menu” by clicking on “🧙‍♂️ Sort Current Task Sheet”, editors can sort tasks on the current task sheet, putting the closest deadline towards the left side. 
Archive Passed and Completed Tasks
From the “🌌 ESN Menu” by clicking on “📂 Archive Completed Tasks”, editors can archive tasks whose deadline has passed and every assignee’s status is either “Not Applicable” or “Done ✅”. Archiving moves them to the right of the “✅ COMPLETED TASKS” column. 

🔨 Set-Up
You can get your Dashboard 2.2-flex copy either 🔗here or 🔗here.
Automated Set-Up
Right after we create our copy of the Dashboard, we can run “🔨 Set Up” from the “🌌 ESN Menu”. This will initialise a series of mandatory actions that need to happen only once by the admin of this tool. By admin, we mean the Google account that will send the automated emails this tool sends. 
Authentication Pop-Up
First, a pop-up window will appear asking for permission for this script to send emails to you and set up automation triggers. You can go ahead and grant these permissions. 
Setting up Triggers
Triggers are what make this dashboard automated. They are a feature of Google Apps Script and can trigger a specific function under specific conditions. This action is set up for the following: 
On Edit Trigger for the onEdit function. Makes it run every time an edit is made in the whole spreadsheet. 
Time Driven Trigger that will run the dailyDeadlineCheck function daily between 10-11 AM.

After those actions, the scripted set-up is complete, and the A1 cell in the Settings sheet will lose its default value, “Needs Setup”, and will be empty. The next time we reload the spreadsheet, the “🔨 Set Up” will not be in the “🌌 ESN Menu”. 

Manual Set-Up / Make it yours
Now that the functional part has been taken care of, it is time to add your team’s information. 

Create the Task Sheets you need. You can do this from the “➕ Add new Task Sheet ✅” option in the “🌌 ESN Menu”. 
Add your team members' roles/names in the C column of a Task Sheet between the ”-start” and the “-end” as the assignees (if you are part of the team, include yourself too).
If you want email notifications for these members, add their email addresses on the B column of a Task Sheet between the ”-start” and the “-end”.
You can delete empty rows or add more rows if needed.
If some email addresses need to appear in multiple  Task Sheets, feel free to use them in the main task sheet for the team and use Google Sheets “=CellRange” formula syntax to add it to the other Task Sheets dynamically. 

After all that, you can hide the A and B columns using that “-” button on the top of the C column. This will group A and B to save visual space. 

You can go to the “Settings” sheet to modify the Contact Person drop-down options if you want or add more.
The options in the “Settings” sheet highlighted with red should only change if their corresponding values are changed in the Config.gs file in the code. Otherwise, the code will not work.
The “Scope” option is currently not in use. So feel free to ignore it. 


Features in Detail 
Assigning a New Task
Adding a new Task Column
Adding a new task in the current task sheet can be performed either from the “🌌 ESN Menu” > “➕ Add New Task” or from the “+” button at the top of the C column. 



Either way, a blank column will be added to the left of the current E column. 
Note: The code will ignore any task that doesn’t have its required fields filled out. 
Filling out Task Details
After creating a new task column, we need to populate the following fields: 
Task ✅*: This is your task title. A short and clear way to identify this task. 
(included in the email notification)
Task Description: A description to let the assignees know what to do. 
(included in the email notification)
Reference: Any related link from another source. It can be a form to fill out, a website, or a post. 
(included in the email notification)
Contact Person*: This person to contact if the assignee needs more information or further instructions. 
(included in the email notification)
Priority 🔴*: This controls the frequency of reminder email notifications. It has the following options:
Low ⚪ : The assignee will get a reminder only on the deadline day if the notification status is “Email Sent”. 
Medium 🔵: The assignee gets a reminder every day only during the last 3 days before the deadline.
High 🔴: The assignee gets a reminder every day only during the last 3 days before the deadline and a week before.   
Critical ⚠️: The assignee gets a reminder every day only during the last 8 days before the deadline.  
(included in the email notification)
Deadline 📆* (dd/mm/yyyy): It marks the task's deadline (surprising, I know).
(included in the email notification)
Notification Status*: This controls the task announcement email notifications using the following options: 
No Email: It doesn’t send a notification. 
Ready to Email 📫: This triggers the script to send a new task announcement for the current task. It only sends emails to the assignees with a corresponding email address in the B column whose task status is not “Done ✅” or “Not Applicable”. 
Email Sent: This is the value Notification Status gets after sending the email. 
Days Left: This is calculated using a spreadsheet formula. If the deadline is passed, it will display “Passed”.
(included in the email notification)
Proof of Completion (Drive link): This feature is optional. The assigner can use it to add a link for the assignees to upload a proof of completion. 
The * marks the required fields. 

Sorting Tasks
Sorting tasks by the sooner deadline is one of the highlight features of this Dashboard. To sort the current Task Sheet select the “🧙‍♂️ Sort Current Task Sheet” from “🌌 ESN Menu”. This action is only available to editors. After clicking it, you will be prompted to confirm with the following message: 


After that, the sorting will start. Remember that an empty column, without a deadline, will be gathered to the leftmost side. 


Archiving Completed Tasks
Tasks whose deadline have passed and are completed by everyone who applicable can be archived moving them to the right side of the “✅ COMPLETED TASKS” column. To do so, you will need to use the “📂 Archive Completed Tasks” option in the “🌌 ESN Menu”. After clicking it, you will be prompted to confirm the action with the following message: 


This action can only be performed by editors. 

Note: If an assignee doesn’t have a name/title, the email address doesn't matter on this one, it will not be taken into account by the code during the archiving process. 
Reporting on Assigned Tasks
Reporting on assigned tasks comes in flavours. Keep in mind that apart from “Done ✅” and “Not Applicable”, the rest do not interact with the code in any way. So feel free to use them as you see fit. 
Started 🔰: The task is in its initial stages. 
Working on it 🚧: The task has progressed a bit. 
Done ✅: The task is completed. 
Stuck 🛑: The task was interrupted by an unforeseen factor and has stopped.
Not Applicable: For assignees that the task does not apply to. 


Email Notifications Example
Below is an example of a task and the two kinds of email notifications an assignee can get. 




New Task Announcement Email


Task Reminder Email






🚫 Please do not touch
There are a few places you will need to be careful around. That would be column D, the “✅ COMPLETED TASKS” column, and the last column on EVERY task sheet. Column D and the last one are supposed to stay hidden so users are able to drag and rearrange task columns as they please. The “✅ COMPLETED TASKS” column moves accordingly when tasks are archived. 

The Code
All the code files used in this tool can be accessed directly from the Apps Script Editor found in top menu bar at Extensions > Apps Script. 

You can also navigate in the GitHub repository. GitHub can also be to update your instance in the future. 

It is advisable to create a GitHub account of your own to fork the original repository and make your code changes in a new branch so you can always revert back to the original version if needed. To connect your Apps Script project, like this one, with a GitHub account, you can use this Google chrome extension called Google Apps Script GitHub Assistant. 



Epilogue - Bug Reporting
This tool has been developed for the needs of ESN Greece national level and its local sections better task management by the National WPA Ilias Nikolarakis 2022/24. 

If the current document left you with questions unanswered, feel free to begin a discussion on GitHub so everyone who uses this tool can stay updated on frequently asked questions. 

Same goes for reporting bugs or suggesting new features. This can be requested from GitHub Issues by opening a new issue. 

In case you need further assistance, you can contact the developer at inikolarakis@tuc.esngreece.gr. 




The files and code mentioned above were created by Ilias Nikolarakis, WPA of ESN Greece 2022/24.
