"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EmailIcon, PasswordIcon } from " @/Icons/Icons";
import { supabase } from " @/lib/supabase";

interface Usuario {
    id: number;
    name: string;
    email: string;
    password?: string;
    created_at?: any;
}

export default function LoginPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [variant, setVariant] = useState("Register");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setMessage("");
    //     const formData = new FormData(e.currentTarget);
    //     const email = formData.get('email') as string;
    //     const password = formData.get('password') as string;

    //     if (!email || !password) {
    //         setLoading(false);
    //         setMessage('Email and Password required');
    //         setTimeout(() => {
    //             setMessage("");
    //         }, 3000)
    //         return;
    //     }

    //     const response = await signIn('credentials', {
    //         email,
    //         password,
    //         redirect: false
    //     });


    //     if (!response?.ok || response?.status === 401) {
    //         setLoading(false);
    //         setMessage('Credenciales incorrectas');
    //         setTimeout(() => {
    //             setMessage("");
    //         }, 3000)
    //         return;
    //     } else {
    //         setTimeout(() => {
    //             router.push('/')
    //             return () => { setLoading(false); }
    //         }, 2000);
    //     }
    // };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            setLoading(false);
            setMessage('Email and Password required');
            setTimeout(() => {
                setMessage("");
            }, 3000)
            return;
        }

        const response = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (!response?.ok || response?.status === 401) {
            setLoading(false);
            setMessage('incorrect credentials');
            setTimeout(() => {
                setMessage("");
            }, 3000)
            return;
        } else {
            setTimeout(() => {
                router.push('/')
                return () => { setLoading(false); }
            }, 2000);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("text") as string;


        if (!email || !password || !name) {
            setLoading(false);
            setMessage("Please fill in the fields");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        try {
            const response = await fetch("/api/usuarios/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                setMessage(responseData.error || "incorrect credentials");
                throw new Error(responseData.error || "incorrect credentials");
            }

            setMessage("Registration successful, redirecting...");
            setTimeout(async () => {
                await setVariant('Login')
                setMessage('')
                setName('')
                setEmail('')
                setPassword('')
                setLoading(false);
            }, 2000);
        } catch (error) {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const toggleVariant = useCallback(() => {
        setMessage("")
        setVariant((currentVariant) => currentVariant === "Login" ? "Register" : "Login")
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgGames transition-all duration-200 text-[#ffffff]">


            <form onSubmit={variant === "Login" ? handleLogin : handleRegister} className="p-6 w-full md:w-[420px] flex flex-col gap-1">
                <p className="text-lg h-[50px] pl-4 w-full text-center font-geistRegular">{variant}</p>
                {
                    variant === "Register"
                        ? <>
                            <div className="relative h-[45px]">
                                <div className="absolute top-0 left-0 flex h-full justify-center items-center ">
                                    <EmailIcon />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    className="w-full px-4 pl-8 py-3 text-center bg-transparent focus:outline-none focus:border-none active:border-none"
                                    id="text"
                                    name="text"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="border-b-[1px] border-gray-700" />
                        </>
                        : null
                }
                <div className="relative h-[45px]">
                    <div className="absolute top-0 left-0 flex h-full justify-center items-center ">
                        <EmailIcon />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 pl-8 py-3 text-center bg-transparent focus:outline-none focus:border-none active:border-none"
                        id="email"
                        name="email"
                        autoComplete="off"
                    />
                </div>
                <div className="border-b-[1px] border-gray-700" />
                <div className="relative h-[45px]">
                    <div className="absolute top-0 left-0 flex h-full justify-center items-center ">
                        <PasswordIcon />
                    </div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 pl-8 bg-transparent text-center focus:outline-none focus:border-none active:border-none"
                        autoComplete="off"
                    />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-primaryRed h-[45px] mt-3 p-2 lg:hover:opacity-90 cursor-pointer">
                    {loading ? "LOADING..." : "SIGN IN"}
                </button>
                <div className="flex flex-col">
                    <div className="text-[13px] h-[30px] flex items-center justify-center w-full text-center font-geistRegular">
                       <span>
                        {
                            message !== ""
                            ? message
                            : null
                        }
                        </span>
                    </div>
                    {
                       <button className="text-[12px] font-geistRegular text-gray-300" onClick={toggleVariant}>
                       {variant === "Login" ? (
                         <>
                           Don't have an account? <span className="text-primaryRed/80 text-[14px]">Sign up</span>
                         </>
                       ) : (
                         <>
                           Already have an account? <span className="text-primaryRed/80 text-[14px]">Login</span>
                         </>
                       )}
                     </button>
                     
                    }
                </div>
            </form>

            {/* <button className="h-[40px] bg-red-300 px-3 rounded-sm mt-2 hover:opacity-80" onClick={() => signOut({ callbackUrl: "/" })}>CERRAR SESSION</button> */}
        </div>
    );
}

/*
# Created by Vercel CLI
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_w2SgTLkzlWjDASO7_RYdyUZj5p8wbjIoOq61Rvv63hV3ZDX"
NEXTAUTH_SECRET="SedIEDssfbfPmWfgLkYMpHFymR442VWfqrWGElIH6Vc="
NEXTAUTH_URL=http://localhost:3001
AUTH_USER="admin@admin.com"
AUTH_PASSWORD="admin"
DATABASE_URL=postgresql://postgres:admin@localhost:5432/office




POSTGRES_URL="postgres://postgres.gpaelrcgjfrbvnhejyqb:kQbor04KS9IQY2JP@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x"
POSTGRES_PRISMA_URL="postgres://postgres.gpaelrcgjfrbvnhejyqb:kQbor04KS9IQY2JP@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x"
SUPABASE_URL="https://gpaelrcgjfrbvnhejyqb.supabase.co"
NEXT_PUBLIC_SUPABASE_URL="https://gpaelrcgjfrbvnhejyqb.supabase.co"
POSTGRES_URL_NON_POOLING="postgres://postgres.gpaelrcgjfrbvnhejyqb:kQbor04KS9IQY2JP@aws-0-sa-east-1.pooler.supabase.com:5432/postgres?sslmode=require"
SUPABASE_JWT_SECRET="1asyFXj1hw2EPWa/o8tcRvOSm/E477Iyih/qwU9pzLUjyjDmfoxKhWkPz5WqU7Yd69EurnrWLyo3r9IjA+kqlw=="
POSTGRES_USER="postgres"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYWVscmNnamZyYnZuaGVqeXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTExNTUsImV4cCI6MjA1OTAyNzE1NX0.-TlJLrIVRM46AhmoIRJ_1Qfrvm77wE7lUpLGQIW-z9M"
POSTGRES_PASSWORD="kQbor04KS9IQY2JP"
POSTGRES_DATABASE="postgres"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYWVscmNnamZyYnZuaGVqeXFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzQ1MTE1NSwiZXhwIjoyMDU5MDI3MTU1fQ.EZvlZcoFSqIIGOj0E8pBVXIB02p3ZpXjXO13l7tBFAc"
POSTGRES_HOST="db.gpaelrcgjfrbvnhejyqb.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYWVscmNnamZyYnZuaGVqeXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTExNTUsImV4cCI6MjA1OTAyNzE1NX0.-TlJLrIVRM46AhmoIRJ_1Qfrvm77wE7lUpLGQIW-z9M" */