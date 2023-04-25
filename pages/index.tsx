import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Banner from "../src/components/Banner";
import Register from "../src/components/register";

const Home: NextPage = () => {
  const [displayBanner, setDisplayBanner] = useState(true);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard: Overview | Material Kit Pro</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {/* {displayBanner && (
          <Box sx={{ mx: 3, mb: 6 }}>
            <Banner onDismiss={handleDismissBanner} />
          </Box>
        )} */}
        <Register />
      </Box>
    </>
  );
};

export default Home;
