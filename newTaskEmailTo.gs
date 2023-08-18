function newTaskEmailTo(sheetName, emailAddress) 
{
  var subject = "New Task reported in Dashboard for " + sheetName

  var sheet = ss.getSheetByName(sheetName)

  //Tasks Range
  //var StartRow = 2
  //var StartColumn = 4
  //var LastRow = 8
  var taskLastColumn = sheet.getLastColumn()

  //var RowRange = LastRow - StartRow + 1
  var taskColumnRange = taskLastColumn - Task_Start_Column + 1

  var tasksRange = sheet.getRange(Task_Start_Row, Task_Start_Column, Task_Row_Range, taskColumnRange)


  var tasksValues = tasksRange.getValues()
  var taskUrlValue = sheet.getRange(4, Task_Start_Column, 1, taskColumnRange).getRichTextValues()

  for (var i = 0; i < taskColumnRange + 1; i++)  //ColumnRange
  {
    if (tasksValues[5][i] === READY_TO_EMAIL && tasksValues[0][i] != "") 
    {
      taskObj.title = tasksValues[0][i]
      taskObj.description = tasksValues[1][i]
      taskObj.reference = taskUrlValue[0][i].getText()
      taskObj.url = taskUrlValue[0][i].getLinkUrl()
      taskObj.conatctPerson = tasksValues[3][i]
      taskObj.deadLine = Utilities.formatDate(tasksValues[4][i], "Europe/Athens", "dd/MM/yyyy")
      taskObj.daysLeft = tasksValues[6][i]


      var message = `
      <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
      <p>${taskObj.description}</p>
      <p><b>🔗 Reference: </b><a href="${taskObj.url}">${taskObj.reference}</a></p>
      <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
      <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
      <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
      `//message end

      Logger.log("Sending email")

      MailApp.sendEmail
        ({
          to: emailAddress,
          cc: "",
          subject: subject,
          htmlBody: message,
          name: "Dashboard New Task"
        })

        //Updates Notification Status Value
        sheet.getRange(7,Task_Start_Column + i).setValue(EMAIL_SENT)
    }
  }
}
