import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  //   A media query string ready to be used with most styling solutions, which matches screen widths greater than the screen size given by the breakpoint key
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

type LayoutProp = {
  children: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: LayoutProp) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar onClose={() => setIsSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};

export default Layout;
