import firebase from "firebase/app";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Input from "../components/Input";

import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";

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
      className="grid flex-1 h-full p-4 place-items-center "
      onSubmit={handleSubmit}
    >
      <section className="flex flex-col col-span-full">
        <div className="flex flex-col items-center ">
          <Image src="/logo.svg" width={178} height={189} alt="logo" />
          <strong>unge_drabanter</strong>
        </div>

        <form className="w-full mt-8" autoComplete="off">
          <Input
            type="email"
            label="email"
            name="email"
            Icon={HiOutlineMail}
            value={email}
            onChange={({ target: { value = "" } }) => setEmail(value)}
          />
          <Input
            className="mt-8"
            type="password"
            label="password"
            name="password"
            Icon={MdPassword}
            value={password}
            onChange={({ target: { value = "" } }) => setPassword(value)}
          />
          <div className="mt-8 text-center">
            <button className="p-4 px-10 bg-yellow-300 rounded-full">
              <strong>Login</strong>
            </button>
            <div className="mt-4">
              <Link href="registrer-konto">
                <a className="underline">Register</a>
              </Link>
            </div>
          </div>
          {error && <div className="text-red"> {error}</div>}
        </form>
      </section>
    </main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default Login;
