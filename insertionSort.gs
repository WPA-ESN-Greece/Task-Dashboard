  //var startRow = 2
  //var endRow = 31
  //var rowRange = endRow - startRow
  //var startColumn = 5
//var activeSheet = ss.getActiveSheet()
  //var lastColumn = activeSheet.getLastColumn()
  //var columnRangeArr = activeSheet.getRange(startRow, startColumn, 1, lastColumn - startColumn).getValues().join().split(',').filter(filterEmpty)

//var columnRange = columnRangeArr.length


function insertionSort()  
{
  var activeSheet = ss.getActiveSheet()

  var startRow = Task_Start_Row //2
  var endRow = Task_Status_Last_Row//31
  var rowRange = endRow - startRow
  var startColumn = Task_Start_Column //5
  
  var lastColumn = activeSheet.getLastColumn()
  var columnRangeArr = activeSheet.getRange(startRow, startColumn, 1, lastColumn - startColumn).getValues().join().split(',').filter(filterEmpty)
  

  var lastColumn = activeSheet.getLastColumn()
  var columnRangeArr = activeSheet.getRange(startRow, startColumn, 1, lastColumn - startColumn).getValues().join().split(',').filter(filterEmpty)

  var columnRange = columnRangeArr.length

  var currentDate = new Date()
  Logger.log(currentDate)
 

  //Days left array for sorting
  var daysLeftArray = activeSheet.getRange(startRow + 4, startColumn, 1, columnRange).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate){

    var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
    var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
    return Number(differenceInDays)+1

  })
  
  Logger.log("Starting array daysLeft: " + daysLeftArray)

  //Logger.log(columnRange)
  for(let i = 1; i < columnRange; i++)
  {
    let key = daysLeftArray[i]

    // Getting i values to memory
        //Task details
        var tempArrayTaski = activeSheet.getRange(startRow, startColumn + i, 4, 1).getRichTextValues()
        
        //Task Deadline and Email Status
        var tempArrayTaskDatei = activeSheet.getRange(startRow + 4, startColumn + i, 2, 1).getValues()

        //Sections Task Status
        var tempArrayTaskStatusi = activeSheet.getRange(startRow + 8, startColumn + i, rowRange - 7, 1).getValues()

    let j = i - 1

    Logger.log("i: " + i + " and key: " + key + " daysLeftArray[j] is " + daysLeftArray[j] + " j is " + j)

    while ((j > -1) && (key < daysLeftArray[j]) ) 
    {

      Logger.log("while started with i: " + i + " and j: " + j)
      Logger.log("key is: " + key + " and daysleft[j]: " + daysLeftArray[j])
      Logger.log("Current Array before swaps: " + daysLeftArray)
      Logger.log("swapping " + daysLeftArray[j] + " with " + key)

      daysLeftArray[j + 1] = daysLeftArray[j]


      // Getting j values to i. Move it to the right

        //Task details
        var tempArrayTask = activeSheet.getRange(startRow, startColumn + j, 4, 1).getRichTextValues()
        activeSheet.getRange(startRow, startColumn + j+1, 4, 1).setRichTextValues(tempArrayTask)

        //Task Deadline and Email Status
        var tempArrayTaskDate = activeSheet.getRange(startRow + 4, startColumn + j, 2, 1).getValues()
        activeSheet.getRange(startRow + 4, startColumn + j+1, 2, 1).setValues(tempArrayTaskDate)

        //Sections Task Status
        var tempArrayTaskStatus = activeSheet.getRange(startRow + 8, startColumn + j, rowRange - 7, 1).getValues()
        activeSheet.getRange(startRow + 8, startColumn + j+1, rowRange - 7, 1).setValues(tempArrayTaskStatus)

      

      j--;

      Logger.log("End of while. New j is: " + j + ". daysLeftArray: " + daysLeftArray)
    }
    
    daysLeftArray[j + 1] = key

    // Getting i values from memory to j. Mobing it to the 
        //Task details
        activeSheet.getRange(startRow, startColumn + j+1, 4, 1).setRichTextValues(tempArrayTaski)

        //Task Deadline and Email Status
        activeSheet.getRange(startRow + 4, startColumn + j+1, 2, 1).setValues(tempArrayTaskDatei)

        //Sections Task Status
        activeSheet.getRange(startRow + 8, startColumn + j+1, rowRange - 7, 1).setValues(tempArrayTaskStatusi)


    Logger.log("Current Array after swaps: " + daysLeftArray)
    Logger.log("After While.")
    Logger.log("daysLeftArray[j + 1]: " + daysLeftArray[j + 1])
    

    daysLeftArray = activeSheet.getRange(startRow + 4, startColumn, 1, columnRange).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate){

      var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
      var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
      return Number(differenceInDays)+1

    })

    //daysLeftArray[j + 1] = key
    Logger.log("after while with i:" + i)
    //var taskDeadLine = activeSheet.getRange(startRow, startColumn, 1, columnRange).getValues()
    Logger.log("After while " + daysLeftArray)

  }
    Logger.log("Final: " + daysLeftArray) 
}


