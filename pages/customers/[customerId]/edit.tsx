import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { AuthGuard } from '../../../../components/authentication/auth-guard';

import { EditForm } from "../../../src/components/customer/EditForm";
import { useMounted } from "../../../src/hooks/use-mounted";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { getInitials } from "../../../src/utils/getInitials";
import { Customer } from "../../customers";
import { db } from "../../../src/lib/firebase";

const CustomerEdit = ({ customerDetail }) => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState<null | Customer>(customerDetail);
  // const customerId = router.query.customerId;

  useEffect(
    () => {
      setCustomer(customer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Customer Edit | CustomList</title>
      </Head>

      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/customers" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Customers</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Avatar
              src={customer?.avatar}
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(customer?.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {customer?.email}
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="subtitle2">user_id:</Typography>
                <Chip label={customer.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <EditForm customer={customer} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerEdit;

export const getStaticPaths = async () => {
  const userData = await getDocs(collection(db, "customers"));
  // @ts-ignore
  const paths = userData.docs.map((customer) => ({
    params: { customerId: customer.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  let id = context?.params.customerId;
  const customerRef = doc(db, "customers", id);
  const customerSnap = await getDoc(customerRef);
  // const customerDetail = customerSnap.data();

  const customerData = customerSnap.data();
  const customerDetail = {
    ...customerData,
    name: customerData?.displayName || customerData?.name,
    avatar: customerData?.avatar || customerData?.photoURL,
  };

  if (!customerDetail) return { notFound: true };

  return {
    // props: { customerDetail: [JSON.parse(JSON.stringify(customerDetail))] },
    props: { customerDetail },
  };
};
