import { useRouter } from "next/router";
import {
  Dialog,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import WarningIcon from "@mui/icons-material/WarningOutlined";
import { deleteCustomer } from "../lib/firebase";

type DeleteModalProp = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export const DeleteModal = ({ open, onClose, id }: DeleteModalProp) => {
  const route = useRouter();

  const deleteUserHandler = () => {
    deleteCustomer(id);
    onClose();
    route.push("/authentication/register");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            pb: 2,
            pt: 3,
            px: 3,
          }}
        >
          <Avatar
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
              color: "error.main",
              mr: 2,
            }}
          >
            <WarningIcon fontSize="small" />
          </Avatar>
          <div>
            <Typography variant="h5">Deactivate account</Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 3,
            py: 1.5,
          }}
        >
          <Button sx={{ mr: 2 }} variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: "error.main",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
            variant="contained"
            onClick={deleteUserHandler}
          >
            Deactivate
          </Button>
        </Box>
      </Container>
    </Dialog>
  );
};
