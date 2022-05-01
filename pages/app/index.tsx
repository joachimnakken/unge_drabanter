import jwtDecode from "jwt-decode";
import type { NextPage } from "next";
import {
  AuthAction,
  useAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import VinmonopoletProductSearch from "../../components/VinmonopoletProductSearch";

import firebase from "../../libs/fb";

var db = firebase.firestore();

type AppProps = {
  token: string | null;
};

const AuthedApp: NextPage<AppProps> = ({ token = "" }) => {
  const AuthUser = useAuthUser();
  const [userData, setUserData] = useState<any>({});

  // Since we store token in cookie, we could do this on the server, but it's easier to do it on the client side for now
  // This should be done with RTK, but just wanted to show how ez it is to fetch data.

  useEffect(() => {
    (async () => {
      if (!token) return;
      const decodedToken: any = jwtDecode(token);
      const user_id: string = decodedToken?.user_id;
      const userDocument = await db.collection("/users").doc(user_id);
      await userDocument
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })();
  }, [token]);

  return (
    <>
      <Head>
        <title>Young drabants</title>
        <meta name="description" content="Johnny Tester" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <main className="p-4 space-y-4 grow">
        <h1>Hei, {userData.firstName}</h1>
        <section className="p-4">
          <VinmonopoletProductSearch />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken();
  return {
    props: { token },
  };
});

export default AuthedApp;
