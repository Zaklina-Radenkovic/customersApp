import { Box, Button, Card, Typography } from "@mui/material";

import { useCustomerContext } from "../context/CustomerContext";

type OverviewBannerType = {
  onDismiss: () => void;
};

const Banner = ({ onDismiss, ...other }: OverviewBannerType) => {
  const { user } = useCustomerContext();

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
          {user?.name
            ? `Welcome to CustomList, ${user?.name}!`
            : `Welcome to CustomList!`}
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
