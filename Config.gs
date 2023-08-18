//Configuration of constant values

//Systeam Global Variables
var ss = SpreadsheetApp.getActiveSpreadsheet()
var ui = SpreadsheetApp.getUi()
var activeSheet = ss.getActiveSheet()

//Task Object
  var taskObj =
  {
    title: "",
    description: "",
    reference: "",
    url: "",
    conatctPerson: "",
    deadLine: "",
    daysLeft: ""
  }

//Tasks Range
  const Task_Start_Row = 2 //Row 2
  const Task_Start_Column = 5 //Column E // κανονικά είναι 4 (D) για δοκιμή το κάνω 5.
  const Task_Last_Row = 8 //Row 8
  const Task_Row_Range = TaskLastRow - TaskStartRow + 1

//Task Status Range 
  const Task_Status_Start_Row = 10 //Row 10
  const Task_Status_Last_Row= 28 //Row 28. The last section on the list is ESN Western macedonia at row 28. There are 3 more empty rows just in case. Just increase this number accordingly.
  const Task_Status_Row_Range = Task_Status_Last_Row - Task_Status_Start_Row

//Email List on each sheet
  const EMAIL_RANGE= 'B10:B31'

//Task Statuses Values
  const TASK_DONE = "Done ✅"
  const TASK_NOT_APPLICABLE = "Not Applicable"
  const TASK_IN_PROGRESS = "In Progress 🚧"

//Notification Status options
  const NO_EMAIL = "No Email"
  const READY_TO_EMAIL = "Ready to Email"
  const EMAIL_SENT = "Email Sent"

//Days Left Values
  const  PASSED = "Passed"
  const PASSED_TASKS_COLUMN_HEADER = "Passed Tasks"

//Google Group of accounts that can run sorting and create new tasks.
const GOOGLE_GORUP_PERMITION1 = "nb@esngreece.gr"
const GOOGLE_GORUP_PERMITION2 = "nb-support@esngreece.gr"
