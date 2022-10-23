import { useSession } from "next-auth/react";
import Layout from "../layout/Layout";
function UserProfile() {
  return (
    <Layout>
      <h3>User Is Logged In</h3>
    </Layout>
  );
}

export default UserProfile;
