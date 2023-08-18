function dailyEmailReminder(sheetName)
{
  var sheet = ss.getSheetByName(sheetName)

  //var startRow = TaskStartRow //2
  //var StartColumn = taskStartColumn//4 TaskStartColumn
  //var LastRow = taskLastRow//8 TaskLastRow
  var taskLastColumn = sheet.getLastColumn()

  //var TaskRowRange = TaskLastRow - TaskStartRow + 1
  var columnRange = taskLastColumn - Task_Start_Column + 1

  var tasksRange = sheet.getRange(Task_Start_Row, Task_Start_Column, Task_Row_Range, columnRange)

  var tasksValues = tasksRange.getValues()
  var taskUrlValue = sheet.getRange(4, Task_Start_Column, 1, columnRange).getRichTextValues()

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
    Logger.log("Column " + col)

    if (tasksValues[0][col] != "")
    {
      //Vertical Values
      for (var i = 0; i < emailsValues.length; i++) 
      {
        
        if (taskStatusValues[i][col] === TASK_DONE || taskStatusValues[i][col] === TASK_NOT_APPLICABLE) {}
        //else if (taskStatusValues[i][col] == "Not Applicable") {}
        else
        {
          Logger.log("Days Left: " + tasksValues[6][col])
          
          if (tasksValues[6][col] >= 0 && tasksValues[6][col] < 4) 
          {
            Logger.log(i + " i : " + taskStatusValues[i][col])
            Logger.log("Send Reminder to: " + emailAddresses[i])

            //Task object
            taskObj.title = tasksValues[0][col]
            taskObj.description = tasksValues[1][col]
            taskObj.reference = taskUrlValue[0][col].getText()
            taskObj.url = taskUrlValue[0][col].getLinkUrl()
            taskObj.conatctPerson = tasksValues[3][col]
            taskObj.deadLine = Utilities.formatDate(tasksValues[4][col], "Europe/Athens", "dd/MM/yyyy")
            taskObj.daysLeft = tasksValues[6][col]

            
            var message = `
            <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
            <p>${taskObj.description}</p>
            <p><b>🔗 Reference: </b><a href="${taskObj.url}">${taskObj.reference}</a></p>
            <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
            <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
            <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
            `//message end

            var subject = "🎗Reminder for Task in Dashboard for " + sheetName
            var recipient = emailAddresses[i]

            MailApp.sendEmail
            ({
              to: "wpa+sections@esngreece.gr", //recipient,
              cc: "",
              subject: subject,
              htmlBody: message,
              name: "Dashboard Reminder"
            })
          }
        }
      }

      Logger.log("Going to next Column")
    }
    Logger.log("No task")
  }
}