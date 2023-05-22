import { useState, useRef, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "../icons/menu";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { getInitials } from "../utils/getInitials";
import { AccountPopover } from "./AccountPopover";
import { useCustomerContext } from "../context/CustomerContext";
import { useUserContext } from "../context/UserContext";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,

  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

const AccountButton = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const anchorRef = useRef(null);
  const { user }: any = useCustomerContext();
  const { currentUser }: any = useUserContext();

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        ref={anchorRef}
        component={ButtonBase}
        onClick={handleOpenPopover}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={currentUser?.photoURL || currentUser?.avatar || ""}
        >
          {currentUser?.displayName === undefined && (
            <UserCircleIcon fontSize="small" />
          )}
          {currentUser?.displayName && getInitials(currentUser?.displayName)}
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

type Navbar = { onOpenSidebar: () => void };

const Navbar = ({ onOpenSidebar, ...other }: Navbar) => {
  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton />
        </Toolbar>
      </NavbarRoot>
    </>
  );
};

export default Navbar;
