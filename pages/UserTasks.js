import { getSession } from "next-auth/react";
import Tasks from "../components/tasks/Tasks";
import { connectToDb } from "../lib/db";

function UserTasks(props){
 
    return <Tasks userTasks = {props.userTasks} />
}


export async function getServerSideProps(context){
    const session = await getSession({req: context.req});


    if(!session){
        return {
            redirect : {
                destination : '/auth/login',
                permanent : false
            }
        }
    }

    const email = session.user.email;
    const client = await connectToDb();

    const db = client.db();

    const results = await db.collection('tasks').find({'email' : email}).toArray();

    const userTasks = JSON.parse(JSON.stringify(results))

    

    return {    
        props: {
            session,userTasks
        }
    }
}
export default UserTasks;