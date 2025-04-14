// /models/read-sheet.js
const { google } = require("googleapis");

function transponer(matriz) {
  return matriz[0].map((_, colIndex) => matriz.map(fila => fila[colIndex]));
}

async function getSheetData() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // 👈 esto es clav
  
  const client = new google.auth.JWT(
    process.env.GOOGLE_API_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  await client.authorize();

  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEETID,
    range: "A:AF",
  });

  const filas = res.data.values || [];
  return transponer(filas);
}

module.exports = { getSheetData };
