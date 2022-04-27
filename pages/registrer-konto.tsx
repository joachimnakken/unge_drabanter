import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import { useState } from "react";
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

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!email || password.length <= 4) {
      setError("Feil i passord eller email");
      return;
    }
    try {
      setIsLoading(true);
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      var docRef = await db.collection("users").doc();

      //Just a little hack.. im tired. Fix later.
      const { Aa: token = "" } = res.user;

      await docRef.set({
        firstName,
        lastName,
        id: docRef.id,
      });

      await fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        credentials: "include",
      });
      router.push(`/app`);
    } catch (err) {
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
