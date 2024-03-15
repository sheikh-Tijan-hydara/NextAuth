import type { NextApiRequest, NextApiResponse } from "next";
import app from '../../firebase/clientApp'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

const db = getFirestore(app);

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method !== "POST") return res.status(405).json({message: "Method not allowed"});
    if(req.body.password !== req.body.confirmPassword) return res.status(400).json({message: "Passwords do not match"});
    if(req.body.password.length < 6) return res.status(400).json({message: "Password must be at least 6 characters"});
    if(!req.body.username || !req.body.email || !req.body.password) return res.status(400).json({message: "Please fill in all fields"});

    try{
        const usersCollection = collection(db, 'users');
        const UserRef = await addDoc(usersCollection, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json({message: "Successfully signed up", user: { username: req.body.username, email: req.body.email }});
    } catch (error){
        res.status(500).json({message: "Error signing up user"});
    }  
}