import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import React, { useState } from "react";
import { useRouter } from "next/router";
import firebase from "../libs/fb";

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
    var docRef = await db.collection("users").doc();
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
    <div className="p-6 border">
      <form onSubmit={handleSubmit}>
        Epost-adresse
        <input
          type="email"
          className="w-full p-1 my-2 border rounded-md"
          onChange={({ target: { value = "" } }) => setEmail(value)}
        />
        Passord
        <input
          type="password"
          className="w-full p-1 my-2 border rounded-md"
          onChange={({ target: { value = "" } }) => setPassword(value)}
        />
        Fornavn
        <input
          type="text"
          className="w-full p-1 my-2 border rounded-md"
          onChange={({ target: { value = "" } }) => setFirstName(value)}
        />
        Etternavn
        <input
          type="text"
          className="w-full p-1 my-2 border rounded-md"
          onChange={({ target: { value = "" } }) => setLastName(value)}
        />
        <button className="p-2 mt-8 text-2xl text-gray-800 bg-blue-300 border rounded">
          Opprett konto
        </button>
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
