//Configuration File for easy customization.

//Systeam Global Variables
var ss = SpreadsheetApp.getActiveSpreadsheet() 
//var ui = SpreadsheetApp.getUi()
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
  const Task_Row_Range = Task_Last_Row - Task_Start_Row + 1

//Task Status Range 
  const Task_Status_Start_Row = 10 //Row 10
  const Task_Status_Last_Row = 28 //Row 28. The last section on the list is ESN Western macedonia at row 28. There are 3 more empty rows just in case. Just increase this number accordingly.
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
  const PASSED_TASKS_COLUMN_HEADER = "✅ COMPLETED TASKS"

//Google Group of accounts that can run sorting and create new tasks.
const GOOGLE_GORUPS_PERMITION = ["nb@esngreece.gr", "nb-support@esngreece.gr"]

//Sheets Names
const SECTIONS_SHEET_NAME = "Sections"
const PRESIDENTS_SHEET_NAME = "👩‍💼 Presidents"
const VICE_PRESIDENTS_SHEET_NAME = "🙌 VPs"
const TREASURERS_SHEET_NAME = "💸Treasurers" 
const CMS_SHEET_NAME = "🎨CMs"
const WPAS_SHEET_NAME = "💻WPAs"
const PROJECT_MANAGERS_SHEET_NAME = "🌟PMs"
const PARTNERSHIPS_MANAGERS_SHEET_NAME = "🤝 ParMans"

//Communities emails
const SECTIONS_EMAIL = 'wpa+sections@esngreece.gr'//ss.getSheetByName(SECTIONS_SHEET_NAME).getRange('B9').getValue()
const PRESIDENTS_EMAIL = 'wpa+pr@esngreece.gr'//ss.getSheetByName(PRESIDENTS_SHEET_NAME).getRange('B9').getValue()
const VICE_PRESIDENTS_EMAIL = 'wpa+vps@esngreece.gr'//ss.getSheetByName(VICE_PRESIDENTS_SHEET_NAME).getRange('B9').getValue()
const TREASURERS_EMAIL = "wpa+tr@esngreece.gr" //ss.getSheetByName(TREASURERS_SHEET_NAME).getRange('B9').getValue()
const CMS_EMAIL = 'wpa+cms@esngreece.gr'//ss.getSheetByName(CMS_SHEET_NAME).getRange('B9').getValue()
const WPAS_EMAIL = 'wpa+wpas@esngreece.gr'//ss.getSheetByName(WPAS_SHEET_NAME).getRange('B9').getValue()
const PROJECT_MANAGERS_EMAIL = 'wpa+projman@esngreece.gr'//ss.getSheetByName(PROJECT_MANAGERS_SHEET_NAME).getRange('B9').getValue()
const PARTNERSHIPS_MANAGERS_EMAIL = 'wpa+parman@esngreece.gr'//ss.getSheetByName(PARTNERSHIPS_MANAGERS_SHEET_NAME).getRange('B9').getValue()
