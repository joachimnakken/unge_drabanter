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
import { isNotEmptyObject } from "../../helpers/object";

import firebase from "../../libs/fb";
import {
  RatedProductDocument,
  UserDataInterface,
  VinmonopoletProductWithImage,
} from "../../types";

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
    const alreadyRatedProduct: RatedProductDocument =
      allMyRatings.find(
        (r: RatedProductDocument) =>
          r.basic.productId === product.basic.productId
      ) || ({} as RatedProductDocument);
    // ¯\_(ツ)_/¯
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
      console.log({ alreadyRatedProduct });
      if (isNotEmptyObject(alreadyRatedProduct)) {
        await db
          .collection("/ratings")
          .doc(alreadyRatedProduct?.id)
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

  return (
    <>
      <Head>
        <title>Young drabants</title>
        <meta name="description" content="Johnny Tester" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4 space-y-4 bg-slate-300 grow">
        <h1>Hei, {userData.firstName}</h1>
        <section>
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
  const decodedToken: any = jwtDecode(token);
  const id: string = decodedToken?.user_id;

  const userDocument = await db.collection("/users").doc(id);
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
