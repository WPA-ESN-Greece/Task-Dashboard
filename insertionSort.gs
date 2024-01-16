/**
 * Sorts tasks on the active sheet using the insertion sort algorithm.
 *
 * This function sorts tasks based on their priority and deadline in ascending order.
 * It uses the insertion sort algorithm to rearrange the tasks within the active sheet.
 * The sorting criteria are priority and deadline, with higher priority tasks and tasks with
 * earlier deadlines appearing first. The function updates the sheet with the sorted tasks.
 *
 * @function
 * @name insertionSort
 * @memberof module:Spreadsheet
 * @returns {void} This function does not return a value.
 */
function insertionSort()  
{
  Logger.log(`--- Insertion sort starts in ${activeSheet.getName()} sheet ---`)

  // Calculates the Row Range for task details AND task statuses. 
  let rowRange = CurrentSheetData(sheetName).task_Status_Last_Row - Task_Start_Row 
  // Gets the "Completed Tasks" Colimn Index.
  let passedTasksColumnIndex = CurrentSheetData(sheetName).passedTasksColumnIndex
  // Gets the number of Task rows that have a Task tittle. 
  let columnRange =  (activeSheet.getRange(Task_Start_Row, Task_Start_Column, 1, passedTasksColumnIndex - Task_Start_Column).getValues().join().split(',').filter(filterEmpty)).length
  // Gets current Date. 
  let currentDate = new Date()
 
  // Gets all the deadlines till the 'Completed Tasks" column and calulates an independent daysLeftArray (independent from the sheet to avoid errors if the formula breaks). Days left array for sorting. 
  let daysLeftArray = activeSheet.getRange(Task_Deadlines, Task_Start_Column, 1, columnRange).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate)
    {
      var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
      var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
      return Number(differenceInDays) +1
    })
  Logger.log(`Starting daysLeftArray: ${daysLeftArray}`)

  // Insertion Sort Loop. 
  for(let i = 1; i < columnRange; i++)
  {
    // Key is the main value of the daysLeftArray that is compared to the value that came before it (left of the key value). 
    // In any given moment, i is +1 from j. That means daysLeftArray[i] is always the next element of daysLeftArray[j]. 
    let key = daysLeftArray[i]

    // Getting i values to memory. 
        //Task details.
        let tempArrayTaski = activeSheet.getRange(Task_Start_Row, Task_Start_Column + i, 5, 1).getRichTextValues()
        //Task Deadline and Email Status..
        let tempArrayTaskDatei = activeSheet.getRange(Task_Deadlines, Task_Start_Column + i, 2, 1).getValues()
        //Task Proof of Completion link.
        let tempArrayTaskProofi = activeSheet.getRange(Task_Proof, Task_Start_Column + i, 1, 1).getRichTextValues()
        //Sections Task Status.
        let tempArrayTaskStatusi = activeSheet.getRange(CurrentSheetData(sheetName).task_Status_Start_Row, Task_Start_Column + i, rowRange, 1).getValues()

    let j = i - 1

    Logger.log("i: " + i + " and key: " + key + " daysLeftArray[j] is " + daysLeftArray[j] + " j is " + j)

    while ((j > -1) && (key < daysLeftArray[j]) ) 
    {
      Logger.log("while started with i: " + i + " and j: " + j)
      Logger.log("key is: " + key + " and daysleft[j]: " + daysLeftArray[j])
      Logger.log("Current Array before swaps: " + daysLeftArray)
      Logger.log("swapping " + daysLeftArray[j] + " with " + key)

      daysLeftArray[j + 1] = daysLeftArray[j]

      // Getting j values to i. Move it to the right.
        //Task details up to Priority.
        let tempArrayTask = activeSheet.getRange(Task_Start_Row, Task_Start_Column + j, 5, 1).getRichTextValues()
        activeSheet.getRange(Task_Start_Row, Task_Start_Column + j + 1, 5, 1).setRichTextValues(tempArrayTask)
        //Task Deadline and Email Status.
        let tempArrayTaskDate = activeSheet.getRange(Task_Deadlines, Task_Start_Column + j, 2, 1).getValues()
        activeSheet.getRange(Task_Deadlines, Task_Start_Column + j + 1, 2, 1).setValues(tempArrayTaskDate)
        //Task Proof of Completion link.
        let tempArrayTaskProof = activeSheet.getRange(Task_Proof, Task_Start_Column + j, 1, 1).getRichTextValues()
        activeSheet.getRange(Task_Proof, Task_Start_Column + j + 1, 1, 1).setRichTextValues(tempArrayTaskProof)
        //Sections Task Status
        let tempArrayTaskStatus = activeSheet.getRange(CurrentSheetData(sheetName).task_Status_Start_Row, Task_Start_Column + j, rowRange, 1).getValues()
        activeSheet.getRange(CurrentSheetData(sheetName).task_Status_Start_Row, Task_Start_Column + j + 1, rowRange, 1).setValues(tempArrayTaskStatus)

      j--;

      Logger.log("End of while. New j is: " + j + ". daysLeftArray: " + daysLeftArray)
    }
    
    daysLeftArray[j + 1] = key

    // Getting i values from memory to j. Moving it to the left. 
        //Task details up to Priority.
        activeSheet.getRange(Task_Start_Row, Task_Start_Column + j + 1, 5, 1).setRichTextValues(tempArrayTaski)
        //Task Deadline and Email Status
        activeSheet.getRange(Task_Deadlines, Task_Start_Column + j + 1, 2, 1).setValues(tempArrayTaskDatei)
        //Task Proof of Completion link.
        activeSheet.getRange(Task_Proof, Task_Start_Column + j + 1, 1, 1).setRichTextValues(tempArrayTaskProofi)
        //Sections Task Status
        activeSheet.getRange(CurrentSheetData(sheetName).task_Status_Start_Row, Task_Start_Column + j + 1, rowRange, 1).setValues(tempArrayTaskStatusi)

    Logger.log("Current Array after swaps: " + daysLeftArray)
    Logger.log("After While.")
    Logger.log("daysLeftArray[j + 1]: " + daysLeftArray[j + 1])
    
    // Gets all the deadlines till the 'Completed Tasks" column and calulates an independent daysLeftArray AGAIN, after the swap that may took place above. 
    daysLeftArray = activeSheet.getRange(Task_Deadlines, Task_Start_Column, 1, columnRange).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate)
    {
      var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
      var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
      return Number(differenceInDays) +1
    })

    Logger.log("after while with i:" + i)
    Logger.log("After while " + daysLeftArray)
  }

  Logger.log("Final: " + daysLeftArray)
  Logger.log(`--- Insertion sort end in ${activeSheet.getName()} sheet ---`) 
}
