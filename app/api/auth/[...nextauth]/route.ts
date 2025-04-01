import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from " @/lib/supabase";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
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
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// if (credentials?.email !== process.env.AUTH_USER) return null
// if (credentials?.password !== process.env.AUTH_PASSWORD) return null
// const user = {
//     id: '1',
//     email: process.env.AUTH_USER,
// };