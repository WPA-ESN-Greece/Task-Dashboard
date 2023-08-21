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
