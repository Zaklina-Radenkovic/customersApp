import NextLink from "next/link";
import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
import { Box, List, Divider, Drawer, useMediaQuery } from "@mui/material";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { LockClosed as LockClosedIcon } from "../icons/lock-closed";
import { Scrollbar } from "../scrollbar";
import { SidebarItem } from "./SidebarItem";

type DashboardItem = {
  title: string;
  path: string;
  icon: JSX.Element;
  subsections: [];
};

const getSections = ({ isAdmin }: { isAdmin?: boolean }): DashboardItem[] =>
  // @ts-ignore
  [
    {
      title: "Account",
      path: "/account",
      icon: <UserCircleIcon fontSize="small" />,
    },

    {
      title: "Customers",
      path: "/customers",
      icon: <UsersIcon fontSize="small" />,
      subsections: [
        {
          title: "List",
          path: "/customers",
        },
        {
          title: "Details",
          path: `/customers/1`,
          // query: { customerId: router.query.customerId },
        },
        {
          title: "Edit",
          path: `/customers/1/edit`,
          // query: { customerId: router.query.customerId },
        },
      ],
    },

    isAdmin && {
      title: "Auth",
      path: "/authentication",
      icon: <LockClosedIcon fontSize="small" />,
      subsections: [
        {
          title: "Register",
          path: "/authentication/register",
        },
        {
          title: "Login",
          path: "/authentication/login",
        },
      ],
    },
  ].filter(Boolean);

type Sidebar = {
  onClose: () => void;
  open: boolean;
};

const Sidebar = ({ open, onClose }: Sidebar) => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const router = useRouter();
  // console.log(router);
  const sections = useMemo(() => getSections({ isAdmin: true }), []);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  //hook watching for matching lgUp screen
  //'true' = only client side rendering
  const lgUp = useMediaQuery(
    (theme) =>
      // @ts-ignore
      theme.breakpoints.up("lg"),
    {
      noSsr: true,
    }
  );

  const mobileProps = {
    variant: lgUp ? "permanent" : "temporary",
    sx: !lgUp ? { zIndex: (theme: any) => theme.zIndex.appBar + 100 } : null,
  };

  // This useEffect will only run once, during the first render
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);
  // initialRenderComplete will be false on the first render and true on all following renders
  if (!initialRenderComplete) {
    // Returning null will prevent the component from rendering, so the content will simply be missing from
    // the server HTML and also wont render during the first client-side render.
    return null;
  } else {
    return (
      <Drawer
        {...mobileProps}
        anchor="left"
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
      >
        {/* @ts-ignore */}
        <Scrollbar
          sx={{
            height: "100%",
            "& .simplebar-content": {
              height: "100%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                {/* <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  /> */}
              </NextLink>
            </Box>

            <Divider
              sx={{
                borderColor: "#2D3748",
                mt: 2,
              }}
            />
            <div>
              <List>
                <Box sx={{ flexGrow: 1 }}>
                  {sections.map((section) => {
                    return (
                      <SidebarItem
                        subsections={section.subsections}
                        active={section.path === router.pathname}
                        router={router}
                        icon={section.icon}
                        key={section.title}
                        path={section.path}
                        title={section.title}
                      />
                    );
                  })}
                </Box>
              </List>
            </div>
          </Box>
        </Scrollbar>
      </Drawer>
    );
  }
};

export default Sidebar;
