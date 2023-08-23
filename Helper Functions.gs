function newTaskColumn()
{
  activeSheet.insertColumnAfter(4)
}


function checkGroupMembership() 
{
  var userEmail = Session.getActiveUser().getEmail();

  let allMembers = []
  
  GOOGLE_GORUPS_PERMITION.forEach(
    function getUsersFromGroup(groupEmail)
    {
      allMembersTemp = GroupsApp.getGroupByEmail(groupEmail).getUsers().forEach(member => allMembers.push(member))
    }
  )

  allMembers = allMembers.join()

  Logger.log("All Members: " + allMembers)
  
  var isMember = allMembers.includes(userEmail)

  Logger.log(isMember + " isMember")
  
  if (isMember) {
    Logger.log(userEmail + " is a member of the group.");
    return true
  } else {
    Logger.log(userEmail + " is not a member of the group.");
    return false
  }
}


//link text for rich text value
function richTextLink(text,url) 
{
  var richValue = SpreadsheetApp.newRichTextValue().setText(text).setLinkUrl(url)
  return richValue
}

function filterEmpty(element){
 return element !== null && element !== undefined && element !== '' && element !== ' ' && !Number.isNaN(element) 
}


function findArrayIndexOfText(array, searchText)
{
  return array.findIndex(function(cellValue)  
  {
    return cellValue === searchText;
  }) + 1; // Adding 1 to convert from 0-based index to 1-based index.
}

//Toas Function (those little messages on bottom right).
function toast(message, tittle, timeoutSeconds){
  ss.toast(message, tittle, timeoutSeconds)
}

//Confirmation Alert
/**
 * Displays a custom alert dialog box in Google Apps Script.
 *
 * @param {string} title - The title to display in the dialog box.
 * @param {string} message - The message to display in the dialog box.
 * @param {GoogleAppsScript.Base.Ui.ButtonSet} buttonsSet - The set of buttons to display in the dialog box.
 *   Possible values are:
 *   - `ui.ButtonSet.OK`: Display an OK button.
 *   - `ui.ButtonSet.OK_CANCEL`: Display OK and Cancel buttons.
 *   - `ui.ButtonSet.YES_NO`: Display Yes and No buttons.
 *   - `ui.ButtonSet.YES_NO_CANCEL`: Display Yes, No, and Cancel buttons.
 *
 * @returns {GoogleAppsScript.Base.Ui.Button} The button that was clicked in the dialog box.
 */
function showAlert(title, message, buttonsOptions)
{
  var ui = SpreadsheetApp.getUi()
  //var message = "Message"
  //var title = "Title"
  /*
  const buttonsOptions = {
    Ok: ui.ButtonSet.OK,
    Ok_Cancel: ui.ButtonSet.OK_CANCEL,
    Yes_No: ui.ButtonSet.YES_NO,
    Yes_No_Cancel: ui.ButtonSet.YES_NO_CANCEL
  }*/

  //var buttonsSet = buttonsOptions.Ok_Cancel

  var response  = ui.alert(String(title), String(message), buttonsOptions)
  return response
}

//Returns the URL of a sheet by its name.
function getSheetURL(sheetName)
{
  var ss = SpreadsheetApp.getActiveSpreadsheet() 

  // Get the sheet by its name
  var sheet = ss.getSheetByName(sheetName)
  
  // Check if the sheet exists
  if (sheet) 
  {
    // Get the ID of the spreadsheet
    var spreadsheetId = ss.getId()
    
    // Get the sheet's index
    var sheetId = sheet.getSheetId()
    
    // Construct the URL for the specific sheet
    var sheetUrl = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/edit#gid=" + sheetId
    
    Logger.log("sheetUrl " + sheetUrl)
    
    return sheetUrl
  } 
  else 
  {
    // If the sheet doesn't exist, return an error message
    return "Sheet not found"
  }
}