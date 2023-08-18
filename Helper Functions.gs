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

// A function that moves passed tasks column after the "Passed tasks" column
function passedTasksArchive()
{
  var activeSheet = ss.getActiveSheet()
  var currentDate = new Date()

  var searchText = PASSED_TASKS_COLUMN_HEADER
  var firstRowValues = activeSheet.getRange(1, 1, 1, activeSheet.getLastColumn()).getValues()[0]
  var passedTasksColumnIndex = firstRowValues.findIndex(function(cellValue) 
  {
    return cellValue === searchText;
  }) + 1; // Adding 1 to convert from 0-based index to 1-based index

  //Days left array 
  var daysLeftArray = activeSheet.getRange(startRow + 4, startColumn, 1, columnRange - 1).getValues().flat().map(function(element){return new Date(element)}).map(function(arrayDate)
  {
    var differenceInMilliseconds = new Date(arrayDate) - new Date(currentDate)
    var differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24))
    return Number(differenceInDays)+1
  })

  var daysLeftArray2 = activeSheet.getRange(startRow + 6, startColumn, 1, columnRange - 1).getValues().flat()
  
  
  Logger.log(daysLeftArray + " daysLeftArray")
  
  for (let i = 0; i < passedTasksColumnIndex; i++)
  { 
    Logger.log(daysLeftArray[i] + " daysLeftArray[i]")

    if ((daysLeftArray[i] < 0) && (daysLeftArray2[i] === PASSED))
    {
      Logger.log(daysLeftArray[i] + " Days left")

      var currentColumn = daysLeftArray.findIndex(function(cellValue) {
      return cellValue === daysLeftArray[i];
      }) + startColumn

      activeSheet.moveColumns(activeSheet.getRange(startRow, currentColumn, rowRange, 1), passedTasksColumnIndex + 1)
      Logger.log(activeSheet.getRange(startRow, currentColumn, rowRange, 1).getA1Notation())
    }
  }
}


//TO DELETE
//ownList(tasksData.map(x => x[j]))
/*function ownList(a) {
  return a.length == 0
      ? []
      : [[a[0]]].concat(ownList(a.slice(1))) 
}*/