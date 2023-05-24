import { Box, ListItem, ListItemText, Typography } from "@mui/material";

type PropertyListItemProps = {
  align: string | string;
  disableGutters?: boolean | undefined;
  label: string;
  value: string | undefined;
  divider: boolean;
};

export const PropertyListItem = (
  {
    align = "vertical",
    disableGutters,
    value,
    label,
    ...other
  }: PropertyListItemProps,
  { children }: any
) => {
  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5,
      }}
      {...other}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography
            sx={{ minWidth: align === "vertical" ? "inherit" : 180 }}
            variant="subtitle2"
          >
            {label}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              flex: 1,
              mt: align === "vertical" ? 0.5 : 0,
            }}
          >
            {children || (
              <Typography color="textSecondary" variant="body2">
                {value}
              </Typography>
            )}
          </Box>
        }
        sx={{
          display: "flex",
          flexDirection: align === "vertical" ? "column" : "row",
          my: 0,
        }}
      />
    </ListItem>
  );
};
