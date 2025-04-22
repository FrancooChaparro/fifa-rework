import { NextResponse } from "next/server";
import { getSheetsClient } from " @/lib/getSheetsClient";

// Función utilitaria para convertir número de columna a letra (A, B, ..., Z, AA, etc.)
function columnToLetter(column) {
  let letter = '';
  while (column >= 0) {
    letter = String.fromCharCode((column % 26) + 65) + letter;
    column = Math.floor(column / 26) - 1;
  }
  return letter;
}

export async function POST(req) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEETID;

    const body = await req.json();
    const { id, teamName } = body;

    console.log({ id, teamName });

    if (!id || !teamName) {
      return NextResponse.json({ error: "Faltan datos: id o teamName" }, { status: 400 });
    }

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A1:AF100",
    });

    const rows = readRes.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "No se encontraron datos" }, { status: 404 });
    }

    let targetRow = -1;
    let targetCol = -1;
    let currentValue = "";

    // Buscar ID
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === id) {
          targetRow = i + 1; // 1-based para Google Sheets
          targetCol = columnToLetter(j); // j es 0-based
          currentValue = row[j];
          break;
        }
      }
      if (currentValue) break;
    }

    if (!currentValue) {
      return NextResponse.json({ error: `No se encontró el ID '${id}'` }, { status: 404 });
    }

    if (currentValue.includes(`-${teamName}`)) {
      return NextResponse.json(
        { error: `El equipo '${teamName}' ya está asignado al jugador` },
        { status: 400 }
      );
    }

    const updatedValue = `${currentValue}-${teamName}`;

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

// import { NextResponse } from "next/server";
// import { getSheetsClient } from " @/lib/getSheetsClient";


// export async function POST(req) {
//   try {
//     const sheets = await getSheetsClient();
//     const spreadsheetId = process.env.SPREADSHEETID;

//     const body = await req.json();
//     const { id, teamName } = body;

//     console.log({id, teamName})
//     if (!id || !teamName) {
//       return NextResponse.json({ error: "Faltan datos: id o teamName" }, { status: 400 });
//     }

//     const readRes = await sheets.spreadsheets.values.get({
//       spreadsheetId,
//       range: "A1:AF100",
//     });

//     const rows = readRes.data.values;
//     if (!rows || rows.length === 0) {
//       return NextResponse.json({ error: "No se encontraron datos" }, { status: 404 });
//     }

//     let targetRow = -1;
//     let targetCol = -1;
//     let currentValue = "";

//     // Buscamos el ID tal cual llega
//     for (let i = 0; i < rows.length; i++) {
//       const row = rows[i];
//       for (let j = 0; j < row.length; j++) {
//         if (row[j] === id) {
//           targetRow = i + 1;
//           targetCol = columnToLetter(j);
//           currentValue = row[j];
//           break;
//         }
//       }
//       if (currentValue) break;
//     }

//     if (!currentValue) {
//       return NextResponse.json({ error: `No se encontró el ID '${id}'` }, { status: 404 });
//     }

//     // Evitamos duplicar el teamName si ya está
//     if (currentValue.includes(`-${teamName}`)) {
//       return NextResponse.json(
//         { error: `El equipo '${teamName}' ya está asignado al jugador` },
//         { status: 400 }
//       );
//     }

//     const updatedValue = `${currentValue}-${teamName}`;

//     await sheets.spreadsheets.values.update({
//       spreadsheetId,
//       range: `${targetCol}${targetRow}`,
//       valueInputOption: "USER_ENTERED",
//       requestBody: {
//         values: [[updatedValue]],
//       },
//     });

//     return NextResponse.json({
//       message: `ID actualizado de '${currentValue}' a '${updatedValue}' en ${targetCol}${targetRow}`,
//     });
//   } catch (error) {
//     console.error("Error en POST:", error);
//     return NextResponse.json({ error: "Error interno" }, { status: 500 });
//   }
// }