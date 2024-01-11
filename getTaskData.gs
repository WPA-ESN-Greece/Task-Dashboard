function getTasksDetails(sheetName)
{
  //var sheetName = "🏢 Section" // for testing
  
  let sheet = ss.getSheetByName(sheetName)
  
  let taskColumnRange = PassedTasksColumnIndex - Task_Start_Column
  let tasksRange = sheet.getRange(Task_Start_Row, Task_Start_Column, Task_Row_Range, taskColumnRange)

  let tasksValues = tasksRange.getValues()
  let taskUrlValues = sheet.getRange(4, Task_Start_Column, 1, taskColumnRange).getRichTextValues()[0].map(element => {if (element.getLinkUrl() == null){return ""} else {return element.getLinkUrl()}})

  return tasksValues.concat([taskUrlValues])
}


function getTasksStatuses(sheetName)
{
  //var sheetName = "🏢 Section" // for testing
  
  let sheet = ss.getSheetByName(sheetName)
  
  let tasksStatusColumnRange = PassedTasksColumnIndex - Task_Start_Column
  let tasksStatusRange = sheet.getRange(Task_Status_Start_Row, Task_Start_Column, Task_Status_Row_Range, tasksStatusColumnRange)

  let tasksStatusValues = tasksStatusRange.getValues()

  Logger.log(tasksStatusValues)
  return tasksStatusValues
}