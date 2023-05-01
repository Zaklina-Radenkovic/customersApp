import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { PropertyList } from "../../PropertyList";
import { PropertyListItem } from "../../PropertyListItem";

type CustomerBasicDetailsProps = {
  address?: string;
  email?: string;
  phone?: string;
};

export const BasicDetails = ({
  address,
  email,
  phone,
  ...other
}: CustomerBasicDetailsProps) => {
  const mdUp = useMediaQuery((theme) =>
    // @ts-ignore
    theme.breakpoints.up("md")
  );

  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          // @ts-ignore
          divider
          label="Email"
          // @ts-ignore
          value={email}
        />
        <PropertyListItem
          align={align}
          // @ts-ignore
          divider
          label="Phone"
          // @ts-ignore
          value={phone}
        />
        <PropertyListItem
          align={align}
          // @ts-ignore
          divider
          label="Address"
          // @ts-ignore
          value={address}
        />
      </PropertyList>
      {/* <CardActions
        sx={{
          flexWrap: "wrap",
          px: 3,
          py: 2,
          m: -1,
        }}
      >
        <Button sx={{ m: 1 }} variant="outlined">
          Reset &amp; Send Password
        </Button>
        <Button sx={{ m: 1 }}>Login as Customer</Button>
      </CardActions> */}
    </Card>
  );
};
