"use client";
import { useState, useCallback, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EmailIcon, PasswordIcon } from " @/Icons/Icons";


export default function LoginPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [variant, setVariant] = useState("Register");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMessage("");
    }, [variant]);

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
            setTimeout(() => {
                setMessage("");
                setName("");
                setEmail("");
                setPassword("");
                setLoading(false);
                setVariant("Login"); 
            }, 2000);
            // setTimeout(async () => {
            //     await setVariant('Login')
            //     setMessage('')
            //     setName('')
            //     setEmail('')
            //     setPassword('')
            //     setLoading(false);
            // }, 2000);
        } catch (error) {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === "Login" ? "Register" : "Login")
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bgGames transition-all duration-200 text-[#ffffff]">
            <form onSubmit={variant === "Login" ? handleLogin : handleRegister} className="px-6 pt-6 w-full md:w-[420px] flex flex-col gap-1">
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
                   
                </div>
            </form>
            {
                       <button className="text-[12px] font-geistRegular text-gray-300" onClick={toggleVariant}>
                       {variant === "Login" ? (
                         <>
                            {`Don't have an account?`} <span className="text-[#f5456c] text-[14px]">Sign up</span>
                         </>
                       ) : (
                         <>
                           Already have an account? <span className="text-[#f5456c] text-[14px]">Login</span>
                         </>
                       )}
                     </button>
                    }
        </div>
    );
}

