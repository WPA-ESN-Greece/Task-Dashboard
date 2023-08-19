function newTaskColumn()
{
  activeSheet.insertColumnBefore(5)
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

