// Initializes the custom menu.
function initMenu() 
{
  var ui = SpreadsheetApp.getUi()
  var menu = ui.createMenu("🌌 ESN Menu")
  
  menu.addItem("➕ Add New Task", "addNewTask")
  menu.addItem("🧙‍♂️ Sort Current Tasksheet", "sortTasks")
  menu.addItem("📂 Archive Completed Tasks", "archiveCompletedTasks")
  
  menu.addToUi()
}

