function forEachEmail() 
{
  let allSheets = ss.getSheets()

  // Removes the "Settings" sheet.
  allSheets.pop()

  // Gets the names of the sheets in an Array.
  let sheetNamesArray = []
  allSheets.forEach(sheet => sheetNamesArray.push(sheet.getName()))

  return sheetNamesArray
}
