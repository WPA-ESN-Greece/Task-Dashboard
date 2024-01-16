function getTasksDetails(sheetName)
{
  let sheet = ss.getSheetByName(sheetName)
  
  let taskColumnRange = CurrentSheetData(sheetName).passedTasksColumnIndex - Task_Start_Column
  let tasksRange = sheet.getRange(Task_Start_Row, Task_Start_Column, Task_Row_Range, taskColumnRange)

  let tasksValues = tasksRange.getValues()
  let taskUrlValues = sheet.getRange(4, Task_Start_Column, 1, taskColumnRange).getRichTextValues()[0].map(element => {if (element.getLinkUrl() == null){return ""} else {return element.getLinkUrl()}})
  
  return tasksValues.concat([taskUrlValues])
}


function getTasksStatuses(sheetName)
{
  let sheet = ss.getSheetByName(sheetName)

  let tasksStatusColumnRange = CurrentSheetData(sheetName).passedTasksColumnIndex - Task_Start_Column
  let tasksStatusRange = sheet.getRange( CurrentSheetData(sheetName).task_Status_Start_Row, Task_Start_Column, CurrentSheetData(sheetName).task_Status_Row_Range, tasksStatusColumnRange)

  let tasksStatusValues = tasksStatusRange.getValues()

  return tasksStatusValues
}

/**
 * This function inserts a new column after the fourth column (D) in the active sheet,
 * effectively shifting the existing columns to the right. Task_Start_Column default value is 5 for column E. 
 *
 * @function
 * @name newTaskColumn
 * @memberof module:Spreadsheet
 */
function newTaskColumn()
{
  activeSheet.insertColumnAfter(Task_Start_Column -1)
}


/**
 * Checks if the currently logged-in user is a member of specific Google Groups.
 *
 * This function retrieves the email address of the currently logged-in user,
 * collects all members from specified Google Groups, and checks if the user's
 * email is in the list of group members.
 *
 * @function
 * @name isCurrentUserAdmin
 * @returns {boolean} Returns true if the user is a member of any of the specified groups, false otherwise.
 */
function isCurrentUserAdmin()
{
  let usersEmailAddresses = ss.getEditors().map(function(element) {return getGroupMembers(element)}).join()
  let userEmail = Session.getActiveUser().getEmail()

  Logger.log(`Is User ${userEmail} editor: ${usersEmailAddresses.includes(userEmail)}`)
  return usersEmailAddresses.includes(userEmail)
}

function getGroupMembers(emailAddress)
{
  try 
  {
    let groupMembers = GroupsApp.getGroupByEmail(emailAddress).getUsers()
    return groupMembers.join()
  } catch(error){}

  return emailAddress
}


/**
 * Creates a rich text value with a linked text and URL.
 *
 * @function
 * @name richTextLink
 * @param {string} text - The text to display as a hyperlink.
 * @param {string} url - The URL to which the text should be linked.
 * @returns {RichTextValue} A RichTextValue object containing the linked text and URL.
 */
function richTextLink(text,url) 
{
  var richValue = SpreadsheetApp.newRichTextValue().setText(text).setLinkUrl(url)
  return richValue
}

/**
 * Filters out empty or null values from an array or iterable.
 *
 * This function checks if the provided element is not null, undefined, an empty string, a single space, or NaN,
 * and returns true if it meets any of these conditions, indicating it's not empty.
 *
 * @function
 * @name filterEmpty
 * @memberof module:ArrayUtils
 * @param {*} element - The element to be checked for emptiness.
 * @returns {boolean} Returns true if the element is not empty, false otherwise.
 */
function filterEmpty(element)
{
 return element !== null && element !== undefined && element !== '' && element !== ' ' && !Number.isNaN(element) 
}


/**
 * Finds the index of the first occurrence of a specific text in an array.
 *
 * This function searches for the first occurrence of the specified text within the given array
 * and returns its index. The index is 1-based to match typical user expectations.
 *
 * @function
 * @name findArrayIndexOfText
 * @memberof module:ArrayUtils
 * @param {Array} array - The array in which to search for the text.
 * @param {string} searchText - The text to search for in the array.
 * @returns {number} The index of the first occurrence of the text in the array, or -1 if not found.
 */
function findArrayIndexOfText(array, searchText)
{
  return array.findIndex(function(cellValue)  
  {
    return cellValue === searchText;
  }) + 1; // Adding 1 to convert from 0-based index to 1-based index.
}

//Toas Function (those little messages on bottom right).
/**
 * Displays a toast message with a title and timeout duration.
 *
 * This function displays a toast message with the specified content and a title
 * for a specified duration.
 *
 * @function
 * @name toast
 * @memberof module:Spreadsheet
 * @param {string} message - The message content to display in the toast.
 * @param {string} [title] - The optional title of the toast message.
 * @param {number} [timeoutSeconds] - The optional duration (in seconds) for which the toast message should be displayed.
 */
function toast(message, tittle, timeoutSeconds)
{
  ss.toast(message, tittle, timeoutSeconds)
}


/**
 * Displays a custom alert dialog box in Google Apps Script.
 *
 * This function creates and displays an alert dialog with the specified title, message, and
 * customizable button options. It returns the user's response to the dialog.
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
  var response  = ui.alert(String(title), String(message), buttonsOptions)
  return response
}


/**
 * Returns the URL of a specific sheet within the active Google Spreadsheet.
 *
 * This function takes the name of a sheet within the active Google Spreadsheet,
 * retrieves its URL, and returns the URL as a string. If the sheet with the provided
 * name does not exist, it returns an error message.
 *
 * @function
 * @name getSheetURL
 * @memberof module:Spreadsheet
 * @param {string} sheetName - The name of the sheet for which to retrieve the URL.
 * @returns {string} The URL of the specified sheet, or an error message if the sheet does not exist.
 */
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
    
    //Logger.log("sheetUrl " + sheetUrl) 
    
    return sheetUrl
  } 
  else 
  {
    // If the sheet doesn't exist, return an error message
    return "Sheet not found"
  }
}


// Function to select a column from the matrix without a loop
function getMatrixColumn(matrix, columnIndex) 
{
  return matrix.map(function(row) 
  {
    return row[columnIndex]
  })
}


function getAllSheetsNames() 
{
  let allSheets = ss.getSheets()

  // Removes the "Settings" and the "Template" sheets. 
  allSheets.pop()
  allSheets.pop()

  // Gets the names of the sheets in an Array.
  let sheetNamesArray = []
  allSheets.forEach(sheet => sheetNamesArray.push(sheet.getName()))

  // Returns an Array of All the Sheets' Names withouth the Settings sheet.
  return sheetNamesArray
}


function emailTask(taskObject, recipientEmail, sheetName, emailNotificationType, taskStatus = "")
{
  let emailBody, subject, senderName = ""
  let bccEmails, recipientEmails
  
  switch (emailNotificationType)
  {
    case "newTask":
      recipientEmails = ""
      bccEmails = recipientEmail
      subject = `New Task reported in Dashboard for ${sheetName}`
      senderName = "⚠️ Dashboard New Task ⚠️"
      emailBody = `
      <p><b>🔔 To-Do: </b><b>${taskObject.title}</b></p>
      <p><b>❗ Priority: </b><b>${taskObject.priotiry}</b></p>
      <p>${taskObject.description}</p>
      <p><b>🔗 Reference: </b><a href="${taskObject.url}">${taskObject.reference}</a></p>
      <p><b>👤 Contact Person: </b>${taskObject.conatctPerson}</p>
      <p><b>🆘 Deadline: </b>${taskObject.deadLine}</p>
      <p><b>🔴 Days Left: </b>${taskObject.daysLeft}</p>
      <p>Check it out 👉 <a href="${getSheetURL(sheetName)}">Dashboard/ ${sheetName}</a> so you can add it to your To-Do ✨</p>
      `//emailBody end
    break;

    case "reminder":
      recipientEmails = recipientEmail
      bccEmails = ""
      subject = `🎗Reminder for Task in Dashboard for ${sheetName}`
      senderName = "⚠️ Dashboard Reminder ⚠️"
      emailBody = `
      <p><b>🔔 To-Do: </b><b>${taskObject.title}</b> - Your current status: ${taskStatus}</p>
      <p><b>❗ Priority: </b><b>${taskObject.priotiry}</b></p>
      <p>${taskObject.description}</p>
      <p><b>🔗 Reference: </b><a href="${taskObject.url}">${taskObject.reference}</a></p>
      <p><b>👤 Contact Person: </b>${taskObject.conatctPerson}</p>
      <p><b>🆘 Deadline: </b>${taskObject.deadLine}</p>
      <p><b>🔴 Days Left: </b>${taskObject.daysLeft}</p>
      <p>Oh! You have completed this task? Mark it as '${TASK_DONE}' in the <a href="${getSheetURL(sheetName)}">Dashboard/ ${sheetName}</a> so we know 🙏</p>
      `//emailBody end
    break;

    default:
      Logger.log("The only valid email types are 'newTask' and 'reminder'.")
  }
  
  MailApp.sendEmail
  ({
    to: recipientEmail,
    cc: "",
    bcc: bccEmails,
    subject: subject,
    htmlBody: emailBody,
    name: senderName
  })
}