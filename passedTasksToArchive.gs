// A function that moves passed tasks column after the "Passed tasks" column
function passedTasksArchive()
{
  var activeSheet = ss.getActiveSheet()
  var currentDate = new Date()

  var startRow = Task_Start_Row //2
  var endRow = Task_Status_Last_Row //28
  var rowRange = endRow - startRow
  var startColumn = Task_Start_Column //5
  var taskLastColumn = activeSheet.getLastColumn()

  var searchText = PASSED_TASKS_COLUMN_HEADER
  var firstRowValues = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0]
  var passedTasksColumnIndex = firstRowValues.findIndex(function(cellValue) 
  {
    return cellValue === searchText;
  }) + 1; // Adding 1 to convert from 0-based index to 1-based index

  //Calculates the index of the column left of "Passed Tasks".
  var columnRange = taskLastColumn - Task_Start_Column + 1 //- passedTasksColumnIndex 
  Logger.log("columnRange " + columnRange + ". taskLastColumn " + taskLastColumn)

  //Days left array 
  var daysLeftArray = activeSheet.getRange(startRow + 4, startColumn, 1, columnRange - 1).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate)
  {
    var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
    var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
    return Number(differenceInDays)+1
  })

  var daysLeftArray2 = activeSheet.getRange(startRow + 6, startColumn, 1, columnRange - 1).getValues().flat()
  //var daysLeftArray2 = activeSheet.getRange(startRow + 6, startColumn, 1, columnRange - 1).getValues().flat()
  
  Logger.log(daysLeftArray + " daysLeftArray")
  
  for (let i = 0; i < passedTasksColumnIndex; i++)
  { 
    Logger.log(daysLeftArray[i] + " daysLeftArray[i]")

    if ((daysLeftArray[i] < 0) && (daysLeftArray2[i] === PASSED))
    {
      Logger.log(daysLeftArray[i] + " Days left")

      var currentColumn = daysLeftArray.findIndex(function(cellValue) {
      return cellValue === daysLeftArray[i];
      }) + startColumn

      Logger.log(passedTasksColumnIndex + 1)
      activeSheet.moveColumns(activeSheet.getRange(startRow, currentColumn, rowRange, 1), passedTasksColumnIndex + 1)
      
      Logger.log(activeSheet.getRange(startRow, currentColumn, rowRange, 1).getA1Notation())
    }
  }
}