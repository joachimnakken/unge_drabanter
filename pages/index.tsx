import firebase from "firebase/app";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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
    <main
      className="flex flex-col items-center justify-center h-full px-6"
      onSubmit={handleSubmit}
    >
      <div className="mt-1">
        <Image src="/logo.svg" width={178} height={189} alt="lknjbj" />
      </div>
      <div>
        <strong>unge_drabanter</strong>
      </div>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="w-full py-2 mt-10 font-bold border-2 rounded-full"
          onChange={({ target: { value = "" } }) => setEmail(value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full py-2 mt-2 font-bold border-2 rounded-full"
          onChange={({ target: { value = "" } }) => setPassword(value)}
        />
        <div className="mt-10 text-center">
          <button className="px-10 py-4 bg-yellow-300 rounded-full">
            <strong>Login</strong>
          </button>
          <div className="mt-5">Register</div>
        </div>
        {error && <div className="text-red"> {error}</div>}
      </form>
    </main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default Login;
