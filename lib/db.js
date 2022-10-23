
import { MongoClient } from "mongodb" 

export async function connectToDb(){
    const client = await MongoClient.connect('mongodb+srv://abdatorey:code5685@cluster0.byp9vck.mongodb.net/users?retryWrites=true&w=majority');
    return client;
}

