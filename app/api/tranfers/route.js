import { NextResponse } from "next/server";
import { getSheetsClient } from " @/lib/getSheetsClient";


async function getLastRowInColumnAG(sheets, spreadsheetId) {
    const range = "AG:AG";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  
    const rows = res.data.values || [];
    return rows.length + 1; // La siguiente fila vacía
  }
  
  async function appendToColumnAG(sheets, spreadsheetId, value) {
    const nextRow = await getLastRowInColumnAG(sheets, spreadsheetId);
    const range = `AG${nextRow}`;
  
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[value]],
      },
    });
  
    console.log(`Valor '${value}' agregado a la celda ${range}`);
  }

export async function POST(req) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEETID;

    const body = await req.json();
    const { value } = body;
    
    if (!value) {
      return NextResponse.json({ error: "Falta el valor a agregar" }, { status: 400 });
    }

    await appendToColumnAG(sheets, spreadsheetId, value);

    return NextResponse.json({ value: `${value}` });
  } catch (error) {
    console.error("Error en POST:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
