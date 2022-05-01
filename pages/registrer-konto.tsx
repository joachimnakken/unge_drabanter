import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import React, { useState } from "react";
import { useRouter } from "next/router";
import firebase from "../libs/fb";
import Image from "next/image";

const db = firebase.firestore();

// Github signup works. But might be missing some data(Like firstName, lastName), so I dont think it's worth it.
// const provider = new firebase.auth.GithubAuthProvider();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const setPageLoading = useSetRecoilState(pageLoaderAtom);

  const createUser = async () => {
    const uid = await firebase?.auth()?.currentUser?.uid;
    const docRef = await db.collection("users").doc(uid);
    const idToken = await firebase?.auth()?.currentUser?.getIdToken(true);
    if (!idToken) return;
    await docRef.set({
      firstName,
      lastName,
      imageUrl: "",
      id: docRef.id,
    });

    await fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: idToken,
      },
      credentials: "include",
    });
    router.push(`/app`);
  };

  // const signupWithGithub = async () => {
  //   let imageUrl = "";

  //   try {
  //     setIsLoading(true);
  //     const res = await firebase.auth().signInWithPopup(provider);
  //     const email = res.user.email
  //     console.log({ res });
  //     imageUrl = res?.additionalUserInfo?.profile?.avatar_url as string;

  //     // await createUser(imageUrl);
  //   } catch (err: any) {
  //     console.log({ err });
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // --------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length <= 4) {
      setError("Feil i passord eller email");
      return;
    }
    try {
      setIsLoading(true);
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await createUser();
    } catch (err: any) {
      console.log({ err });
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Laster</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 border ">
      <div className="mt-1">
        <Image src="/logo.svg" width={178} height={189} alt="lknjbj" />
      </div>
      <form onSubmit={handleSubmit} className="md:w-1/4">
        <input
          placeholder="Epost-adresse"
          type="email"
          className="w-full py-2 mt-10 font-bold border-2 rounded-full"
          onChange={({ target: { value = "" } }) => setEmail(value)}
        />

        <input
          placeholder="Passord"
          type="password"
          className="w-full py-2 mt-6 font-bold border-2 rounded-full"
          onChange={({ target: { value = "" } }) => setPassword(value)}
        />

        <input
          placeholder="Fornavn"
          type="text"
          className="w-full py-2 mt-6 font-bold border-2 rounded-full"
          onChange={({ target: { value = "" } }) => setFirstName(value)}
        />

        <input
          placeholder="Etternavn"
          type="text"
          className="w-full py-2 mt-6 font-bold border-2 rounded-full"
          onChange={({ target: { value = "" } }) => setLastName(value)}
        />
        <div className="mt-4 text-center">
          <button className="px-10 py-4 bg-yellow-300 rounded-full">
            Opprett konto
          </button>
        </div>
        {error && <div className="text-red"> {error}</div>}
      </form>
      {/* <button onClick={() => signupWithGithub()}>
        <div>Logg inn med Github</div>
      </button> */}
    </div>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default Login;
