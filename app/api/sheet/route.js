// app/api/sheet/route.js
import { google } from "googleapis";
import { NextResponse } from "next/server";
import keys from " @/models/mercado-456418-9e05a7cb6a17.json";

export async function GET() {
  try {
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    await client.authorize();

    const sheets = google.sheets({ version: "v4", auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1SBBdxhbIJnvWcA_lmu9U7uG79Q-jTAKWi7x0chp9lT8",
      range: "A:Z",
    });

    const filas = response.data.values || [];
    const columnas = filas[0]?.map((_, i) => filas.map(row => row[i])) || [];

    return NextResponse.json(columnas);
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
