import Head from "next/head";
import { Box, Container, Divider, Typography } from "@mui/material";
import { GeneralSettings } from "../src/components/account/GeneralSettings";

const Account = () => {
  return (
    <>
      <Head>
        <title>CustomersApp | Account</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3 }}>
            Account
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <GeneralSettings />
        </Container>
      </Box>
    </>
  );
};

export default Account;
