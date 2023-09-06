//Configuration File for easy customization.

//Documentation Link
const DOCUMENTATION_LINK = "https://docs.google.com/document/d/1NnX-ycDSOnuJCTnVVZ1Fnzt_bR62bC8KURzABlgT4Kc/edit?usp=sharing"

//Dashboard Link
const DASHBOARD_URL = SpreadsheetApp.getActiveSpreadsheet().getUrl()

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
    priotiry: "",
    deadLine: "",
    daysLeft: ""
  }

//Tasks Range
  const Task_Start_Row = 2 //Row 2
  const Task_Start_Column = 5 //Column E 
  const Task_Last_Row = 10 //Row 10
  const Task_Row_Range = Task_Last_Row - Task_Start_Row + 1

//Task Details Rows
  const Task_Priorities = Task_Start_Row + 4
  const Task_Deadlines = Task_Start_Row + 5
  const Task_Proof = Task_Start_Row + 8

//Task Status Range 
  const Task_Status_Start_Row = 12 //Row 12
  const Task_Status_Last_Row = 21 //Row 21
  const Task_Status_Row_Range = Task_Status_Last_Row - Task_Status_Start_Row + 1

//Email List on each sheet
  const EMAIL_RANGE = "B12:B21"

//Task Statuses Values
  const TASK_DONE = "Done ✅"
  const TASK_NOT_APPLICABLE = "Not Applicable"
  const TASK_IN_PROGRESS = "Working on it 🚧"
  const TASK_STUCK = "Stuck 🛑"

//Task Priority Values
  const TASK_PRIORITY_CRITICAL = "Critical ⚠️"
  const TASK_PRIORITY_HIGH = "High 🔴"
  const TASK_PRIORITY_MEDIUM = "Medium 🔵"
  const TASK_PRIORITY_LOW = "Low ⚪"

//Notification Status options
  const NO_EMAIL = "No Email"
  const READY_TO_EMAIL = "Ready to Email"
  const EMAIL_SENT = "Email Sent"

//Days Left Values
  const PASSED = "Passed"
  const PASSED_TASKS_COLUMN_HEADER = "✅ COMPLETED TASKS"


//Sheets Names
const SECTIONS_SHEET_NAME = "🏢 Section"
const PRESIDENTS_SHEET_NAME = "👩‍💼 President"
const VICE_PRESIDENTS_SHEET_NAME = "🙌 VP"
const TREASURERS_SHEET_NAME = "💸Treasurer" 
const CMS_SHEET_NAME = "🎨CM"
const WPAS_SHEET_NAME = "💻WPA"
const PROJECT_MANAGERS_SHEET_NAME = "🌟PM"
const PARTNERSHIPS_MANAGERS_SHEET_NAME = "🤝 ParMan"

//Communities emails
const LB_EMAIL = ss.getSheetByName(SECTIONS_SHEET_NAME).getRange('B1').getValue()
const SECTIONS_EMAIL = ss.getSheetByName(SECTIONS_SHEET_NAME).getRange('B11').getValue()
const PRESIDENTS_EMAIL = ss.getSheetByName(PRESIDENTS_SHEET_NAME).getRange('B11').getValue()
const VICE_PRESIDENTS_EMAIL = ss.getSheetByName(VICE_PRESIDENTS_SHEET_NAME).getRange('B11').getValue()
const TREASURERS_EMAIL = ss.getSheetByName(TREASURERS_SHEET_NAME).getRange('B11').getValue()
const CMS_EMAIL = ss.getSheetByName(CMS_SHEET_NAME).getRange('B11').getValue()
const WPAS_EMAIL = ss.getSheetByName(WPAS_SHEET_NAME).getRange('B11').getValue()
const PROJECT_MANAGERS_EMAIL = ss.getSheetByName(PROJECT_MANAGERS_SHEET_NAME).getRange('B11').getValue()
const PARTNERSHIPS_MANAGERS_EMAIL = ss.getSheetByName(PARTNERSHIPS_MANAGERS_SHEET_NAME).getRange('B11').getValue()


//Google Group of accounts that can run sorting and create new tasks.
const GOOGLE_GROUPS_PERMISSION = [LB_EMAIL] 
// Examle ["localboard@mykonos@esngreece.gr", "localboard-supporters@mykonos@esngreece.gr"]
