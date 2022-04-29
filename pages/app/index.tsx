import jwtDecode from "jwt-decode";
import type { NextPage } from "next";
import {
  AuthAction,
  useAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Head from "next/head";
import VinmonopoletProductSearch from "../../components/VinmonopoletProductSearch";
import useAllRatings from "../../hooks/useAllRatings";

import firebase from "../../libs/fb";
import { UserDataInterface, VinmonopoletProductWithImage } from "../../types";

var db = firebase.firestore();

type AppProps = {
  userData: UserDataInterface;
};

const AuthedApp: NextPage<AppProps> = ({ userData }) => {
  const allMyRatings = useAllRatings(userData.id);

  const handleRateProduct = async (
    product: VinmonopoletProductWithImage,
    rating: Number
  ) => {
    const alreadyRatedProduct = allMyRatings.find(
      (rating) => rating?.basic?.productId === product.basic.productId
    );

    const newRating = {
      ...product,
      rating,
      ratedById: userData.id,
      ratedFromGroupId: "",
    };

    if (
      window.confirm(
        `Are you sure you want to rate ${product.basic.productShortName} ${rating} stars?`
      )
    ) {
      if (alreadyRatedProduct) {
        await db
          .collection("/ratings")
          .doc(alreadyRatedProduct.id)
          .update(newRating);
      } else {
        try {
          const docRef = await db.collection("/ratings").doc();
          docRef.set({ ...newRating, id: docRef.id });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  console.log({ allMyRatings });

  return (
    <>
      <Head>
        <title>Young drabants</title>
        <meta name="description" content="Johnny Tester" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-4 bg-slate-300 grow">
        <h1>Hei, {userData.firstName}</h1>
        <section className="p-4">
          <VinmonopoletProductSearch
            onRateProduct={handleRateProduct}
            allMyRatings={allMyRatings}
          />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  let userData;
  const token = (await AuthUser.getIdToken()) as string;
  const { user_id = "" } = jwtDecode(token);

  const userDocument = await db.collection("/users").doc(user_id);
  await userDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  return {
    props: { userData },
  };
});

export default AuthedApp;
