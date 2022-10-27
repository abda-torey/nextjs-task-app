import { connectToDb } from "../../../lib/db";
import mongoose from 'mongoose';

async function handler(req,res){
    if(!req.method === 'DELETE'){
        return;
    }
    const taskId = req.body.taskId;

    console.log(taskId)

    const client = await connectToDb();
    const db = client.db();
    const taskCollection = db.collection('tasks');

    const result = await taskCollection.deleteOne({_id : mongoose.Types.ObjectId(taskId)});


    client.close();
    res.status(201).json({message : 'task deleted successfully'})

}

export default handler;