// googleSheets.js

const { google } = require('googleapis');
const moment = require('moment-timezone');

function cleanPhoneNumber(phoneNumber) {
  // Remove characters like '=', '(', ')' and keep only digits
  return phoneNumber.replace(/[^0-9]/g, '');
}

const googleSheets = async (personDetails) => {
  try {
    
    // const values = [personDetails.parentName, personDetails.childName,personDetails.email, personDetails.childAge,personDetails.classDetails[0].timeslot,personDetails.classDetails[1].timeslot,personDetails.classDetails[2].timeslot];
    const date = new Date();
    const formattedTimestamp = moment(date).tz('Asia/Kolkata').format('DD MMM YYYY HH:mm');
    const values = [formattedTimestamp,personDetails.parentName, personDetails.childName, personDetails.email, personDetails.childAge,cleanPhoneNumber(personDetails.phoneNumber),personDetails.knowabout,personDetails.additionalInfo];

    personDetails.classDetails.forEach((classDetail) => {
        // const { classid, timeslot } = classDetail;
        const classId = parseInt(classDetail.classid, 10)+4; // Convert to a number with base 10
        const timeslot = classDetail.timeslot;
        values[classId] = timeslot;
    });
    

    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });


    // Create client instance for auth
    const client = await auth.getClient();

    const spreadsheetId = '1zBKa0aa_P3M-Zq-x3lDh4jI9b7s--L4QYsNYqfVaJ-Y';

    // Get metadata about spreadsheet
    const metaData = await google.sheets({ version: 'v4', auth: client }).spreadsheets.get({
      auth,
      spreadsheetId,
    });

    // Write row(s) to spreadsheet
    await google.sheets({ version: 'v4', auth: client }).spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [values],
      },
    });

    console.log('Data written to Google Sheets successfully');
  } catch (err) {
    console.error('Error writing to Google Sheets:', err);
  }
};

module.exports = googleSheets;
