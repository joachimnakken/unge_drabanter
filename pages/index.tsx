import type { NextPage } from "next";
import Head from "next/head";

import VinmonopoletProductSearch from "../components/VinmonopoletProductSearch";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Young drabants</title>
        <meta name="description" content="Johnny Tester" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-4 bg-slate-300 grow">
        <section className="p-4">
          <VinmonopoletProductSearch />
        </section>
      </main>
    </>
  );
};

export default Home;
