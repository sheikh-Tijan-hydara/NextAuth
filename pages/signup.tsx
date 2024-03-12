import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) return alert("Please fill in all fields");
        if (password !== confirmPassword) return alert("Passwords do not match");
        if (password.length < 6) return alert("Password must be at least 6 characters");
        fetch("/api/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password, confirmPassword }),
        }).then((res) => res.json()).then((data) => alert(data.message)); 
    }

    return (
        <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
        <form
            className="flex flex-col items-center justify-center w-96 p-8 bg-white rounded-lg shadow-lg text-black"
            action=""
            onSubmit={handleSubmit}
        >
            <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
            <input
            className="w-full p-4 mb-4 border rounded-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
             <input
            className="w-full p-4 mb-4 border rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            className="w-full p-4 mb-4 border rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
             <input
            className="w-full p-4 mb-4 border rounded-lg"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="w-full p-4 mb-4 bg-blue-500 text-white rounded-lg">
            Sign Up
            </button>
            <Link href="/">
            <p className="text-gray-500">login</p>
            </Link>
        </form>
        </main>
    );
    }
