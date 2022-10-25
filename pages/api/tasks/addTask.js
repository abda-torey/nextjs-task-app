import { connectToDb } from "../../../lib/db";

async function handler(req,res){

    if(!req.method === 'POST'){
        return;
    }

    const data = req.body;

    const {taskName,taskDate,userEmail} = data;

    if(!taskName || taskDate){
        res.status(422).json({message : 'task and date should be there'})
    }


    const client = await connectToDb();

    const db = client.db();

    const tasksCollection = db.collection('tasks');

    const result = await tasksCollection.insertOne({
        task : taskName,
        date : taskDate,
        email : userEmail
    });
    console.log(result);
    client.close();
    res.status(201).json({message: 'data added successfully'})






}

export default handler;