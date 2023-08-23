function dailyEmailReminder(sheetName)
{
  //var sheetName = WPAS_SHEET_NAME
  Logger.log("Sheet: " + sheetName)
  var sheet = ss.getSheetByName(sheetName)

  //Search for the "Completed Tasks" Colimn Index.
    var firstRowValues = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0]
    var passedTasksColumnIndex = findArrayIndexOfText(firstRowValues, PASSED_TASKS_COLUMN_HEADER)

  var taskLastColumn = passedTasksColumnIndex - 1  //sheet.getLastColumn()

  var columnRange = taskLastColumn - Task_Start_Column + 1

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
    Logger.log("Column " + col ) //Logger.log("Column " + col + Task_Start_Column)

    if (tasksValues[0][col] != "")
    {
      //Vertical Values
      for (var i = 0; i < Task_Row_Range; i++) 
      {
        //Logger.log("i is " + i + ".col is " + col)
        Logger.log("taskStatusValues[i][col] is " + taskStatusValues[i][col])

        if (taskStatusValues[i][col] === TASK_DONE || taskStatusValues[i][col] === TASK_NOT_APPLICABLE) {}
        //else if (taskStatusValues[i][col] == TASK_NOT_APPLICABLE) {}
        else
        {
          Logger.log("Days Left: " + tasksValues[6][col])
          
          //Task object
            taskObj.title = tasksValues[0][col]
            taskObj.description = tasksValues[1][col]
            taskObj.reference = taskUrlValue[0][col].getText()
            taskObj.url = taskUrlValue[0][col].getLinkUrl()
            taskObj.conatctPerson = tasksValues[3][col]
            taskObj.priotiry = tasksValues[4][col]
            taskObj.deadLine = Utilities.formatDate(tasksValues[5][col], "Europe/Athens", "dd/MM/yyyy")
            taskObj.daysLeft = tasksValues[7][col]

          if (taskObj.daysLeft >= 0 && taskObj.daysLeft < 4 || taskObj.daysLeft === PASSED) 
          {
            Logger.log(i + " i : " + taskStatusValues[i][col])
            Logger.log("Send Reminder to: " + emailAddresses[i])

            //Task object
            /*
            taskObj.title = tasksValues[0][col]
            taskObj.description = tasksValues[1][col]
            taskObj.reference = taskUrlValue[0][col].getText()
            taskObj.url = taskUrlValue[0][col].getLinkUrl()
            taskObj.conatctPerson = tasksValues[3][col]
            taskObj.priotiry = tasksValues[4][col]
            taskObj.deadLine = Utilities.formatDate(tasksValues[5][col], "Europe/Athens", "dd/MM/yyyy")
            taskObj.daysLeft = tasksValues[7][col]*/
            
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
        }
      }

      Logger.log("Going to next Column")
    }
    Logger.log("No task")
  }
  Logger.log("Exiting Sheet: " + sheetName)
}