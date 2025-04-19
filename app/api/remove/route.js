import { NextResponse } from "next/server";
import { getSheetsClient } from " @/lib/getSheetsClient";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j].startsWith(id)) {
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

    // Verificar si contiene el teamName
    if (!currentValue.includes(`-${teamName}`)) {
      return NextResponse.json({
        error: `El teamName '${teamName}' no está presente en el valor actual`,
      }, { status: 404 });
    }

    const updatedValue = currentValue.replace(`-${teamName}`, "");

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${targetCol}${targetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[updatedValue]],
      },
    });

    // Esperar un poco para que Google Sheets procese
    await sleep(500);

    return NextResponse.json(
      updatedValue
  );

  } catch (error) {
    console.error("Error en DELETE:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
