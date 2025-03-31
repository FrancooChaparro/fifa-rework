// app/api/usuarios/route.js

// import { query } from ' @/lib/db'; // Asegúrate de que esta ruta sea correcta
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     // Leer el cuerpo de la solicitud
//     const { nombre, email } = await request.json();

//     // Validación básica
//     if (!nombre || !email) {
//       return NextResponse.json({ error: 'Nombre y email son requeridos' }, { status: 400 });
//     }

//     // Insertar en la base de datos
//     const result = await query(
//       'INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *',
//       [nombre, email]
//     );

//     // Retornar la respuesta con el usuario creado
//     return NextResponse.json(result[0], { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Hubo un problema al crear el usuario' }, { status: 500 });
//   }
// }


import { supabase } from " @/lib/supabase";

export async function POST(req) {
  const { nombre, email } = await req.json();

  const { data, error } = await supabase
    .from('usuarios')
    .insert([
      { nombre, email }
    ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
}
