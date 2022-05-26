import jwtDecode from "jwt-decode";
import type { NextPage } from "next";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Image from "next/image";

import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
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

  console.log("AuthUser", AuthUser);

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

  const image = userData?.imageUrl || "/images/logo.png";

  return (
    <>
      <Meta title="Young drabants" description="Johnny Tester" />
      <NavBar />
      <main className="p-4">
        <section className="mx-auto border lg:max-w-screen-xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="mb-4">
              Hei, {userData.firstName} {userData.lastName}
            </h1>

            <Image
              src={image}
              height={200}
              width={200}
              alt={userData.firstName}
              className="rounded-full overflow-clip"
            />
          </div>
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

export default withAuthUser<AppProps>()(AuthedApp);
