import firebase from "firebase/app";
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";
import { Button, Input, Stack } from "@mantine/core";

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
    <main>
      <Stack align="center">
        <Image src="/logo.svg" width={178} height={189} alt="logo" />
        <strong>unge_drabanter</strong>

        <form onSubmit={handleSubmit}>
          <Stack>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              icon={<HiOutlineMail />}
              value={email}
              onChange={({ target: { value = "" } }) => setEmail(value)}
              autoComplete="email"
            />
            <Input
              placeholder="Passord"
              type="password"
              name="password"
              icon={<MdPassword />}
              value={password}
              onChange={({ target: { value = "" } }) => setPassword(value)}
              autoComplete="current-password"
            />
            <Button type="submit" variant="filled">
              <strong>Login</strong>
            </Button>

            <Link href="registrer-konto">
              <a className="underline">Register</a>
            </Link>
            {error && <div>{error}</div>}
          </Stack>
        </form>
      </Stack>
    </main>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default Login;
