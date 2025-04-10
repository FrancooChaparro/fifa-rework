// /models/read-sheet.js
const { google } = require("googleapis");
const keys = require("./mercado-456418-9e05a7cb6a17.json");

function transponer(matriz) {
  return matriz[0].map((_, colIndex) => matriz.map(fila => fila[colIndex]));
}

async function getSheetData() {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  await client.authorize();

  const sheets = google.sheets({ version: "v4", auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1SBBdxhbIJnvWcA_lmu9U7uG79Q-jTAKWi7x0chp9lT8",
    range: "A:Z",
  });

  const filas = res.data.values || [];
  return transponer(filas);
}

module.exports = { getSheetData };
