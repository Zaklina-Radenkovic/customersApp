import { Box, Button, Card, Typography } from "@mui/material";
import { useUserContext } from "../context/UserContext";

type OverviewBannerType = {
  onDismiss: () => void;
};

const Banner = ({ onDismiss, ...other }: OverviewBannerType) => {
  const { currentUser }: any = useUserContext();

  return (
    <Card
      sx={{
        alignItems: "center",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        p: 4,
      }}
      {...other}
    >
      <div>
        <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
          {currentUser?.displayName
            ? `Welcome to CustomersApp, ${currentUser?.displayName}!`
            : `Welcome to CustomersApp!`}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button color="secondary" onClick={onDismiss} variant="contained">
            Dismiss Banner
          </Button>
        </Box>
      </div>
    </Card>
  );
};
export default Banner;
