/**
 * Sends daily email reminders for tasks on the specified sheet.
 *
 * This function sends daily email reminders for tasks on the specified sheet. It checks the status and priority of each task
 * and sends reminders to appropriate recipients based on priority and deadline. The recipients are determined by the
 * email addresses stored in the sheet. The function handles tasks with different priorities, such as critical, high, and medium,
 * and sends reminders accordingly. It also includes task details and links to the task sheet.
 * 
 * @function
 * @name dailyEmailReminder
 * @memberof module:Spreadsheet
 * @param {string} sheetName - The name of the sheet containing the tasks to send reminders for.
 * @returns {void} This function does not return a value.
 */ 
function dailyEmailReminder(sheetName)
{ 
  Logger.log(`--- Currently on ${sheetName} sheet. ---`)

  let currentTaskStatusesColumn

  // Gets a specific sheet on a given name.
  let sheet = ss.getSheetByName(sheetName)
  // Gets a matrix of the tasks details until the completed tasks column.
  let tasksDetails = getTasksDetails(sheetName) 
  // Gets a matrix of the tasks statuses until the completed tasks column.
  let tasksStatuses = getTasksStatuses(sheetName) 
  // Gets an array of email addresses of the active sheet's assignees.
  let assigneesEmails =  getMatrixColumn(sheet.getRange(EMAIL_RANGE).getValues(), 0)

  // This for loop goes through every task column until the completed tasks one. The i marks the column's index. 
  for (var i = 0; i < tasksDetails[0].length; i++)
  {
    Logger.log("i = " + i)

    // An array that checks if ALL the required task details are NOT empty. Returns true or false. Required fields are the ones with the red asterisk * in the Spreadsheet.
    let taskValuesRequirementsArrayIsTrue = [tasksDetails[0][i], tasksDetails[3][i], tasksDetails[4][i], tasksDetails[5][i], tasksDetails[6][i]].every(element => element != "")

    // Checks if the current task meets the prerequisites. If not, skip it. 
    if (taskValuesRequirementsArrayIsTrue === false) {continue;}

    // Task Javascript Object that maps the tasksDetails matrix values to more human-readable variables. 
      taskObj.title = tasksDetails[0][i]
      taskObj.description = tasksDetails[1][i]
      taskObj.reference = tasksDetails[2][i]
      taskObj.referenceURL = tasksDetails[9][i]
      taskObj.conatctPerson = tasksDetails[3][i]
      taskObj.priotiry = tasksDetails[4][i]
      taskObj.deadLine = Utilities.formatDate(tasksDetails[5][i], TIMEZONE, "dd/MM/yyyy")
      taskObj.daysLeft = tasksDetails[7][i]
    //

    // Checks if the current task has any days left until its deadline. If not (the deadline is passed), skip it. 
    if (taskObj.daysLeft === PASSED) {continue;}

    switch (taskObj.priotiry)
    {
      case TASK_PRIORITY_CRITICAL:
        // Goes through the current column. 
        for (var j = 0; j < tasksStatuses.length; j++)
        {
          currentTaskStatusesColumn = getMatrixColumn(tasksStatuses, i)
          
          // If an assignee's status is "Done", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_DONE) {continue;}
          // If an assignee's status is "Not Applicable", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_NOT_APPLICABLE) {continue;}
          // If an assignee's email address is empty in column B, is skiped.
          if (!assigneesEmails[j]) {continue;}
          // The assignee will recive a reminder only if the Days left are either between 0 and 6 OR a multiple of 7. 
          if (!(taskObj.daysLeft < 7 || taskObj.daysLeft % 7 === 0)) {continue;}
          
          emailTask(taskObj, assigneesEmails[j], sheetName, "reminder")

          Logger.log(`Email Task Reminder was sent to ${assigneesEmails[j]}.`)
        }
      break;

      case TASK_PRIORITY_HIGH:
        // Goes through the current column. 
        for (var j = 0; j < tasksStatuses.length; j++)
        {
          currentTaskStatusesColumn = getMatrixColumn(tasksStatuses, i)

          // If an assignee's status is "Done", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_DONE) {continue;}
          // If an assignee's status is "Not Applicable", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_NOT_APPLICABLE) {continue;}
          // If an assignee's email address is empty in column B, is skiped.
          if (!assigneesEmails[j]) {continue;}
          // The assignee will recive a reminder only if the Days left are either between 0 and 3 OR 7. 
          if (!(taskObj.daysLeft < 3 || taskObj.daysLeft == 7)) {continue;}
          
          emailTask(taskObj, assigneesEmails[j], sheetName, "reminder", currentTaskStatusesColumn[j])

          Logger.log(`Email Task Reminder was sent to ${assigneesEmails[j]}.`)
        }
      break;

      case TASK_PRIORITY_MEDIUM:
        // Goes through the current column. 
        for (var j = 0; j < tasksStatuses.length; j++)
        {
          currentTaskStatusesColumn = getMatrixColumn(tasksStatuses, i)
          
          // If an assignee's status is "Done", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_DONE) {continue;}
          // If an assignee's status is "Not Applicable", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_NOT_APPLICABLE) {continue;}
          // If an assignee's email address is empty in column B, is skiped.
          if (!assigneesEmails[j]) {continue;}
          // The assignee will recive a reminder only if the Days left are between 0 and 3. 
          if (!(taskObj.daysLeft < 3)) {continue;}
          
          emailTask(taskObj, assigneesEmails[j], sheetName, "reminder")

          Logger.log(`Email Task Reminder was sent to ${assigneesEmails[j]}.`)
        }
      break;

      case TASK_PRIORITY_LOW:
        // Goes through the current column. 
        for (var j = 0; j < tasksStatuses.length; j++)
        {
          currentTaskStatusesColumn = getMatrixColumn(tasksStatuses, i)
          
          // If an assignee's status is "Done", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_DONE) {continue;}
          // If an assignee's status is "Not Applicable", is skiped.
          if (currentTaskStatusesColumn[j] === TASK_NOT_APPLICABLE) {continue;}
          // If an assignee's email address is empty in column B, is skiped.
          if (!assigneesEmails[j]) {continue;}
          // The assignee will recive a reminder only if the Days left are between 0 and email sent as the notification status. 
          if (!(taskObj.daysLeft == 0 && tasksDetails[6][i] === EMAIL_SENT)) {continue;}
          
          emailTask(taskObj, assigneesEmails[j], sheetName, "reminder")

          Logger.log(`Email Task Reminder was sent to ${assigneesEmails[j]}.`)
        }
      break;

      default:
        Logger.log(`No task that met the prerequisites.`)
    }
  }
    
  Logger.log(`--- Leaving ${sheetName} sheet. ---`)
}
