import { Card, CardHeader, Divider, useMediaQuery } from "@mui/material";
import { PropertyList } from "../../PropertyList";
import { PropertyListItem } from "../../PropertyListItem";
import { Theme } from "@mui/material/styles";

type CustomerBasicDetailsProps = {
  address?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
};

export const BasicDetails = ({
  address,
  email,
  phone,
  ...other
}: CustomerBasicDetailsProps) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  console.log(email);
  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          disableGutters
          align={align}
          divider
          label="Email"
          value={email}
        />
        <PropertyListItem
          disableGutters
          align={align}
          divider
          label="Phone"
          value={phone}
        />
        <PropertyListItem
          disableGutters
          align={align}
          divider
          label="Address"
          value={address}
        />
      </PropertyList>
    </Card>
  );
};
