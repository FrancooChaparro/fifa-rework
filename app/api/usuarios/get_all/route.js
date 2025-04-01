// import { query } from " @/lib/db";

// export async function GET() {
//   try {
//     const usuarios = await query("SELECT * FROM usuarios", []);
//     return Response.json(usuarios);
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }
//db local PostgresSQL


import { supabase } from " @/lib/supabase"; 

export async function GET() {
  const { data, error } = await supabase.from('users').select('*');
  
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
