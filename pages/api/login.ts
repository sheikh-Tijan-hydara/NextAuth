import type { NextApiRequest, NextApiResponse } from "next";
import app from '../../firebase/clientApp'; 
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

const db = getFirestore(app);
export default async function handleer( req: NextApiRequest, res: NextApiResponse ) {
    if(req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
    if(!req.body.username || !req.body.password) return res.status(400).json({ message: "Please fill in all fields" });
    if(req.body.password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    try{
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        userSnapshot.forEach((doc) => {
            if(doc.data().username === req.body.username && doc.data().password === req.body.password){
                res.status(200).json({ message: "Successfully logged in" , user: { username: doc.data().username, email: doc.data().email}});
            }
        });

    }catch(error){
        console.error("Error logging in user: ", error);
        res.status(500).json({ message: "Error logging in user" });
    }

    res.status(200).json({ message: "Successfully logged in" });    
}