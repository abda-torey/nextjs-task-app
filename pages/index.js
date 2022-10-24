import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/Layout'

import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'
import { getSession } from 'next-auth/react'

export default function Home(props) {
  return (
    <Layout>
      <LoginForm />

    </Layout>
   
  )
}

export async function getServerSideProps(context){

  const session = await getSession({req: context.req});

  if(session){
    return {
      redirect : {
        destination : '/UserTasks',
        permanent: false
      }
    }
  }

  return {
    props : {
      session
    }
  }
}
