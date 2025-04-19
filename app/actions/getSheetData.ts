"use server";
const dynamic = "force-dynamic";
import { getSheetsClient } from " @/lib/getSheetsClient";
import { TeamMarket } from " @/types/types";
import { revalidatePath } from "next/cache";

export async function getUltimaColumnaFija(): Promise<TeamMarket[]> {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEETID;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "AG:AG", // Solo la columna AG
    });

    const filas = response.data.values || [];

    // Limpiar celdas vacías
    const datosLimpios = filas
      .flat()
      .filter((celda) => celda && celda.trim() !== "");

    const transformed = datosLimpios.map((item) => {
      const parts = item?.split("-").map((p: any)  => p.trim()) ?? [];

      const info = [parts[0], parts[1], parts[2]];
      const teams = parts.length > 3 ? parts.slice(3) : [];

      return {
        id: item || "",
        info,
        teams,
      };
    });

    return transformed;
  } catch (error) {
    console.error("Error al obtener columna AG:", error);
    return [];
  }
}


export async function getSheetData(): Promise<TeamMarket[][]> {
  try {
    const sheets = await getSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEETID,
      range: "A:AG",
    });

    const filas = response.data.values || [];
    const columnas = filas[0]?.map((_, i) => filas.map((row) => row[i])) || [];

    // Limpiar los subarrays eliminando celdas vacías
    const columnasLimpias = columnas.map((col) =>
      col.filter((celda) => celda && celda.trim() !== "")
    );

    const transformed = columnasLimpias.map((row) =>
      row.map((item) => {
        const parts = item?.split("-").map((p: any) => p.trim()) ?? [];

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

    return transformed;
  } catch (error) {
    console.error("Error en GET:", error);
    return [];
  }
}

export async function agregarEquipo({
  id,
  teamName,
}: {
  id: string;
  teamName: string;
}) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEETID;

    if (!id || !teamName) {
      throw new Error("Faltan datos: id o teamName");
    }

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A1:Z100",
    });

    const rows = readRes.data.values;
    if (!rows || rows.length === 0) {
      throw new Error("No se encontraron datos");
    }

    let targetRow = -1;
    let targetCol = "";
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
      throw new Error(`No se encontró el ID '${id}'`);
    }

    // Evitamos duplicar el teamName si ya está
    if (currentValue.includes(`-${teamName}`)) {
      throw new Error(`El equipo '${teamName}' ya está asignado al jugador`);
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

    revalidatePath('/market');
    return `${updatedValue}`;
  } catch (error) {
    console.error("Error en POST:", error);
  }
}

function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function removerEquipo({
  id,
  teamName,
}: {
  id: string;
  teamName: string;
}) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEETID;


    if (!id || !teamName) {
      throw new Error("Faltan datos: id o teamName");
    }

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A1:Z100",
    });

    const rows = readRes.data.values;
    if (!rows || rows.length === 0) {
      throw new Error("No se encontraron datos");
    }

    let targetRow = -1;
    let targetCol = "";
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
      throw new Error(`No se encontró el ID ${id}`);
    }

    // Verificar si contiene el teamName
    if (!currentValue.includes(`-${teamName}`)) {
      throw new Error(`El teamName '${teamName}' no está presente en el valor actual`);
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
    revalidatePath('/market');
    return updatedValue;

  } catch (error) {
    console.error("Error en DELETE:", error);
  }
}


async function getLastRowInColumnAG(sheets:any, spreadsheetId:any) {
    const range = "AG:AG";
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  
    const rows = res.data.values || [];
    return rows.length + 1; // La siguiente fila vacía
  }
  
  async function appendToColumnAG(sheets:any, spreadsheetId:any, value:any) {
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

export async function transferir(req: any) {
  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.SPREADSHEETID;

    const { value } = req;
    
    if (!value) {
       throw new Error("Falta el valor a agregar");
    }

    await appendToColumnAG(sheets, spreadsheetId, value);

    revalidatePath("/market")
    return `${value}`
  } catch (error) {
    console.error("Error en POST:", error);
  }
}
