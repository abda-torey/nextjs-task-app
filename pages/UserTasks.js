import { getSession } from "next-auth/react";
import Tasks from "../components/tasks/Tasks";
function UserTasks(props){
    return <Tasks />
}


export async function getServerSideProps(context){
    const session = await getSession({req: context.req})

    if(!session){
        return {
            redirect : {
                destination : '/auth/login',
                permanent : false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}
export default UserTasks;