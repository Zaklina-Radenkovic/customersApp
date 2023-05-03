import "../styles/globals.css";
import Head from "next/head";
import Router from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import { UserProvider, useUserContext } from "../src/context/UserContext";
import { CustomerProvider } from "../src/context/CustomerContext";
import { createTheme } from "../src/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import Spinner from "../src/components/Spinner";
import LinearDeterminate from "../src/components/LinearDeterminate";
import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  // const { isLoading, setIsLoading } = useUserContext();
  // Router.events.on("routeChangeStart", (url) => {
  //   console.log("route change");
  //   setIsLoading(true);
  // });
  // Router.events.on("routeChangeComplete", (url) => {
  //   console.log("route change complete");
  //   setIsLoading(false);
  // });

  return (
    <>
      <Head>
        <title>CustomList</title>
        <meta name="description" content="" />

        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider
        theme={createTheme({
          palette: {
            primary: {
              main: "",
            },
          },
        })}
      >
        <UserProvider>
          <CustomerProvider>
            <CssBaseline />
            <Toaster position="top-center" />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CustomerProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
