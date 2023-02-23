function newTaskEmailTo(sheetName, emailAddress) {

  var SUBJECT = "New Task reported in Dashboard for " + sheetName

  var Sheet = ss.getSheetByName(sheetName)

  var StartRow = 2
  var StartColumn = 4
  var LastRow = 8
  var LastColumn = Sheet.getLastColumn()

  var RowRange = LastRow - StartRow + 1
  var ColumnRange = LastColumn - StartColumn + 1

  var TasksRange = Sheet.getRange(StartRow, StartColumn, RowRange, ColumnRange)


  var TasksValues = TasksRange.getValues()
  var TaskUrlValue = Sheet.getRange(4, StartColumn, 1, ColumnRange).getRichTextValues()

  for (var i = 0; i < ColumnRange + 1; i++) {
    if (TasksValues[5][i] == "Ready to Email") {

      taskObj.title = TasksValues[0][i]
      taskObj.description = TasksValues[1][i]
      taskObj.reference = TaskUrlValue[0][i].getText()
      taskObj.url = TaskUrlValue[0][i].getLinkUrl()
      taskObj.conatctPerson = TasksValues[3][i]
      taskObj.deadLine = Utilities.formatDate(TasksValues[4][i], "Europe/Athens", "dd/MM/yyyy")
      taskObj.daysLeft = TasksValues[6][i]


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
          subject: SUBJECT,
          htmlBody: message,

        })

        //Updates Notification Status Value
        Sheet.getRange(7,StartColumn + i).setValue("Email Sent")
    }
  }
}
