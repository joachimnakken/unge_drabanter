import firebase from "firebase/app";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const setPageLoading = useSetRecoilState(pageLoaderAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let idToken = null;
    if (!email || password.length <= 4) {
      setError("Feil i passord eller email");
      return;
    }
    try {
      setIsLoading(true);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      idToken = await firebase?.auth().currentUser?.getIdToken(true);
      if (!idToken) return;
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
      setError(err?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="px-6" onSubmit={handleSubmit}>
      <form>
        <input
          type="email"
          placeholder="email"
          className="w-full"
          onChange={({ target: { value = "" } }) => setEmail(value)}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full"
          onChange={({ target: { value = "" } }) => setPassword(value)}
        />
        <button>Login</button>
        {error && <div className="text-red"> {error}</div>}
      </form>
    </main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default Login;
