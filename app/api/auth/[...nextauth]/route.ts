import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
                        throw new Error("Email y contraseña son obligatorios");
                    }
                    if (credentials?.email !== process.env.AUTH_USER) return null
                    if (credentials?.password !== process.env.AUTH_PASSWORD) return null

                    //usuario de base de datos
                    const user = {
                        id: '1',
                        email: process.env.AUTH_USER,
                    };

                    return user;

                } catch (error) {
                    console.error("Error in authorize function:", error);
                    return null
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