var ss = SpreadsheetApp.getActiveSpreadsheet()
var SectionsSheet = ss.getSheetByName('Sections')


//Task Object
var taskObj = 
{
  title:"",
  description:"",
  reference: {
    url:""
  },
  conatctPerson:"",
  deadLine:"",
  daysLeft:""
}


function emailTo(emailAddress, sheetName) 
{

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

  for (var i=0; i < ColumnRange + 1; i++)
  {
    if (TasksValues[5][i] == "Ready to Email")
    {
      
      taskObj.title = TasksValues[0][i]
      taskObj.description = TasksValues[1][i]
      taskObj.reference = TaskUrlValue[0][i].getText()
      taskObj.reference.url = TaskUrlValue[0][i].getLinkUrl()
      taskObj.conatctPerson = TasksValues[3][i]
      taskObj.deadLine = Utilities.formatDate(TasksValues[4][i],"Europe/Athens", "dd/MM/yyyy")
      taskObj.daysLeft = TasksValues[6][i]


      var message = `
      <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
      <p>${taskObj.description}</p>
      <p><b>🔗 Reference: </b><a href="${TaskUrlValue[0][i].getLinkUrl()}">${taskObj.reference}</a></p>
      <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
      <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
      <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
      `//message end


      MailApp.sendEmail
      ({

        to: emailAddress,
        cc: "",
        subject: SUBJECT,
        htmlBody: message,

      })
    }
  }
}


function reminderEmail(sheetName){

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
  var emailsValues =  Sheet.getRange('B10:B31').getValues().filter(n => n) 
  
  var emailAddresses = []
  for(var i = 0; i < emailsValues.length; i++){

    emailAddresses.push(emailsValues[i])

  }

  var StartRowStatus = 10
  var LastRowStatus = 31
  var RowRangeStatus = LastRowStatus - StartRowStatus

  var StatusValues =  Sheet.getRange(StartRowStatus, StartColumn, RowRangeStatus + 1, ColumnRange).getValues()

  for (var j=0; j< ColumnRange; j++){
      Logger.log(j + " j")
   for (var i=0; i< RowRangeStatus; i++){
      Logger.log(i + " i")
      Logger.log(StatusValues[i][j])
    if (StatusValues[i][j] == "Done ✅") {}
    if (StatusValues[i][j] == "Not Applicable") {}
    if (StatusValues[i][j] == "") {}

    Logger.log(emailAddresses[i])

    for (var i=0; i < ColumnRange + 1; i++)
    {
      if (TasksValues[5][i] == "Ready to Email")
      {
        
        taskObj.title = TasksValues[0][i]
        taskObj.description = TasksValues[1][i]
        taskObj.reference = TaskUrlValue[0][i].getText()
        taskObj.reference.url = TaskUrlValue[0][i].getLinkUrl()
        taskObj.conatctPerson = TasksValues[3][i]
        taskObj.deadLine = Utilities.formatDate(TasksValues[4][i],"Europe/Athens", "dd/MM/yyyy")
        taskObj.daysLeft = TasksValues[6][i]


        var message = `
        <p><b>🔔 To-Do: </b><b>${taskObj.title}</b></p>
        <p>${taskObj.description}</p>
        <p><b>🔗 Reference: </b><a href="${TaskUrlValue[0][i].getLinkUrl()}">${taskObj.reference}</a></p>
        <p><b>👤 Contact Person: </b>${taskObj.conatctPerson}</p>
        <p><b>🆘 Deadline: </b>${taskObj.deadLine}</p>
        <p><b>🔴 Days Left: </b>${taskObj.daysLeft}</p>
        `//message end

        var SUBJECT = "🎗Reminder for Task in Dashboard for " + sheetName

        MailApp.sendEmail
        ({

          to: "wpa+sections@esngreece.gr",
          cc: "",
          subject: SUBJECT,
          htmlBody: message,

        })
      }
    }


  }

 }



}

