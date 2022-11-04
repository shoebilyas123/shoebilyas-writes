import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";
import store from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
