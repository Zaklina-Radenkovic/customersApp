import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Cog as CogIcon } from "../icons/cog";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { signOutUser } from "../lib/firebase";
import { useCustomerContext } from "../context/CustomerContext";
import { useUserContext } from "../context/UserContext";

type AccountPopoverProp = {
  anchorEl: any;
  onClose: () => void;
  open: boolean;
};

export const AccountPopover = ({
  anchorEl,
  onClose,
  open,
  ...other
}: AccountPopoverProp) => {
  const router = useRouter();
  const { user, setUser }: any = useCustomerContext();
  const { currentUser, setCurrentUser }: any = useUserContext();
  const handleLogout = async () => {
    try {
      onClose?.();
      await signOutUser();

      setUser(null);
      setCurrentUser(null);
      router.push("/authentication/login").catch(console.error);
      toast.success("You are signed out");
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={!!open}
      keepMounted
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          src={currentUser?.photoURL}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1"> {currentUser?.displayName} </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        <NextLink href="/account" passHref>
          <MenuItem>
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </NextLink>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};
