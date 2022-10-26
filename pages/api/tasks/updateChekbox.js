import { connectToDb } from "../../../lib/db";
import mongoose from 'mongoose';

async function handler(req,res){
    const isChecked = req.body.isChecked;
    const taskId = req.body.taskId;


    const client = await connectToDb();

    const db = client.db();
    const taskCollection = db.collection('tasks');

    

    const result = await taskCollection.updateOne({ _id : mongoose.Types.ObjectId(taskId)}, {$set : { checked : isChecked}});
    client.close();
    res.status(200).json({message: result})
    
}
export default handler;