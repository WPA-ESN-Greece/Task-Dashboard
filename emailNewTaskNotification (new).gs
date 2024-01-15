

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
  Logger.log(`Currently on ${sheetName} sheet.`)

  // Gets a specific sheet on a given name.
  let sheet = ss.getSheetByName(sheetName)
  //sheet.activate()

  // Gets a matrix of the tasks details until the completed tasks column.
  let tasksDetails = getTasksDetails(sheetName) 
    //Logger.log("tasksDetails: ")
    //Logger.log(tasksDetails)

  // Gets a matrix of the tasks statuses until the completed tasks column.
  let tasksStatuses = getTasksStatuses(sheetName) 
    //Logger.log("tasksStatuses: ")
    //Logger.log(tasksStatuses)

  // Gets an array of email addresses of the active sheet's assignees.
  let assigneesEmails =  getMatrixColumn(sheet.getRange(EMAIL_RANGE).getValues(), 0)
    //Logger.log("assigneesEmails: ")
    //Logger.log(assigneesEmails)

  // This for loop goes through every task column until the completed tasks one. The i marks the column's index. 
  for (var i = 0; i <= tasksDetails[0].length; i++)
  {
    Logger.log("i = " + i)

    // An array that checks if ALL the required task details are NOT empty. Returns true or false. Required fields are the ones with the red asterisk * in the Spreadsheet.
    let taskValuesRequirementsArrayIsTrue = [tasksDetails[0][i], tasksDetails[3][i], tasksDetails[4][i], tasksDetails[5][i], tasksDetails[6][i]].every(element => element != "")
    
    switch (tasksDetails[6][i] === READY_TO_EMAIL)
    {
      case true:
        if (taskValuesRequirementsArrayIsTrue === true)
        {
          // Task Javascript Object that maps the tasksDetails matrix values to more human-readable variables. 
            taskObj.title = tasksDetails[0][i]
            taskObj.description = tasksDetails[1][i]
            taskObj.reference = tasksDetails[2][i]
            taskObj.referenceURL = tasksDetails[9][i]
            taskObj.conatctPerson = tasksDetails[3][i]
            taskObj.priotiry = tasksDetails[4][i]
            taskObj.deadLine = Utilities.formatDate(tasksDetails[5][i], TIMEZONE, "dd/MM/yyyy")
            taskObj.daysLeft = tasksDetails[7][i]

          // Gets an array of assignees' email addresses that the current task is neither 'Not Applicable' nor 'Done'.
          let bccRecipients = checkRecipientsEmail(tasksStatuses, i, assigneesEmails)

          // New Task Email Notification Variables
          let newTaskMessage = `
          <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
          <p><b>Priority: </b><b>${taskObj.priotiry}</b></p>
          <p>${taskObj.description}</p>
          <p><b>🔗 Reference: </b><a href="${taskObj.referenceURL}">${taskObj.reference}</a></p>
          <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
          <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
          <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
          <p>Check it out 👉 <a href="${getSheetURL(sheetName)}">Dashboard/ ${sheetName}</a> so you can add it to your To-Do ✨</p>
          `//message end
          
          Logger.log(`Goingi to email this task: ${taskObj.title}`)
          Logger.log(`Sending email as bcc to ${bccRecipients} ...`)

          MailApp.sendEmail
            ({
              to: "",
              cc: "",
              bcc: bccRecipients.join(),
              subject: `New Task reported in Dashboard for ${sheetName}`,
              htmlBody: newTaskMessage,
              name: "⚠️ Dashboard New Task ⚠️"
            })

            // Updates Notification Status Value from "Email Ready" to "Email Sent".
            let notificationStatusValueCELL_RangeA1 = sheet.getRange(Task_Start_Row + 6, Task_Start_Column + i).getA1Notation()
            sheet.getRange(notificationStatusValueCELL_RangeA1.toString()).setValue(EMAIL_SENT)
            Logger.log(`Cell ${notificationStatusValueCELL_RangeA1} value was set to ${EMAIL_SENT}.`)
        }
      break;

      default:
        Logger.log("Nothing to email.")
    }

  }

  Logger.log(`Leaving ${sheetName} sheet.`)
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
  Logger.log(taskStatusesValuesArray)
  
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
