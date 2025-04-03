import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from " @/lib/supabase";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

// const NEXTAUTH_URL =
//     process.env.NODE_ENV === "production"
//         ? process.env.NEXTAUTH_URL_PROD
//         : process.env.NEXTAUTH_URL_DEV;


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code",
                }
              }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required");
                    }

                    const { data: user, error } = await supabase
                        .from("users")
                        .select("*")
                        .eq("email", credentials.email)
                        .single();

                    if (!user) {
                        throw new Error("User not found");
                    }
                    if (error) {
                        console.error("Error searching for user:", error);
                        throw new Error("Error searching for user");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect password");
                    }

                    return { id: user.id, name: user.name, email: user.email };

                } catch (error) {
                    console.error("Authorization error:", error);
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user }) {
          try {
            // Verificar si el usuario ya existe en Supabase
            const { data: existingUser, error: userError } = await supabase
              .from("users")
              .select("*")
              .eq("email", user.email)
              .single();
    
            if (userError && userError.code !== "PGRST116") {
              console.error("Error checking user:", userError);
              return false;
            }
    
            if (!existingUser) {
              // Si el usuario no existe, lo creamos en la base de datos
              const { error } = await supabase
                .from("users")
                .insert([{ name: user.name, email: user.email, password: null }]); // Google no proporciona contraseñas
    
              if (error) {
                console.error("Error inserting user:", error);
                return false;
              }
            }
    
            return true; // Permitir login
          } catch (err) {
            console.error("Sign-in error:", err);
            return false;
          }
        },
      },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: `${process.env.NEXTAUTH_URL}/auth`,
    },
    debug: process.env.NODE_ENV !== "production",
    session: {
        strategy: "jwt",
    },
});

export { handler as GET, handler as POST };
