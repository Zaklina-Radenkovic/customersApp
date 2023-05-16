import NextLink from "next/link";
import Head from "next/head";
import { GetStaticPaths } from "next";
import { useEffect, useState } from "react";
import { Avatar, Box, Chip, Container, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { db } from "../../../src/lib/firebase";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { getInitials } from "../../../src/utils/getInitials";
import { EditForm } from "../../../src/components/customer/EditForm";
import { iCustomerDetails } from "./index";

const CustomerEdit = ({ customerDetail }: any) => {
  const [customer, setCustomer] = useState<null | iCustomerDetails>(
    customerDetail
  );

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
        <title>CustomersApp | Customer Edit</title>
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
            <NextLink href="/customers" color="textPrimary" passHref>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Customers</Typography>
              </Box>
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
            <EditForm
              address={customer?.address}
              name={customer?.name}
              email={customer?.email}
              id={customer?.id}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerEdit;

export const getStaticPaths: GetStaticPaths = async () => {
  const userData = await getDocs(collection(db, "customers"));
  const paths = userData.docs.map((customer) => ({
    params: { customerId: customer.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  let id = context?.params!.customerId;
  const customerRef = doc(db, "customers", id);
  const customerSnap = await getDoc(customerRef);

  const customerData = customerSnap.data();
  const customerDetail = {
    ...customerData,
    name: customerData?.displayName || customerData?.name,
    avatar: customerData?.avatar || customerData?.photoURL,
  };

  if (!customerDetail) return { notFound: true };

  return {
    props: { customerDetail },
  };
};
