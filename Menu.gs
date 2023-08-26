/**
 * Initializes a custom menu in the Google Sheets interface.
 *
 * This function creates a custom menu with various options, such as adding a new task,
 * sorting the current tasksheet, archiving completed tasks, and accessing documentation.
 * The menu is added to the Google Sheets user interface for easy access.
 *
 * @function
 * @name initMenu
 * @memberof module:Spreadsheet
 * @returns {void} This function does not return a value.
 */
function initMenu() 
{
  var ui = SpreadsheetApp.getUi()
  
  var menu = ui.createMenu("🌌 ESN Menu")
  
  menu.addItem("➕ Add New Task", "addNewTask")
  menu.addItem("🧙‍♂️ Sort Current Tasksheet", "sortTasks")
  menu.addItem("📂 Archive Completed Tasks", "archiveCompletedTasks")
  menu.addItem("📚 Documentation", "showDocumentation")
  
  menu.addToUi()
}
