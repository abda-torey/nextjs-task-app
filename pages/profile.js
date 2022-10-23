import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/UserProfile";

function Profile(props){
    return <UserProfile />
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

    return {
        props: {
            session
        },
    }



}

export default Profile;