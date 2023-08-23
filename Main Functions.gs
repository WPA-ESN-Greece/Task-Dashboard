function onOpen()
{
  if (checkGroupMembership() === true){initMenu()}
  //initMenu()
}

function onEdit()
{
  //Sections
  newTaskEmailTo(SECTIONS_SHEET_NAME, SECTIONS_EMAIL)

  //👩‍💼 Presidents
  newTaskEmailTo(PRESIDENTS_SHEET_NAME, PRESIDENTS_EMAIL)

  //🙌 VPs
  newTaskEmailTo(VICE_PRESIDENTS_SHEET_NAME, VICE_PRESIDENTS_EMAIL)

  //💸Treasurers
  newTaskEmailTo(TREASURERS_SHEET_NAME, TREASURERS_EMAIL)

  //🎨CMs
  newTaskEmailTo(CMS_SHEET_NAME, CMS_EMAIL)

  //💻WPAs
  newTaskEmailTo(WPAS_SHEET_NAME, WPAS_EMAIL)

  //🌟PMs
  newTaskEmailTo(PROJECT_MANAGERS_SHEET_NAME, PROJECT_MANAGERS_EMAIL)

  //🤝 ParMans
  newTaskEmailTo(PARTNERSHIPS_MANAGERS_SHEET_NAME, PARTNERSHIPS_MANAGERS_EMAIL)
}


function dailyDeadlineCheck()
{
  //Sections
  dailyEmailReminder(SECTIONS_SHEET_NAME)

  //👩‍💼 Presidents
  dailyEmailReminder(PRESIDENTS_SHEET_NAME)

  //🙌 VPs
  dailyEmailReminder(VICE_PRESIDENTS_SHEET_NAME)

  //💸Treasurers
  dailyEmailReminder(TREASURERS_SHEET_NAME)

  //🎨CMs
  dailyEmailReminder(CMS_SHEET_NAME)

  //💻WPAs
  dailyEmailReminder(WPAS_SHEET_NAME)

  //🌟PMs
  dailyEmailReminder(PROJECT_MANAGERS_SHEET_NAME)

  //🤝 ParMans
  dailyEmailReminder(PARTNERSHIPS_MANAGERS_SHEET_NAME)
}

function addNewTask()
{
  var ui = SpreadsheetApp.getUi()

  if (checkGroupMembership() === true && showAlert(
    "➕ Add New Task",`You are about to insert a new task column to the left of Column E on the active sheet [${activeSheet.getName()}].
    Are you sure you want to continue?`,
    ui.ButtonSet.OK_CANCEL) === ui.Button.OK)
  {
    newTaskColumn()
  }
  else {return}
}

function sortTasks()
{
  var ui = SpreadsheetApp.getUi()

  if (checkGroupMembership() === true && showAlert(
    "🧙‍♂️ Sort Current Tasksheet",`You are about to sort the task colums on the active sheet [${activeSheet.getName()}].
    Are you sure you want to continue?`,
    ui.ButtonSet.OK_CANCEL) === ui.Button.OK)
  {
    insertionSort()

    showAlert(
    "🧙‍♂️ Sort Current Tasksheet",`Tasks on sheet [${activeSheet.getName()}] should now be sorted.`,
    ui.ButtonSet.OK)
  }
  else {return}
}

function archiveCompletedTasks()
{
  var ui = SpreadsheetApp.getUi()

  if (checkGroupMembership() === true && showAlert(
    "📂 Archive Completed Tasks",`You are about to "archive" the completed task colums on the active sheet [${activeSheet.getName()}].
    Are you sure you want to continue?`,
    ui.ButtonSet.OK_CANCEL) === ui.Button.OK)
    {
      passedTasksArchive()

      showAlert(
    "📂 Archive Completed Tasks",`Completed Tasks on sheet [${activeSheet.getName()}] should now be "Archived" on the right side of the "${PASSED_TASKS_COLUMN_HEADER}" column.`,
    ui.ButtonSet.OK)
    }
  else {return}
}

function showDocumentation()
{
  let title = "📚 Documentation"

  var documentationMessage = HtmlService.createHtmlOutput(`<p style="
    color: #3c4043;
    line-height: 1.4em;
    word-wrap: break-word;
    font-weight: 400;
    font-size: 14px;
    font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    margin: 0
    overflow: auto;">
    You can find the documentation <a href="${DOCUMENTATION_LINK}"target="_blank">here</a>.</p>`).setWidth(400).setHeight(60)

    SpreadsheetApp.getUi().showModalDialog(documentationMessage, title)
}