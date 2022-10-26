import { connectToDb } from "../../../lib/db";

async function handler(req,res){

    const email = req.body.email;
    const client = await connectToDb();

    const db = client.db();

    const tasksCollection = db.collection('users');

    const results  = await tasksCollection.findOne({email : email});

    console.log(results)
}

export default handler;