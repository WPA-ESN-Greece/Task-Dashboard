/**
 * Triggered when the Google Sheets document is opened.
 *
 * This function is executed automatically when the Google Sheets document is opened.
 * It first checks if the current user is a member of specific groups using the `checkGroupMembership`
 * function. If the user is a member, it initializes a custom menu using the `initMenu` function.
 * You can customize the menu initialization process in the `initMenu` function.
 * 
 */
function onOpenTrigggered()
{
  if (checkGroupMembership() === true)
  {
    authPopUp()
    initMenu()
  }
  //initMenu()
}


/**
 * Triggered when an edit is made in the Google Sheets document. (When you change the Notification Status value from the drop-down)
 *
 * This function is executed automatically when any edit is made in the Google Sheets document.
 * It performs specific actions for each section or group, such as sending new task emails.
 * You can customize the actions for each section or group within this function.
 *
 * @function
 * @name onEdit
 * @memberof module:Spreadsheet
 * */
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


/**
 * Performs a daily deadline check and sends email reminders to specific sections or groups.
 *
 * This function is typically scheduled to run daily. It performs a check for deadlines
 * and sends email reminders to specific sections or groups, such as Sections, Presidents, VPs, etc.
 * You can customize the actions for each section or group within this function.
 *
 * @function
 * @name dailyDeadlineCheck
 * @memberof module:Spreadsheet
 */
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


/**
 * Adds a new task column to the active sheet, subject to user confirmation and group membership check.
 *
 * This function first checks if the current user is a member of specific groups using the `checkGroupMembership`
 * function. If the user is a member, it displays a confirmation dialog using the `showAlert` function to ensure
 * the user's intent. If the user confirms the action, it adds a new task column to the left of Column E on the active sheet.
 * If the user cancels or is not a member of the specified groups, the function returns without making any changes.
 *
 * @function
 * @name addNewTask
 * @memberof module:Spreadsheet
 * @returns {void} This function does not return a value.
 */
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


/**
 * Sorts the task columns on the active sheet, subject to user confirmation and group membership check.
 *
 * This function first checks if the current user is a member of specific groups using the `checkGroupMembership`
 * function. If the user is a member, it displays a confirmation dialog using the `showAlert` function to ensure
 * the user's intent. If the user confirms the action, it sorts the task columns on the active sheet using a sorting algorithm,
 * such as insertion sort. After sorting, it displays a success message to the user. If the user cancels or is not a member
 * of the specified groups, the function returns without making any changes.
 *
 * @function
 * @name sortTasks
 * @memberof module:Spreadsheet
 * @returns {void} This function does not return a value.
 */
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


/**
 * Archives completed task columns on the active sheet, subject to user confirmation and group membership check.
 *
 * This function first checks if the current user is a member of specific groups using the `checkGroupMembership`
 * function. If the user is a member, it displays a confirmation dialog using the `showAlert` function to ensure
 * the user's intent. If the user confirms the action, it archives the completed task columns on the active sheet.
 * After archiving, it displays a success message to the user. If the user cancels or is not a member of the specified
 * groups, the function returns without making any changes.
 *
 * @function
 * @name archiveCompletedTasks
 * @memberof module:Spreadsheet
 * @returns {void} This function does not return a value.
 */
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


/**
 * Displays a modal dialog with a link to the documentation.
 *
 * This function creates and displays a modal dialog containing a link to the documentation.
 * Users can click the link to access the documentation in a new browser tab. The title and
 * link to the documentation are customizable through the provided constants.
 *
 * @function
 * @name showDocumentation
 * @memberof module:Spreadsheet
 * @returns {void} This function does not return a value.
 */
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
    You can find the documentation <a href="${DOCUMENTATION_LINK}"target="_blank">here</a>.</p>`)
    .setWidth(400).setHeight(60)

  SpreadsheetApp.getUi().showModalDialog(documentationMessage, title)
}

//Authentication Window
function authPopUp()
{
  var ui = SpreadsheetApp.getUi()

  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL)
  let authStatus = authInfo.getAuthorizationStatus()

  Logger.log("authStatus " + authStatus)

  if (authStatus === ScriptApp.AuthorizationStatus.REQUIRED)
  {
    var authUrl = authInfo.getAuthorizationUrl()
    
    var message = HtmlService.createHtmlOutput(`<p style="font-family: 'Open Sans'">Authenticate your script.<a href="${authUrl}" target="_blank">here</a></p>`).setWidth(400).setHeight(60)
    ui.showModalDialog(message,"Authentication")

  }
}