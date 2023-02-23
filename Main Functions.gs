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





