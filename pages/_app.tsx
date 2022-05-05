import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store";

import "../styles/globals.css";
import initAuth from "../initAuth";
// initiates next-firebase-auth
initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  // const logout = () => {
  //   fetch("/api/logout");
  // };

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen bg-stone-200">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
