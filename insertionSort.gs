function insertionSort()  
{
  var activeSheet = ss.getActiveSheet()

  var rowRange = Task_Status_Last_Row - Task_Start_Row

  //Search for the "Completed Tasks" Colimn Index.
    var firstRowValues = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0]
    var passedTasksColumnIndex = findArrayIndexOfText(firstRowValues, PASSED_TASKS_COLUMN_HEADER)

  var lastColumn = passedTasksColumnIndex

  var columnRangeArr = activeSheet.getRange(Task_Start_Row, Task_Start_Column, 1, lastColumn - Task_Start_Column).getValues().join().split(',').filter(filterEmpty)
  
  var columnRangeArr = activeSheet.getRange(Task_Start_Row, Task_Start_Column, 1, lastColumn - Task_Start_Column).getValues().join().split(',').filter(filterEmpty)

  var columnRange = columnRangeArr.length

  var currentDate = new Date()
  Logger.log(currentDate)
 

  //Days left array for sorting
  var daysLeftArray = activeSheet.getRange(Task_Deadlines, Task_Start_Column, 1, columnRange).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate){

    var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
    var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
    return Number(differenceInDays)+1

  })
  
  Logger.log("Starting array daysLeft: " + daysLeftArray)

  //Logger.log(columnRange)
  for(let i = 1; i < columnRange; i++)
  {
    let key = daysLeftArray[i]

    // Getting i values to memory.
        //Task details.
        var tempArrayTaski = activeSheet.getRange(Task_Start_Row, Task_Start_Column + i, 5, 1).getRichTextValues()
        
        //Task Deadline and Email Status..
        var tempArrayTaskDatei = activeSheet.getRange(Task_Deadlines, Task_Start_Column + i, 2, 1).getValues()

        //Task Proof of Completion link.
        var tempArrayTaskProofi = activeSheet.getRange(Task_Proof, Task_Start_Column + i, 1, 1).getRichTextValues()

        //Sections Task Status.
        var tempArrayTaskStatusi = activeSheet.getRange(Task_Status_Start_Row, Task_Start_Column + i, rowRange, 1).getValues()

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

        //Task details up to Priority.
        var tempArrayTask = activeSheet.getRange(Task_Start_Row, Task_Start_Column + j, 5, 1).getRichTextValues()
        activeSheet.getRange(Task_Start_Row, Task_Start_Column + j + 1, 5, 1).setRichTextValues(tempArrayTask)

        //Task Deadline and Email Status.
        var tempArrayTaskDate = activeSheet.getRange(Task_Deadlines, Task_Start_Column + j, 2, 1).getValues()
        activeSheet.getRange(Task_Deadlines, Task_Start_Column + j + 1, 2, 1).setValues(tempArrayTaskDate)

        //Task Proof of Completion link.
        var tempArrayTaskProof = activeSheet.getRange(Task_Proof, Task_Start_Column + j, 1, 1).getRichTextValues()
        activeSheet.getRange(Task_Proof, Task_Start_Column + j + 1, 1, 1).setRichTextValues(tempArrayTaskProof)

        //Sections Task Status
        var tempArrayTaskStatus = activeSheet.getRange(Task_Status_Start_Row, Task_Start_Column + j, rowRange, 1).getValues()
        activeSheet.getRange(Task_Status_Start_Row, Task_Start_Column + j + 1, rowRange, 1).setValues(tempArrayTaskStatus)

      j--;

      Logger.log("End of while. New j is: " + j + ". daysLeftArray: " + daysLeftArray)
    }
    
    daysLeftArray[j + 1] = key

    // Getting i values from memory to j. Mobing it to the 
        //Task details up to Priority.
        activeSheet.getRange(Task_Start_Row, Task_Start_Column + j + 1, 5, 1).setRichTextValues(tempArrayTaski)

        //Task Deadline and Email Status
        activeSheet.getRange(Task_Deadlines, Task_Start_Column + j + 1, 2, 1).setValues(tempArrayTaskDatei)

        //Task Proof of Completion link.
        activeSheet.getRange(Task_Proof, Task_Start_Column + j + 1, 1, 1).setRichTextValues(tempArrayTaskProofi)

        //Sections Task Status
        activeSheet.getRange(Task_Status_Start_Row, Task_Start_Column + j + 1, rowRange, 1).setValues(tempArrayTaskStatusi)


    Logger.log("Current Array after swaps: " + daysLeftArray)
    Logger.log("After While.")
    Logger.log("daysLeftArray[j + 1]: " + daysLeftArray[j + 1])
    

    daysLeftArray = activeSheet.getRange(Task_Deadlines, Task_Start_Column, 1, columnRange).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate){

      var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
      var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
      return Number(differenceInDays)+1

    })
    //daysLeftArray[j + 1] = key
    Logger.log("after while with i:" + i)
    Logger.log("After while " + daysLeftArray)
  }
    Logger.log("Final: " + daysLeftArray) 
}


