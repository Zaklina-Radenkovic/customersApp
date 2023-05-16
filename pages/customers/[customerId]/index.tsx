import NextLink from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PencilAlt as PencilAltIcon } from "../../../src/icons/pencil-alt";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../../src/lib/firebase";
import { getInitials } from "../../../src/utils/getInitials";
import { BasicDetails } from "../../../src/components/customer/BasicDetails";

export interface iCustomerDetails {
  address: string;
  email: string;
  phone: string;
  name: string;
  id: string;
  avatar: string;
}

const CustomerDetails = ({ customerDetail }: any) => {
  const [customer, setCustomer] = useState<null | iCustomerDetails>(
    customerDetail
  );
  const router = useRouter();
  const customerId = router.query.customerId;

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
        <title>CustomersApp | Customer Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink href="/customers" passHref color="textPrimary">
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
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
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
                  <Typography variant="h4">{customer?.email}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">user_id:</Typography>
                    <Chip label={customer?.id} size="small" sx={{ ml: 1 }} />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href={`/customers/${customer?.id}/edit`} passHref>
                  <Button
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </div>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BasicDetails
                  address={customer?.address}
                  email={customer?.email}
                  phone={customer?.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerDetails;

export const getStaticPaths = async () => {
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
  // console.log(context);
  let id = context?.params.customerId;
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
    props: { customerDetail, id },
  };
};
