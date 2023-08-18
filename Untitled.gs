function myFunction() {
  
  
  var sheet = activeSheet
  
  var searchText = PASSED_TASKS_COLUMN_HEADER
  var firstRowValues = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0]
  var passedTasksColumnIndex = firstRowValues.findIndex(function(cellValue) 
  {
    return cellValue === searchText;
  }) + 1

  var taskLastColumn = sheet.getLastColumn() 
  //Calculates the index of the column left of "Passed Tasks".
  var columnRange = taskLastColumn - Task_Start_Column - passedTasksColumnIndex 
  var taskStatusValues = sheet.getRange(Task_Status_Start_Row, Task_Start_Column, Task_Status_Row_Range, columnRange).getValues()

  Logger.log(taskStatusValues)
  
  var flatTaskStatusValues = []

  for (var i = 0; i < taskStatusValues[0].length; i++)
  {
    flatTaskStatusValues.push(taskStatusValues[i][0])
  }
  
  
  Logger.log(flatTaskStatusValues.concat(...taskStatusValues))
}
 