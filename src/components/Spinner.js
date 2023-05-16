import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Layout from "./Layout";

export default function Spinner() {
  return (
    <Layout>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Layout>
  );
}
