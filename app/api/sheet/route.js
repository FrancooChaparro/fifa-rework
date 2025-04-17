// app/api/sheet/route.js
import { NextResponse } from "next/server";
import { getSheetsClient } from " @/lib/getSheetsClient";


// GET: Leer datos
export async function GET() {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEETID,
      range: "A:AG",
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


// export async function POST(req) {
//   try {
//     const sheets = await getSheetsClient();
//     const spreadsheetId = process.env.SPREADSHEETID;

//     // 1. Leemos el body con el ID del jugador
//     const body = await req.json();
//     const { id, hasC } = body;

//     const baseId = id.replace(/-C$/, "");
//     const targetId = hasC ? `${baseId}-C` : baseId;

//     if (!id) {
//       return NextResponse.json({ error: "Falta el ID del jugador" }, { status: 400 });
//     }

//     // 2. Leemos un rango amplio de la hoja
//     const readRes = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "A1:Z100",
//     });

//     const rows = readRes.data.values;
//     if (!rows || rows.length === 0) {
//       return NextResponse.json({ error: "No se encontraron datos" }, { status: 404 });
//     }

//     let found = false;
//     let targetRow = -1;
//     let targetCol = -1;
//     let currentValue = "";

//     // 3. Buscamos el ID exacto en su versión con o sin -C
//     for (let i = 0; i < rows.length; i++) {
//       const row = rows[i];
//       for (let j = 0; j < row.length; j++) {
//         if (row[j] === id || row[j] === `${id}-C`) {
//           targetRow = i + 1;
//           targetCol = String.fromCharCode(65 + j);
//           currentValue = row[j];
//           found = true;
//           break;
//         }
//       }
//       if (found) break;
//     }

//     if (!found) {
//       return NextResponse.json({ error: `No se encontró '${id}' ni '${id}-C'` }, { status: 404 });
//     }

//     // 4. Alternar el valor: si tiene -C, se lo quitamos; si no, se lo agregamos
//     const updatedValue = hasC ? baseId : `${baseId}-C`;


//     await sheets.spreadsheets.values.update({
//       spreadsheetId,
//       range: `${targetCol}${targetRow}`,
//       valueInputOption: "USER_ENTERED",
//       requestBody: {
//         values: [[updatedValue]],
//       },
//     });

//     revalidatePath("/mercado");
    
//     return NextResponse.json({
//       message: `El jugador fue actualizado de '${currentValue}' a '${updatedValue}' en ${targetCol}${targetRow}`,
//     });
//   } catch (error) {
//     console.error("Error en POST:", error);
//     return NextResponse.json({ error: "Error interno" }, { status: 500 });
//   }
// }