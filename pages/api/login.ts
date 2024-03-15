import type { NextApiRequest, NextApiResponse } from "next";
import app from '../../firebase/clientApp'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { compareSync} from 'bcrypt';


const db = getFirestore(app);
export default async function handleer( req: NextApiRequest, res: NextApiResponse ) {
    if(req.method !== "POST") {
        console.log("Request method:", req.method);
        return res.status(405).json({ message: "Method not allowed" });
    }
    if(!req.body.username || !req.body.password) return res.status(400).json({ message: "Please fill in all fields" });
    if(req.body.password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    try{
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        let foundUser = false; 
        userSnapshot.forEach(async (doc) => {
            if (doc.data().username === req.body.username) {
                const isPasswordMatch = compareSync(req.body.password, doc.data().password);
                if (isPasswordMatch) {
                    res.status(200).json({ message: "Successfully logged in", user: { username: doc.data().username, email: doc.data().email } });
                    console.log("Successfully logged in", doc.data().username, doc.data().email);
                    foundUser = true;
                }
            }
        });

        if (!foundUser) {
            res.status(400).json({ message: "Invalid credentials" });
        }

    }catch(error){
        console.error("Error logging in user: ", error);
        res.status(500).json({ message: "Error logging in user" });
    }

    res.status(200).json({ message: "Successfully logged in" });    
}