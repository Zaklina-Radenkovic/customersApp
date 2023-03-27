import { useState } from "react";
import NextLink from "next/link";

import { Box, Button, Collapse, ListItem, List } from "@mui/material";
import { ChevronDown as ChevronDownIcon } from "../icons/chevron-down";
import { ChevronRight as ChevronRightIcon } from "../icons/chevron-right";

type SidebarItemProp = {
  active: boolean;
  icon: any;
  open?: boolean;
  path: string;
  title: string;
  router: any;
  subsections: [];
};

export const SidebarItem = ({
  active = false,
  icon,
  open: openProp,
  path,
  title,
  router,
  subsections,
  ...other
}: SidebarItemProp) => {
  const [open, setOpen] = useState(!!openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 24;

  if (subsections) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: "block",
          mb: 0.5,
          py: 0,
          paddingLeft: 2,
        }}
        {...other}
      >
        <Button
          endIcon={
            !open ? (
              <ChevronRightIcon fontSize="small" />
            ) : (
              <ChevronDownIcon fontSize="small" />
            )
          }
          disableRipple
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: active ? "secondary.main" : "neutral.300",
            justifyContent: "flex-start",
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
        <Collapse in={open} sx={{ mt: 0.5 }}>
          <List
            sx={{
              display: "block",
              mb: 0.5,
              py: 0,
            }}
          >
            {subsections.map((section: Record<string, string>) => (
              <ListItem sx={{ px: 2 }} key={section.title}>
                <NextLink href={section.path}>
                  <Button
                    disableRipple
                    sx={{
                      color:
                        router.pathname === section.path
                          ? "secondary.main"
                          : "neutral.300",

                      justifyContent: "flex-start",
                      pl: `${paddingLeft}px`,
                      pr: 3,
                      textAlign: "left",
                      textTransform: "none",
                      width: "220px",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255, 0.08)",
                      },
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>{section.title}</Box>
                  </Button>
                </NextLink>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </ListItem>
    );
  }

  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <NextLink href={path} passHref>
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            borderRadius: 1,
            color: "neutral.300",
            justifyContent: "flex-start",
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: "left",
            textTransform: "none",
            width: "220px",
            ...(active && {
              backgroundColor: "rgba(255,255,255, 0.08)",
              color: "secondary.main",
              fontWeight: "fontWeightBold",
            }),
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};
