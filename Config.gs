//Configuration File for easy customization.

//Documentation Link
const DOCUMENTATION_LINK = "https://docs.google.com/document/d/1NnX-ycDSOnuJCTnVVZ1Fnzt_bR62bC8KURzABlgT4Kc/edit?usp=sharing"

//Dashboard Link
const DASHBOARD_URL = SpreadsheetApp.getActiveSpreadsheet().getUrl()

//System Global Variables
let ss = SpreadsheetApp.getActiveSpreadsheet() 
//let activeSheet = ss.getActiveSheet()


//Task Object
  let taskObj =
  {
    title: "",
    description: "",
    reference: "",
    referenceURL: "",
    conatctPerson: "",
    priotiry: "",
    deadLine: "",
    daysLeft: ""
  }

// Timezone
  let TIMEZONE = Session.getScriptTimeZone()

function CurrentSheetData(sheetName)
{
  let currentSheet = ss.getSheetByName(sheetName)

  Task_Status_Start_Row = findArrayIndexOfText(getMatrixColumn(currentSheet.getRange("B:B").getValues(), 0), "-start") +1
  Task_Status_Last_Row = findArrayIndexOfText(getMatrixColumn(currentSheet.getRange("B:B").getValues(), 0), "-end") -1
  Task_Status_Row_Range = Task_Status_Last_Row - Task_Status_Start_Row + 1
  PassedTasksColumnIndex = findArrayIndexOfText(currentSheet.getRange(1, 1, 1, currentSheet.getLastColumn()).getValues()[0], PASSED_TASKS_COLUMN_HEADER)

  return {  task_Status_Start_Row: Task_Status_Start_Row,
            task_Status_Last_Row: Task_Status_Last_Row,
            task_Status_Row_Range: Task_Status_Row_Range,
            passedTasksColumnIndex: PassedTasksColumnIndex,
          }
}

//Task Status Range 
  let Task_Status_Start_Row = 12 // Default value
  let Task_Status_Last_Row = 21 // Default value
  let Task_Status_Row_Range = Task_Status_Last_Row - Task_Status_Start_Row + 1

//Tasks Range
  const Task_Start_Row = 2 // Row 2
  const Task_Start_Column = 5 // Column E 
  let Task_Last_Row = Task_Status_Start_Row -1
  let Task_Row_Range = Task_Last_Row - Task_Start_Row

//Task Details Rows
  const Task_Priorities = Task_Start_Row +4
  const Task_Deadlines = Task_Start_Row +5
  const Task_Proof = Task_Start_Row +8


//Email List on each sheet
  let EMAIL_RANGE = `B${Task_Status_Start_Row}:B${Task_Status_Last_Row}`

//Task Statuses Values
  const TASK_DONE = "Done ✅"
  const TASK_STARTED = "Started 🔰"
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
  const READY_TO_EMAIL = "Ready to Email 📫"
  const EMAIL_SENT = "Email Sent"

//Days Left Values
  const PASSED = "Passed"
  const PASSED_TASKS_COLUMN_HEADER = "✅ COMPLETED TASKS"
  let PassedTasksColumnIndex = 8 // Default value    //findArrayIndexOfText(activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0], PASSED_TASKS_COLUMN_HEADER)


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
//const LB_EMAIL = ss.getSheetByName(SECTIONS_SHEET_NAME).getRange('B1').getValue()
//const SECTIONS_EMAIL = ss.getSheetByName(SECTIONS_SHEET_NAME).getRange('B11').getValue()



//Google Group of accounts that can run sorting and create new tasks.
//const GOOGLE_GROUPS_PERMISSION = [LB_EMAIL] 
// Examle ["localboard@mykonos@esngreece.gr", "localboard-supporters@mykonos@esngreece.gr"]
