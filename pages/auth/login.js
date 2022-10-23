import LoginForm from "../../components/auth/LoginForm";
import Layout from "../../components/layout/Layout";
import { getSession } from "next-auth/react";

function Login() {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
export default Login;
