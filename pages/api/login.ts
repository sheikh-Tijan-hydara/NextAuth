import type { NextApiRequest, NextApiResponse } from "next";

export default function handleer( req: NextApiRequest, res: NextApiResponse ) {
    if(req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
    if(!req.body.username || !req.body.password) return res.status(400).json({ message: "Please fill in all fields" });
    if(req.body.password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    res.status(200).json({ message: "Successfully logged in" });    
}