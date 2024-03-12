import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!username || !password) return alert("Please fill in all fields");
    if (password.length < 6)
      return alert("Password must be at least 6 characters");
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <form
        className="flex flex-col items-center justify-center w-96 p-8 bg-white rounded-lg shadow-lg"
        action=""
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold mb-4 text-black">Login</h1>
        <input
          className="w-full p-4 mb-4 border rounded-lg text-black"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full p-4 mb-4 border rounded-lg text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full p-4 mb-4 bg-blue-500 text-white rounded-lg">
          Login
        </button>
        <Link href="/signup">
          <p className="text-gray-500">sign up</p>
        </Link>
      </form>
    </main>
  );
}
