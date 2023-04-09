import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { UserProvider } from "../src/context/UserContext";
import { CustomerProvider } from "../src/context/CustomerContext";
import { createTheme } from "../src/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";

import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
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
