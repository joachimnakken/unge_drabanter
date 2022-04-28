import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import React, { useState } from "react";
import { useRouter } from "next/router";
import firebase from "../libs/fb";

var db = firebase.firestore();

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const setPageLoading = useSetRecoilState(pageLoaderAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length <= 4) {
      setError("Feil i passord eller email");
      return;
    }
    try {
      setIsLoading(true);
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      var docRef = await db.collection("users").doc();
      const idToken = await firebase?.auth()?.currentUser?.getIdToken(true);
      if (!idToken) return;
      await docRef.set({
        firstName,
        lastName,
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
    </div>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default Login;
