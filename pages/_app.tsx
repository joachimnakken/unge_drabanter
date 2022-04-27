import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
