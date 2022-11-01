import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "../../../lib/db";
import { verifypassword } from "../../../lib/auth";

export default nextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDb();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("No User Found");
        }

        const isValid = await verifypassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("password is incorect");
        }

        return {
          email: user.email,
        };

        client.close();
      },
    }),
  ],
  secret : process.env.SECRET,
});
