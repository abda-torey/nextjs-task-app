
import { MongoClient } from "mongodb" 

export async function connectToDb(){
    const client = await MongoClient.connect(process.env.DB_URL);
    return client;
}

