function dailyEmailReminder(sheetName){

var sheetName = "Sections"
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

var emailsValues = Sheet.getRange('B10:B31').getValues().filter(n => n != "")

var emailAddresses = []

for (var i = 0; i < emailsValues.length; i++) {

  emailAddresses.push(emailsValues[i][0])

}

//Task Status Range 
var StartRowStatus = 10
var LastRowStatus = 31
var RowRangeStatus = LastRowStatus - StartRowStatus

var StatusValues = Sheet.getRange(StartRowStatus, StartColumn, RowRangeStatus, ColumnRange).getValues()

//Horizontal Loop
for (var col = 0; col < ColumnRange; col++) {

  Logger.log("Column " + col)

  if (TasksValues[0][col] != "")
  {
    //Vertical Values
    for (var i = 0; i < emailsValues.length; i++) 
    {
      
      if (StatusValues[i][col] == "Done ✅") {}
      else if (StatusValues[i][col] == "Not Applicable") {}
      else
      {
        Logger.log("Days Left: " + TasksValues[6][col])
        if (TasksValues[6][col] >= 0 && TasksValues[6][col] < 4) 
        {
          Logger.log(i + " i : " + StatusValues[i][col])
          Logger.log("Send Reminder to: " + emailAddresses[i])

          //Task object
          taskObj.title = TasksValues[0][col]
          taskObj.description = TasksValues[1][col]
          taskObj.reference = TaskUrlValue[0][col].getText()
          taskObj.url = TaskUrlValue[0][col].getLinkUrl()
          taskObj.conatctPerson = TasksValues[3][col]
          taskObj.deadLine = Utilities.formatDate(TasksValues[4][col], "Europe/Athens", "dd/MM/yyyy")
          taskObj.daysLeft = TasksValues[6][col]

          
          var message = `
          <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
          <p>${taskObj.description}</p>
          <p><b>🔗 Reference: </b><a href="${taskObj.url}">${taskObj.reference}</a></p>
          <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
          <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
          <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
          `//message end

          var SUBJECT = "🎗Reminder for Task in Dashboard for " + sheetName
          var RECIPIENT = emailAddresses[i]

          MailApp.sendEmail
          ({

            to: "wpa+sections@esngreece.gr", //RECIPIENT,
            cc: "",
            subject: SUBJECT,
            htmlBody: message,

          })
        }
      }
    }

    Logger.log("Going to next Column")
  }
  Logger.log("No task")
}
}