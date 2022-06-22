import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store";

import initAuth from "../initAuth";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import AppShell from "../components/AppShell";

initAuth();

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
          radius: {
            sm: 9999,
          },
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
