import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store";

import "../styles/globals.css";
import initAuth from "../initAuth";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import AppShell from "../components/AppShell";

initAuth();

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//       <div className="flex flex-col min-h-screen bg-stone-200">
//         <Component {...pageProps} />
//       </div>
//     </Provider>
//   );
// }

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Provider store={store}>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </Provider>
      </MantineProvider>
    </>
  );
}
