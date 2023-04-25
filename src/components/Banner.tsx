import { Box, Button, Card, Chip, Typography } from "@mui/material";
import { useUserContext } from "../context/UserContext";

type OverviewBannerType = {
  onDismiss: () => void;
};

const Banner = ({ onDismiss, ...other }: OverviewBannerType) => {
  const { user } = useUserContext();

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
        {/* <div>
          <Chip color="secondary" label="New" />
        </div> */}
        <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
          welcome, {user?.displayName}!
        </Typography>
        <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
          selectExercise
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
