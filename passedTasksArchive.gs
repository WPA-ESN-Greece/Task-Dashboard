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
  Logger.log(`--- Archive Completed and Passed Tasks starts in ${activeSheet.getName()} sheet ---`)

  // Initialise varibles
  let currentTaskStatuses = []
  let isTaskDone = null
  let isTaskDoneArray = []

  // Gets Sheet's data
  Task_Status_Start_Row = CurrentSheetData(activeSheet.getName()).task_Status_Start_Row
  Task_Status_Last_Row = CurrentSheetData(activeSheet.getName()).task_Status_Last_Row
  Task_Status_Row_Range =  Task_Status_Last_Row - Task_Status_Start_Row
  let passedTasksColumnIndex = CurrentSheetData(activeSheet.getName()).passedTasksColumnIndex
  // this row range is from the Task title till the last task status. 
  let rowRange = Task_Status_Last_Row -1

  // Get Tasks Details and Tasks Statuses until the "Completed Tasks" column.
  //let tasksDetails = getTasksDetails(activeSheet.getName())
  //let tasksStatuses = getTasksStatuses(activeSheet.getName())
  let TaskData = activeSheet.getRange(Task_Start_Row, Task_Start_Column, rowRange, activeSheet.getLastColumn() - Task_Start_Column +1).getValues()

  // Gets the Assignees Names/Titles from column C.
  let taskStatusAssineesNames = getMatrixColumn(activeSheet.getRange(Task_Status_Start_Row, 3, Task_Status_Row_Range, 1).getValues(), 0)


  // Sets the destination column to the one right to the "Completed Tasks" column.
  let destinationColumnIndex = passedTasksColumnIndex + 1
  

  // For loop that goes through Columns. // i is for Columns. Data[Row][Col]
  for (let i = 0; i <= passedTasksColumnIndex; i++)  
  {
    Logger.log(`Start for passedTasksColumnIndex: ${passedTasksColumnIndex}`)
    Logger.log(i + Task_Start_Column)
    
    // Reset the array
    isTaskDoneArray = []
    
    // An array that checks if ALL the required task details are NOT empty. Returns true or false. Required fields are the ones with the red asterisk * in the Spreadsheet.
    let taskValuesRequirementsArrayIsTrue = [TaskData[0][i], TaskData[3][i], TaskData[4][i], TaskData[5][i]].every(element => element != "")

    // offset is the first status index in the Task Data Matrix.  
    let offset = Task_Status_Start_Row - Task_Start_Row

    // Loop that goes through rows. 
    for (let j = offset; j < rowRange; j++) 
    {
      // Gets current column's task statuses.       
      currentTaskStatuses.push(TaskData[j][i])

      // If there is no Assignee name (it doesnt't checks about the email address), it skips that row. 
      if (taskStatusAssineesNames[j]) 
      {
        // An array which has all the task statuses that corresponds to assignees' names.  
        isTaskDoneArray.push(currentTaskStatuses[j]) 
      }
    }

    // A bollean value that's true if EVERY value in currentTaskStatuses in either "Done" OR "Not Applicable". 
    isTaskDone = isTaskDoneArray.every(element => element === TASK_DONE || element === TASK_NOT_APPLICABLE)
    
    Logger.log(`  currentTaskStatuses: ${currentTaskStatuses}`)
    Logger.log(`  isTaskDoneArray: ${isTaskDoneArray}`)
    Logger.log(`  isTaskDone: ${isTaskDone}`)
    
    // Guard clauses that work as a control point for undesired values in order not to archive the current task if it doesn't fulfil the following criteria.  
      // A guard clause the checks if the current task meets the prerequisites. If not, it skips it. 
      if (taskValuesRequirementsArrayIsTrue === false) {continue;}
      // A guard clause the checks if Days Left value is NOT "Passed". If it's not "Passed", it skips it. 
      if (!(TaskData[7][i] === PASSED)) {continue;}
      // A guard clause the checks if isTaskDone is NOT true. If it's false, it skips it. 

    if (isTaskDone === true)
    {
      // Searches for the Task Title in order to find the current column index.
      let currentColumn = TaskData[0].findIndex(
        function(cellValue) 
        {
          return cellValue === TaskData[0][i]
        }) + Task_Start_Column
      
      // Gets the actual Spreadsheet column to move it. 
      let columnToMoveRange = activeSheet.getRange(Task_Start_Row, currentColumn, Task_Status_Row_Range, 1)
      Logger.log(`For loop start for i=${i} on column ${activeSheet.getRange(1,currentColumn).getA1Notation().charAt(0)} or ${currentColumn}`)

      // A guard cluase to avoid an error, and prevent an infinity loop on the following recursion.
      if (currentColumn === destinationColumnIndex) {return;} 
      if(currentColumn === destinationColumnIndex -1)
      {
        Logger.log(`  Recursion of 'passedTasksArchive' started.`)
        passedTasksArchive() //!This is a recursion of the same function.
      }
      else
      {
        activeSheet.moveColumns(columnToMoveRange, destinationColumnIndex)
        Logger.log(` --- Current Column ${currentColumn} Moved to ${destinationColumnIndex} ---`)
      }

    }
    
    //Reset the array.
    currentTaskStatuses = []
    isTaskDoneArray = []

    // Search for the new index of the "Passed Tasks" Column.
    passedTasksColumnIndex = CurrentSheetData(activeSheet.getName()).passedTasksColumnIndex 
    destinationColumnIndex = passedTasksColumnIndex +1

    Logger.log(`passedTasksColumnIndex NEW is ${passedTasksColumnIndex}`)

    TaskData = activeSheet.getRange(Task_Start_Row, Task_Start_Column, Task_Status_Last_Row -1, activeSheet.getLastColumn() - Task_Start_Column +1).getValues()
  }

  Logger.log(`--- Archive Completed and Passed Tasks ends in ${activeSheet.getName()} sheet ---`)
}