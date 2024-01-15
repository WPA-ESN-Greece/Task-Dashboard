

/**
 * Sends email notifications for new tasks that meet specified criteria.
 * Retrieves tasks' data from the specified sheet and sends email notifications
 * for tasks marked as "Email Ready". Updates notification status from "Email Ready" to "Email Sent".
 * Emails are sent to assignees with statuses other than "Done" or "Not Applicable".
 * Assignees' email addresses are added to the BCC list.
 * 
 * @function
 * @name emailNewTaskNotification
 * @memberof module:Spreadsheet
 * 
 * @param {string} sheetName - The name of the sheet containing task details.
 * @throws {Error} Throws an error if the specified sheet is not found.
 *                    The error message includes details about the missing sheet.
 * @returns {void} This function does not return a value.
 */
function emailNewTaskNotification(sheetName)
{
  //var sheetName = "President" // for testing

  Logger.log(`--- Currently on ${sheetName} sheet. ---`)

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
    
    // Checks if the current task's notification status is "Redy to email". If not, skip it. 
    if (!(tasksDetails[6][i] === READY_TO_EMAIL)) {continue;}
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

    // Gets an array of assignees' email addresses that the current task is neither 'Not Applicable' nor 'Done'.
    let bccRecipients = checkRecipientsEmail(tasksStatuses, i, assigneesEmails)

    emailTask(taskObj, bccRecipients.join(), sheetName, "newTask")

    // Updates Notification Status Value from "Email Ready" to "Email Sent".
    let notificationStatusValueCELL_RangeA1 = sheet.getRange(Task_Start_Row + 6, Task_Start_Column + i).getA1Notation()
    sheet.getRange(notificationStatusValueCELL_RangeA1.toString()).setValue(EMAIL_SENT)

    Logger.log(`Cell ${notificationStatusValueCELL_RangeA1} value was set to ${EMAIL_SENT}.`)
  }
  Logger.log(`--- Leaving ${sheetName} sheet. ---`)
}


/**
 *
 * Checks recipients' emails based on task statuses and returns a filtered list of valid emails.
 * 
 * @function
 * @name checkRecipientsEmail
 * @memberof module:Spreadsheet
 * 
 * @param {Array} taskStatusesValues - A two-dimensional array representing the task statuses.
 * @param {number} taskColumnIndex - The index of the column containing the task statuses within the taskStatusesValues array.
 * @param {Array} recipientsEmails - An array of recipients' email addresses.
 * @returns {Array} - A filtered array of valid recipients' email addresses.
 */
function checkRecipientsEmail(taskStatusesValues, taskColumnIndex, recipientsEmails)
{
  let finalRecipientsEmails = []
  let taskStatusesValuesArray = getMatrixColumn(taskStatusesValues, taskColumnIndex)

  for (var j = 0; j < recipientsEmails.length; j++)
  {
    if (!(taskStatusesValuesArray[j] == TASK_NOT_APPLICABLE || taskStatusesValuesArray[j] == TASK_DONE) && recipientsEmails[j])
    {
      finalRecipientsEmails.push(recipientsEmails[j])
    }
  }
  Logger.log("finalRecipientsEmails FINAL: ")
  Logger.log(finalRecipientsEmails)
  return finalRecipientsEmails
}
