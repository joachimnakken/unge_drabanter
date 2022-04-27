import type { NextPage } from "next";
import {
  AuthAction,
  useAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Head from "next/head";

type AppProps = {
  token: string | null;
};

const AuthedApp: NextPage<AppProps> = ({ token }) => {
  const AuthUser = useAuthUser();

  console.log({ AuthUser, token });

  return (
    <>
      <Head>
        <title>Young drabants</title>
        <meta name="description" content="Johnny Tester" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-4 bg-slate-300 grow">
        <section className="p-4">Derpy Depp &amp; Derp Heard</section>
      </main>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken();
  return {
    props: { token },
  };
});

export default AuthedApp;
