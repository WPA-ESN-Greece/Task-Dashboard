function newTaskEmailTo(sheetName, emailAddress) 
{
  var sheet = ss.getSheetByName(sheetName)

  var taskLastColumn = sheet.getLastColumn()
  var taskColumnRange = taskLastColumn - Task_Start_Column + 1
  var tasksRange = sheet.getRange(Task_Start_Row, Task_Start_Column, Task_Row_Range, taskColumnRange)

  var tasksValues = tasksRange.getValues()
  var taskUrlValue = sheet.getRange(4, Task_Start_Column, 1, taskColumnRange).getRichTextValues()

  for (var i = 0; i < taskColumnRange + 1; i++)
  {
    if (tasksValues[6][i] === READY_TO_EMAIL && tasksValues[0][i] != "") 
    {
      taskObj.title = tasksValues[0][i]
      taskObj.description = tasksValues[1][i]
      taskObj.reference = taskUrlValue[0][i].getText()
      taskObj.url = taskUrlValue[0][i].getLinkUrl()
      taskObj.conatctPerson = tasksValues[3][i]
      taskObj.priotiry = tasksValues[4][i]
      taskObj.deadLine = Utilities.formatDate(tasksValues[5][i], "Europe/Athens", "dd/MM/yyyy")
      taskObj.daysLeft = tasksValues[7][i]

      var subject = "New Task reported in Dashboard for " + sheetName
      var senderName = "⚠️ Dashboard New Task ⚠️"

      var message = `
      <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
      <p><b>Priority: </b><b>${taskObj.priotiry}</b></p>
      <p>${taskObj.description}</p>
      <p><b>🔗 Reference: </b><a href="${taskObj.url}">${taskObj.reference}</a></p>
      <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
      <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
      <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
      <p>Check it out 👉 <a href="${getSheetURL(sheetName)}">Dashboard/ ${sheetName}</a> so you can add it to your To-Do ✨</p>
      `//message end

      Logger.log("Sending email")

      MailApp.sendEmail
        ({
          to: emailAddress,
          cc: "",
          subject: subject,
          htmlBody: message,
          name: senderName
        })

        //Updates Notification Status Value from "Email Ready" to "Email Sent".
        sheet.getRange(Task_Start_Row + 6,Task_Start_Column + i).setValue(EMAIL_SENT)
    }
  }
}
