function TwoPassedTasksArchive(columnIndex = 0) 
{
  ss.getSheetByName('🏢 Section').activate() // for testing

  Logger.log(`--- Archive Completed and Passed Tasks starts in ${activeSheet.getName()} sheet ---`)

  // Initialise varibles
    let currentTaskStatuses = []
    let currentTaskIsDone = null
    let currentTaskStatus = []

  // Gets Sheet's data
  Task_Status_Start_Row = CurrentSheetData(activeSheet.getName()).task_Status_Start_Row
  Task_Status_Last_Row = CurrentSheetData(activeSheet.getName()).task_Status_Last_Row
  Task_Status_Row_Range =  Task_Status_Last_Row - Task_Status_Start_Row
  let passedTasksColumnIndex = CurrentSheetData(activeSheet.getName()).passedTasksColumnIndex

  // Checks if "Completed Tasks" column has any tasks to the left of it. 
  if (!(columnIndex < passedTasksColumnIndex - Task_Start_Column)) {return}

  // Get Tasks Details and Tasks Statuses until the "Completed Tasks" column.
  let tasksDetails = getTasksDetails(activeSheet.getName())
  let tasksStatuses = getTasksStatuses(activeSheet.getName())
  // Gets the Assignees Names/Titles from column C.
  let taskAssineesNames = getMatrixColumn(activeSheet.getRange(Task_Status_Start_Row, 3, Task_Status_Row_Range, 1).getValues(), 0)

  // Sets the destination column to the one right to the "Completed Tasks" column.
  let destinationColumnIndex = passedTasksColumnIndex +1

  // An array that checks if ALL the required task details are NOT empty. Returns true or false. Required fields are the ones with the red asterisk * in the Spreadsheet.
  let taskValuesRequirementsArray = [tasksDetails[0][columnIndex], tasksDetails[3][columnIndex], tasksDetails[4][columnIndex], tasksDetails[5][columnIndex]].every(element => element != "")
  Logger.log(taskValuesRequirementsArray)

  currentTaskStatuses = getMatrixColumn(tasksStatuses, columnIndex)
    Logger.log(`  Current Task Statuses: `).log(currentTaskStatuses) 

  // Gets the Task Statuses that have an Assignee. Those which do not have an assignee are ignored. 
  taskAssineesNames.forEach(function(assignee, index)
  {
    if (assignee)
    {
      currentTaskStatus.push(currentTaskStatuses[index])
    }
  })

  // Boolean value that states if the current task is completed or not. 
  currentTaskIsDone = currentTaskStatus.every(element => element === TASK_DONE || element === TASK_NOT_APPLICABLE)
    Logger.log(`  Current Task is Done: `).log(currentTaskStatus).log(currentTaskIsDone)

  // Checks if current task is Passed AND if it has all the required field non-empty AND if it's completed (Done or Not Applicable). 
  if (tasksDetails[7][columnIndex] === PASSED && taskValuesRequirementsArray === true && currentTaskIsDone === true)
  {
    // Calculates the current columns index in the spreadsheet. 
    let currentColumn =  Task_Start_Column + columnIndex
    // Gets the actual Spreadsheet column to move it. 
    let columnToMoveRange = activeSheet.getRange(Task_Start_Row, currentColumn, Task_Status_Last_Row -1, 1)

    activeSheet.moveColumns(columnToMoveRange, destinationColumnIndex)
    Logger.log(`Current Column ${activeSheet.getRange(1,currentColumn).getA1Notation().charAt(0)} (Index ${currentColumn}) moved to ${activeSheet.getRange(1,destinationColumnIndex).getA1Notation().charAt(0)} (Index${destinationColumnIndex})`)

    // Since a column was moved out of the non-completed tasks range, the index is decreased by 1. 
    columnIndex -= 1
  }

  // The column index is increased by 1 in order to go to the next column/ task. 
  columnIndex++

  TwoPassedTasksArchive(columnIndex) 
}
