import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "shoebilyas-common/components/Navbar";
import Footer from "../components/Footer";
import { Provider } from "react-redux";
import store from "../store/store";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <Component {...pageProps} />;
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
