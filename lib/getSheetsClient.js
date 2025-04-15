import { google } from "googleapis";

// Función para autorizar el cliente
export async function getSheetsClient() {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); 
    const client = new google.auth.JWT(
      process.env.GOOGLE_API_EMAIL,
      null,
      privateKey,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
  
    await client.authorize();
  
    return google.sheets({ version: "v4", auth: client });
  }
  