function onOpen()
{
  initMenu()
}

function onEdit()
{
  //Sections
  var SectionsMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("Sections").getRange('B9').getValue()
  newTaskEmailTo("Sections",SectionsMail)

  //👩‍💼 Presidents
  var PresidentsMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("👩‍💼 Presidents").getRange('B9').getValue()
  newTaskEmailTo("👩‍💼 Presidents",PresidentsMail)

  //🙌 VPs
  var VicePresidentsMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("🙌 VPs").getRange('B9').getValue()
  newTaskEmailTo("🙌 VPs",VicePresidentsMail)

  //💸Treasurers
  var TreasurersMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("💸Treasurers").getRange('B9').getValue()
  newTaskEmailTo("💸Treasurers",TreasurersMail)

  //🎨CMs
  var CMsMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("🎨CMs").getRange('B9').getValue()
  newTaskEmailTo("🎨CMs",CMsMail)

  //💻WPAs
  var WPAsMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("💻WPAs").getRange('B9').getValue()
  newTaskEmailTo("💻WPAs",WPAsMail)

  //🌟PMs
  var PMsMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("🌟PMs").getRange('B9').getValue()
  newTaskEmailTo("🌟PMs",PMsMail)

  //🤝 ParMans
  var ParMansMail = 'wpa+sections@esngreece.gr'//ss.getSheetByName("🤝 ParMans").getRange('B9').getValue()
  newTaskEmailTo("🤝 ParMans",ParMansMail)
}


function dailyDeadlineCheck()
{
  //Sections
  dailyEmailReminder("Sections")

  //👩‍💼 Presidents
  dailyEmailReminder("👩‍💼 Presidents")

  //🙌 VPs
  dailyEmailReminder("🙌 VPs")

  //💸Treasurers
  dailyEmailReminder("💸Treasurers")

  //🎨CMs
  dailyEmailReminder("🎨CMs")

  //💻WPAs
  dailyEmailReminder("💻WPAs")

  //🌟PMs
  dailyEmailReminder("🌟PMs")

  //🤝 ParMans
  dailyEmailReminder("🤝 ParMans")

}

function addNewTask()
{
  if (checkGroupMembership() === true && showAlert(
    "➕ Add New Task",`You are about to insert a new task column to the left of Column E on the active sheet [${activeSheet.getName()}].
    Are you sure you want to continue?`,
    ui.ButtonSet.OK_CANCEL) === ui.Button.OK)
  {
    newTaskColumn()
  }
  else {return}
}

function sortTasks()
{
  if (checkGroupMembership() === true && showAlert(
    "🧙‍♂️ Sort Current Tasksheet",`You are about to sort the task colums on the active sheet [${activeSheet.getName()}].
    Are you sure you want to continue?`,
    ui.ButtonSet.OK_CANCEL) === ui.Button.OK)
  {
    insertionSort()

    showAlert(
    "🧙‍♂️ Sort Current Tasksheet",`Tasks on sheet [${activeSheet.getName()}] should now be sorted.`,
    ui.ButtonSet.OK)
  }
  else {return}
}

function archiveCompletedTasks()
{
  if (checkGroupMembership() === true && showAlert(
    "📂 Archive Completed Tasks",`You are about to "archive" the completed task colums on the active sheet [${activeSheet.getName()}].
    Are you sure you want to continue?`,
    ui.ButtonSet.OK_CANCEL) === ui.Button.OK)
    {
      passedTasksArchive()

      showAlert(
    "📂 Archive Completed Tasks",`Completed Tasks on sheet [${activeSheet.getName()}] should now be "Archived" on the right side of the "${PASSED_TASKS_COLUMN_HEADER}" column.`,
    ui.ButtonSet.OK)
    }
  else {return}
}