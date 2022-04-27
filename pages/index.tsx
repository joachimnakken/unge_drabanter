import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useGetVinmonopoletProductsQuery } from "../store/features/vinmonopolet";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: vinmonopoletProducts = [] } = useGetVinmonopoletProductsQuery(
    { name: searchValue },
    { skip: searchValue.length < 5 }
  );

  return (
    <div className="grid">
      <Head>
        <title>Young drabants</title>
        <meta name="description" content="Johnny Tester" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <section>
          <input
            type="search"
            onChange={(e) => setSearchValue(e.target.value)}
            className="mr-4"
          />
        </section>

        <section>
          <h2>Results:</h2>
          <ul>
            {vinmonopoletProducts.map((p) => (
              <li key={p.basic.productId}>
                <article className="w-32">
                  <Image
                    src={p.imageUrl}
                    width={100}
                    height={300}
                    layout="responsive"
                    alt={p.basic.productShortName}
                  />
                  {p.basic.productShortName}
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;
