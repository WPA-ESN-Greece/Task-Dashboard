// A function that moves passed tasks column after the "Passed tasks" column
function passedTasksArchiveN()
{
  //Gets Todays Date.
  var currentDate = new Date()

  var startRow = Task_Start_Row //2
  var endRow = Task_Status_Last_Row //28
  var rowRange = endRow - startRow + 1
  var startColumn = Task_Start_Column //5
  var taskLastColumn = activeSheet.getLastColumn()
  

  var columnRange = taskLastColumn - Task_Start_Column + 1
  
  //Search for the "Passed Tasks" Colimn Index.
  var searchText = PASSED_TASKS_COLUMN_HEADER
  var firstRowValues = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0]
  
  var passedTasksColumnIndex = findArrayIndexOfText(firstRowValues, searchText)
  var destinationColumnIndex = passedTasksColumnIndex + 1

  var Data = activeSheet.getRange(Task_Start_Row, Task_Start_Column, rowRange, columnRange).getValues()


  //Calculates the Days left with Dates from the Sheet and push them in an array. 
  var daysLeftArrayCalc = activeSheet.getRange(startRow + 4, startColumn, 1, columnRange - 1).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate)
  {
    var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
    var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
    return Number(differenceInDays)+1
  })
  Logger.log("Days Left Calc Array: " + daysLeftArrayCalc)

  //Days Left as seen on Sheet.
  var daysLeftArrayFromSheet = activeSheet.getRange(startRow + 6, startColumn, 1, columnRange - 1).getValues().flat()
  Logger.log("Days left on sheet: " + daysLeftArrayFromSheet)

 

  var currentTaskStatuses = []
  var taskIsDone = false

  for (let i = 0; i < passedTasksColumnIndex; i++) //i is for Columns. Data[Row][Col]
  {
    
    for (let j = Task_Status_Start_Row - Task_Start_Row; j < Task_Status_Last_Row - 1; j++) //Task_Status_Row_Range
    {
      
      currentTaskStatuses.push(Data[j][i])
      taskIsDone = currentTaskStatuses.every(element => element === TASK_DONE || element === TASK_NOT_APPLICABLE)
    }

    if ((daysLeftArrayCalc[i] < 0) && (daysLeftArrayFromSheet[i] === PASSED) && taskIsDone === true)
    {
      Logger.log("WE DID IT!")
      
      var currentColumn = daysLeftArrayCalc.findIndex(
        function(cellValue) 
        {
          return cellValue === daysLeftArrayCalc[i]
        }) + Task_Start_Column
        
      Logger.log("------ Current Column: " + currentColumn)
      Logger.log("------ Destination Column: " + destinationColumnIndex)

      var columnToMoveRange = activeSheet.getRange(Task_Start_Row, currentColumn, rowRange, 1)

      //if (currentColumn === destinationColumnIndex) {return} // to avoid an error.

      activeSheet.moveColumns(columnToMoveRange, destinationColumnIndex)
      
    }
    else{Logger.log("WE DIDNT DO IT 😔")}
    
    Logger.log(currentTaskStatuses)
    
    //Reset the array.
    var currentTaskStatuses = []

    //Search for the new index of the "Passed Tasks" Column.
    passedTasksColumnIndex = findArrayIndexOfText(firstRowValues, searchText)
    destinationColumnIndex = passedTasksColumnIndex + 1
    daysLeftArrayFromSheet = activeSheet.getRange(startRow + 6, startColumn, 1, columnRange - 1).getValues().flat()
    daysLeftArrayCalc = activeSheet.getRange(startRow + 4, startColumn, 1, columnRange - 1).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate)
    {
      var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
      var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
      return Number(differenceInDays)+1
    })
  }

  
  Logger.log("currentTaskStatuses: " + currentTaskStatuses)
  Logger.log("taskIsDone: " + taskIsDone)

  


}