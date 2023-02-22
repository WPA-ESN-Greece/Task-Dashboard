function sectionsTasks() {
  
 var ss = SpreadsheetApp.getActiveSpreadsheet()
 var SectionsSheet = ss.getSheetByName('Sections')
 var sheetName = SectionsSheet.getSheetName()
 

 var EMAIL_TO = 'wpa+dashtest@esngreece.gr'

 var StarRow = 2
 var StartColumn = 4
 var LastRow = 8
 var LastColumn = SectionsSheet.getLastColumn()

 var dataRange = SectionsSheet.getRange(StarRow,StartColumn,LastRow,LastColumn).getValues()


  for(var i=0; i < LastColumn; i++){

    if(dataRange[5][i] == 'Ready to Email'){
      var taskTitle = dataRange[0][i]
      var taskDesciption = dataRange[1][i]
      var taskReferenceLink = dataRange[2][i]
      var taskContactPerson = dataRange[3][i]
      var taskDeadline = Utilities.formatDate(dataRange[4][i],"Europe/Athens", "dd/MM/yyyy") 
      var taskDaysLeft = dataRange[6][i]

      var setColumn = i + StartColumn

      var Subject = `New Task reported in Dashboard for ${sheetName}: ${taskTitle}`

      var message = `
        <p><b>Task: </b>${taskTitle}</p>
        <p><b>Task Description: </b>${taskDesciption}</p>
        <p><b>Reference: </b> ${taskReferenceLink} </p>
        <p><b>Contact Person: </b> ${taskContactPerson} </p>
        <p><b>Deadline: </b> ${taskDeadline} </p>
        <p><b>Days Left: </b> ${taskDaysLeft} </p>`

      MailApp.sendEmail({
        to: EMAIL_TO,
        cc: "",
        subject: Subject,
        htmlBody: message,
      })
      Logger.log(message)

      SectionsSheet.getRange(7, setColumn).setValue("Email Sent")
    }

  }

}
