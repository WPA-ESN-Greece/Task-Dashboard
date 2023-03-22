var ss = SpreadsheetApp.getActiveSpreadsheet()

//Task Object
var taskObj =
{
  title: "",
  description: "",
  reference: "",
  url: "",
  conatctPerson: "",
  deadLine: "",
  daysLeft: ""
}

function onEdit(){

  //Sections
  var SectionsMail = ss.getSheetByName("Sections").getRange('B9').getValue()
  newTaskEmailTo("Sections",SectionsMail)

  //👩‍💼 Presidents
  var PresidentsMail = ss.getSheetByName("👩‍💼 Presidents").getRange('B9').getValue()
  newTaskEmailTo("👩‍💼 Presidents",PresidentsMail)

  //🙌 VPs
  var VicePresidentsMail = ss.getSheetByName("🙌 VPs").getRange('B9').getValue()
  newTaskEmailTo("🙌 VPs",VicePresidentsMail)

  //💸Treasurers
  var TreasurersMail = ss.getSheetByName("💸Treasurers").getRange('B9').getValue()
  newTaskEmailTo("💸Treasurers",TreasurersMail)

  //🎨CMs
  var CMsMail = ss.getSheetByName("🎨CMs").getRange('B9').getValue()
  newTaskEmailTo("🎨CMs",CMsMail)

  //💻WPAs
  var WPAsMail = ss.getSheetByName("💻WPAs").getRange('B9').getValue()
  newTaskEmailTo("💻WPAs",WPAsMail)

  //🌟PMs
  var PMsMail = ss.getSheetByName("🌟PMs").getRange('B9').getValue()
  newTaskEmailTo("🌟PMs",PMsMail)

  //🤝 ParMans
  var ParMansMail = ss.getSheetByName("🤝 ParMans").getRange('B9').getValue()
  newTaskEmailTo("🤝 ParMans",ParMansMail)

}


function dailyDeadlineCheck(){

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

