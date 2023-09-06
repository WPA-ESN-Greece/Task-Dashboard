function myFunction() {
  
  var taskStatusAssinees = ss.getSheetByName(PRESIDENTS_SHEET_NAME).getRange(Task_Status_Start_Row, 3, Task_Status_Row_Range, 1).getValues()
  var emptyAssignees = taskStatusAssinees.filter(elemnet => elemnet[0] == "").length
  var taskStatusLastRange = taskStatusAssinees.length - emptyAssignees
  
  Logger.log(taskStatusLastRange)
}
