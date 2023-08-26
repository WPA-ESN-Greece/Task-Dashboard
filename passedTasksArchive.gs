// A function that moves passed tasks column after the "Passed tasks" column
/**
 * Moves completed tasks columns after the "Passed tasks" column.
 *
 * This function iterates through the task columns and checks if a task is marked as "Passed" and
 * all related task statuses are "Done" or "Not Applicable". If these conditions are met,
 * the function moves the column containing the completed task after the "Passed tasks" column.
 * This helps in archiving completed tasks in the spreadsheet.
 *
 * @function
 * @name passedTasksArchive
 * @memberof module:Spreadsheet
 * @returns {void} This function does not return a value.
 */
function passedTasksArchive()
{
  var rowRange = Task_Status_Last_Row - Task_Start_Row + 1
  var taskLastColumn = activeSheet.getLastColumn()
  
  var columnRange = taskLastColumn - Task_Start_Column + 1
  
  //Search for the "Completed Tasks" Colimn Index.
  var searchText = PASSED_TASKS_COLUMN_HEADER
  var firstRowValues = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0]
  
  var passedTasksColumnIndex = findArrayIndexOfText(firstRowValues, searchText)
  var destinationColumnIndex = passedTasksColumnIndex + 1

  var Data = activeSheet.getRange(Task_Start_Row, Task_Start_Column, rowRange, columnRange).getValues()

  var currentTaskStatuses = []
  var taskIsDone = false

  for (let i = 0; i < passedTasksColumnIndex; i++) //i is for Columns. Data[Row][Col]
  {
    
    for (let j = Task_Status_Start_Row - Task_Start_Row; j < Task_Status_Last_Row - 1; j++) //Task_Status_Row_Range
    {
      
      currentTaskStatuses.push(Data[j][i])
      taskIsDone = currentTaskStatuses.every(element => element === TASK_DONE || element === TASK_NOT_APPLICABLE)
    }

    if ((Data[7][i] === PASSED) && (taskIsDone === true) && Data[0][i] != "")
    {
      var currentColumn = Data[0].findIndex(
        function(cellValue) 
        {
          return cellValue === Data[0][i]
        }) + Task_Start_Column
        
      Logger.log("------ Current Column: " + currentColumn)
      Logger.log("------ Destination Column: " + destinationColumnIndex)

      var columnToMoveRange = activeSheet.getRange(Task_Start_Row, currentColumn, rowRange, 1)

      if (currentColumn === destinationColumnIndex) {return} // to avoid an error, and prevent an infinity loop on the following recursion.
      else if(currentColumn === destinationColumnIndex - 1)
      {
        passedTasksArchive() //!This is a recursion of the same function.
      }
      else
      {
        activeSheet.moveColumns(columnToMoveRange, destinationColumnIndex)
        Logger.log("WE DID IT!")
      }
      
    }
    
    //Reset the array.
    var currentTaskStatuses = []

    //Search for the new index of the "Passed Tasks" Column.
    passedTasksColumnIndex = findArrayIndexOfText(firstRowValues, searchText)
    destinationColumnIndex = passedTasksColumnIndex + 1
    Data = activeSheet.getRange(Task_Start_Row, Task_Start_Column, rowRange, columnRange).getValues()
  }

  Logger.log("currentTaskStatuses: " + currentTaskStatuses)
  Logger.log("taskIsDone: " + taskIsDone)
}