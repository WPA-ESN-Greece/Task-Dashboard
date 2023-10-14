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
  Logger.log("Sheet: " + sheetName)
  var sheet = ss.getSheetByName(sheetName)

  //Search for the "Completed Tasks" Colimn Index.
    var firstRowValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var passedTasksColumnIndex = findArrayIndexOfText(firstRowValues, PASSED_TASKS_COLUMN_HEADER)

  var taskLastColumn = passedTasksColumnIndex - 1 

  var columnRange = taskLastColumn - Task_Start_Column + 1

  // Checks if there are no tasks in current sheet and if there're not, it ends the function.
  if (columnRange == Task_Start_Column) 
  {
    Logger.log("No tasks in this sheet. Exiting Sheet: " + sheetName)
    return
  }

  var tasksRange = sheet.getRange(Task_Start_Row, Task_Start_Column, Task_Row_Range, columnRange)

  var tasksValues = tasksRange.getValues()
  var taskUrlValue = sheet.getRange(Task_Start_Row + 2, Task_Start_Column, 1, columnRange).getRichTextValues()

  var emailsValues = sheet.getRange(EMAIL_RANGE).getValues().filter(n => n != "")

  var emailAddresses = []

  for (var i = 0; i < emailsValues.length; i++)
  {
    emailAddresses.push(emailsValues[i][0])
  }

  var taskStatusValues = sheet.getRange(Task_Status_Start_Row, Task_Start_Column, Task_Status_Row_Range, columnRange).getValues()
  
  //Horizontal Loop
  for (var col = 0; col < columnRange; col++) 
  {
    Logger.log("Column " + col ) 


    if (tasksValues[0][col] == "" && tasksValues[4][col] === TASK_PRIORITY_LOW || tasksValues[4][col] == "" || tasksValues[5][col] == "") {}
    else
    {
      //Vertical Values
      for (var i = 0; i < Task_Row_Range; i++) 
      {
        Logger.log("taskStatusValues[i][col] is " + taskStatusValues[i][col])

        //Task object
          taskObj.title = tasksValues[0][col]
          taskObj.description = tasksValues[1][col]
          taskObj.reference = taskUrlValue[0][col].getText()
          taskObj.url = taskUrlValue[0][col].getLinkUrl()
          taskObj.conatctPerson = tasksValues[3][col]
          taskObj.priotiry = tasksValues[4][col]
          taskObj.deadLine = Utilities.formatDate(tasksValues[5][col], "Europe/Athens", "dd/MM/yyyy")
          taskObj.daysLeft = tasksValues[7][col]

        //Critical Priority
        if (!(taskStatusValues[i][col] === TASK_DONE) && taskObj.priotiry === TASK_PRIORITY_CRITICAL) 
        {
          var sheetSections = ss.getSheetByName(SECTIONS_SHEET_NAME)
          var sectionEmailsValues = sheetSections.getRange(EMAIL_RANGE).getValues().filter(n => n != "")
          var sectionEmailAddresses = []
          
          for (var j = 0; j < sectionEmailsValues.length; j++)
          {
            sectionEmailAddresses.push(sectionEmailsValues[j][0])
          }

          Logger.log(i + " i : " + taskStatusValues[i][col])
          Logger.log("Send Reminder to: " + sectionEmailAddresses[i])
          
          var message = `
          <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
          <p><b>Priority: ❗ </b><b>${taskObj.priotiry}</b></p>
          <p>${taskObj.description}</p>
          <p><b>🔗 Reference: </b><a href="${taskObj.url}">${taskObj.reference}</a></p>
          <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
          <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
          <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
          <p>Oh! You have completed this task? Mark it as '${TASK_DONE}' in the <a href="${getSheetURL(sheetName)}">Dashboard/ ${sheetName}</a> so we know 🙏</p>
          `//message end

          var subject = "🎗Reminder for Task in Dashboard for " + sheetName
          var senderName = "⚠️ Dashboard Reminder ⚠️"
          var recipient = sectionEmailAddresses[i]

          MailApp.sendEmail
          ({
            to: recipient,
            cc: "",
            subject: subject,
            htmlBody: message,
            name: senderName
          })

        }
        //High Priority
        else if (taskObj.priotiry === TASK_PRIORITY_HIGH && taskObj.daysLeft >= 0 && (taskObj.daysLeft < 3 || taskObj.daysLeft === 7) && !(taskStatusValues[i][col] === TASK_DONE || taskStatusValues[i][col] === TASK_NOT_APPLICABLE))
        {
          Logger.log(i + " i : " + taskStatusValues[i][col])
          Logger.log("Send Reminder to: " + emailAddresses[i])
          
          var message = `
          <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
          <p><b>Priority: </b><b>${taskObj.priotiry}</b></p>
          <p>${taskObj.description}</p>
          <p><b>🔗 Reference: </b><a href="${taskObj.url}">${taskObj.reference}</a></p>
          <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
          <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
          <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
          <p>Oh! You have completed this task? Mark it as '${TASK_DONE}' in the <a href="${getSheetURL(sheetName)}">Dashboard/ ${sheetName}</a> so we know 🙏</p>
          `//message end

          var subject = "🎗Reminder for Task in Dashboard for " + sheetName
          var senderName = "⚠️ Dashboard Reminder ⚠️"
          var recipient = emailAddresses[i]

          MailApp.sendEmail
          ({
            to: "wpa+sections@esngreece.gr", //recipient,
            cc: "",
            subject: subject,
            htmlBody: message,
            name: senderName
          })
        }
        //else if (taskStatusValues[i][col] === TASK_DONE || taskStatusValues[i][col] === TASK_NOT_APPLICABLE) {} // || taskStatusValues[i][col] === TASK_STUCK
        
        //Medium priority
        else if (taskObj.priotiry === TASK_PRIORITY_MEDIUM && taskObj.daysLeft >= 0 && taskObj.daysLeft < 2 && !(taskStatusValues[i][col] === TASK_DONE || taskStatusValues[i][col] === TASK_NOT_APPLICABLE))
        {
          Logger.log(i + " i : " + taskStatusValues[i][col])
          Logger.log("Send Reminder to: " + emailAddresses[i])
          
          var message = `
          <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
          <p><b>Priority: </b><b>${taskObj.priotiry}</b></p>
          <p>${taskObj.description}</p>
          <p><b>🔗 Reference: </b><a href="${taskObj.url}">${taskObj.reference}</a></p>
          <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
          <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
          <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
          <p>Oh! You have completed this task? Mark it as '${TASK_DONE}' in the <a href="${getSheetURL(sheetName)}">Dashboard/ ${sheetName}</a> so we know 🙏</p>
          `//message end

          var subject = "🎗Reminder for Task in Dashboard for " + sheetName
          var senderName = "⚠️ Dashboard Reminder ⚠️"
          var recipient = emailAddresses[i]

          MailApp.sendEmail
          ({
            to: recipient,
            cc: "",
            subject: subject,
            htmlBody: message,
            name: senderName
          })
        }
      }

      Logger.log("Going to next Column")
    }
    Logger.log("No task")
  }
  Logger.log("Exiting Sheet: " + sheetName)
}