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


import { NextRequest } from "next/server";
import { supabase } from " @/lib/supabase";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ error: "Required fields are missing" }), { status: 422 });
        }

        const { data: existingUser, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (userError && userError.code !== "PGRST116") {
            return new Response(JSON.stringify({ error: "Error verifying existing user" }), { status: 500 });
        }

        if (existingUser) {
            return new Response(JSON.stringify({ error: "The user is already registered" }), { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const { data, error } = await supabase
            .from("users")
            .insert([{ name, email, password: hashedPassword }]);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "User created", data }), { status: 201 });

    } catch (err) {
        console.log("Server error:", err); 
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
