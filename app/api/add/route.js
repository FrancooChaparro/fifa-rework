import { google } from "googleapis";
import { NextResponse } from "next/server";

// Función para autorizar el cliente
async function getSheetsClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // 👈 esto es clav
  const client = new google.auth.JWT(
    process.env.GOOGLE_API_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  await client.authorize();

  return google.sheets({ version: "v4", auth: client });
}

export async function POST(req) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEETID;

    const body = await req.json();
    const { id, teamName } = body;

    if (!id || !teamName) {
      return NextResponse.json({ error: "Faltan datos: id o teamName" }, { status: 400 });
    }

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A1:Z100",
    });

    const rows = readRes.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "No se encontraron datos" }, { status: 404 });
    }

    let targetRow = -1;
    let targetCol = -1;
    let currentValue = "";

    // Buscamos el ID tal cual llega
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === id) {
          targetRow = i + 1;
          targetCol = String.fromCharCode(65 + j);
          currentValue = row[j];
          break;
        }
      }
      if (currentValue) break;
    }

    if (!currentValue) {
      return NextResponse.json({ error: `No se encontró el ID '${id}'` }, { status: 404 });
    }

    // Evitamos duplicar el teamName si ya está
    const updatedValue = currentValue.includes(`-${teamName}`)
      ? currentValue
      : `${currentValue}-${teamName}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${targetCol}${targetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[updatedValue]],
      },
    });

    return NextResponse.json({
      message: `ID actualizado de '${currentValue}' a '${updatedValue}' en ${targetCol}${targetRow}`,
    });
  } catch (error) {
    console.error("Error en POST:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}