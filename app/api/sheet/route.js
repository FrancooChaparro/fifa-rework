// app/api/sheet/route.js
import { NextResponse } from "next/server";
import { getSheetsClient } from " @/lib/getSheetsClient";


// GET: Leer datos
export async function GET() {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEETID,
      range: "A:AF",
    });

    const filas = response.data.values || [];
    const columnas = filas[0]?.map((_, i) => filas.map(row => row[i])) || [];


    // Limpiar los subarrays eliminando celdas vacías
    const columnasLimpias = columnas.map(col => col.filter(celda => celda && celda.trim() !== ''));

    const transformed = columnasLimpias.map((row) =>
      row.map((item) => {
        const parts = item?.split("-").map((p) => p.trim()) ?? [];

        // Extraemos los primeros 3 como info
        const info = [parts[0], parts[1], parts[2]];

        // Teams: desde el 4to en adelante (sin agregar guión)
        const teams = parts.length > 3 ? parts.slice(3) : [];

        return {
          id: item || "",
          info: info,
          teams,
        };
      })
    );
    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error en GET:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

