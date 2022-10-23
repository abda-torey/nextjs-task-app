import { hashPassword } from "../../../lib/auth";
import { connectToDb } from "../../../lib/db"


async function handler(req,res) {
    if(!req.method === 'POST'){
        return;

    }
        
        const data = req.body;
        const {email, password} = data;

        if(!email || !email.includes('@') || !password || !password.trim().length > 7){
            res.status(422).json({message: 'email and password need to be there'});
            return;
        }
        const client = await connectToDb();

        
        const db = client.db();

        const existingUser = await db.collection('users').findOne({email : email})

        if(existingUser){
            res.status(422).json({message: 'user exists'})
            client.close();
            return;
        }

        const usersCollection = db.collection('users');
        const hashedPassword = await hashPassword(password)
        
        const result = await usersCollection.insertOne({
            email: email,
            password : hashedPassword
        });
        console.log(result);
        client.close();
        res.status(201).json({ message : 'data added succesfully'})
    }
    

export default handler;