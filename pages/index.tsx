import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Box } from "@mui/material";
import Banner from "../src/components/Banner";
import Spinner from "../src/components/Spinner";
import { useUserContext } from "../src/context/UserContext";

const Home: NextPage = () => {
  const { isLoading } = useUserContext();
  const [displayBanner, setDisplayBanner] = useState(true);
  const router = useRouter();

  const handleDismissBanner = () => {
    // Update the persistent state
    globalThis.sessionStorage.setItem("dismiss-banner", "true");
    setDisplayBanner(false);
    router.push("/customers");
  };

  return (
    <>
      <Head>
        <title>CustomersApp</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {isLoading && <Spinner />}
        {!isLoading && displayBanner && (
          <Box sx={{ mx: 3, mb: 6 }}>
            <Banner onDismiss={handleDismissBanner} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
