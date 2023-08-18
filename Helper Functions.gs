function newTaskColumn()
{
  activeSheet.insertColumnBefore(5)
}


function checkGroupMembership() 
{
  var userEmail = Session.getActiveUser().getEmail();

  var groupMembers = GroupsApp.getGroupByEmail(GOOGLE_GORUP_PERMITION1).getUsers().concat(GroupsApp.getGroupByEmail(GOOGLE_GORUP_PERMITION2).getUsers()).join(",")
  Logger.log(groupMembers)

  var isMember = groupMembers.includes(userEmail)
  //var isMember = isMemberArr
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


//TO DELETE
//ownList(tasksData.map(x => x[j]))
/*function ownList(a) {
  return a.length == 0
      ? []
      : [[a[0]]].concat(ownList(a.slice(1))) 
}*/