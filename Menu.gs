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
  let ui = SpreadsheetApp.getUi()
  
  let menu = ui.createMenu("🌌 ESN Menu")
  
  menu.addItem("➕ Add New Task", "addNewTask")
  menu.addItem("➕ Add New Task Sheet ✅", "inserNewTasksheet")
  menu.addItem("🧙‍♂️ Sort Current Task Sheet", "sortTasks")
  menu.addItem("📂 Archive Completed Tasks", "archiveCompletedTasks")

  if (SettingsSheet.getRange('A1').getValue() == 'Needs Setup')
  {
    menu.addSeparator()
    menu.addItem("🔨 Set Up", "initialSetup")
  }
  
  menu.addSeparator()
  menu.addItem("📚 Documentation", "showDocumentation")
  
  menu.addToUi()
}


function initialSetup()
{
  // Authenticates the script for the current user. 
  authPopUp()
  // Creates an onEdit trigger that will trigger 'onEdit' function every time an edit is takes place on this spredsheet. 
  ScriptApp.newTrigger('onEdit').forSpreadsheet(ss).onEdit().create();
  // Creates a time driven trigger that will trigger 'dailyDeadlineCheck' function every day between 10-11AM. 
  ScriptApp.newTrigger('dailyDeadlineCheck').timeBased().atHour(10).everyDays(1).create();

  // This will remove the set up option from the ESN Menu. 
  SettingsSheet.getRange('A1').setValue('')
}


