function sortTasks() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var ActiveSheet = ss.getActiveSheet()

  var StartRow = 2
  var StartColumn = 4
  var LastRow = 8
  var LastColumn = SectionsSheet.getLastColumn()

  var RowRange = LastRow - StartRow + 1
  var ColumnRange = LastColumn - StartColumn + 1

  var TasksRange = SectionsSheet.getRange(StartRow, StartColumn, RowRange, ColumnRange)


  var TasksValues = TasksRange.getValues()

  
//https://www.section.io/engineering-education/sorting-algorithms-in-js/

}
