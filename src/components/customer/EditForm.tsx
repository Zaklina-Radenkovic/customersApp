import NextLink from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { wait } from "../../utils/wait";
import { updateCustomer } from "../../lib/firebase";
import { updateProfile } from "firebase/auth";

type iCustomerEditFormProps = {
  address: string;
  email: string;
  phone: string;
  name: string;
  id: string;
};

export const EditForm = (customer: iCustomerEditFormProps, ...other: any) => {
  // console.log(customer.customer.id);
  const formik = useFormik({
    initialValues: {
      address: customer.address || "",
      email: customer.email || "",
      name: customer.name || "",
      phone: customer.phone || "",
      id: customer.id || "",
      submit: null,
    },
    validationSchema: Yup.object({
      address: Yup.string().max(255),
      email: Yup.string(),
      // .email(`${t("Must be a valid email")}`)
      // .max(255)
      // .required(`${t("Email is required")}`),
      name: Yup.string().max(255),
      // .required(`${t("Name is required")}`),
      phone: Yup.string().max(15),
    }),

    onSubmit: async (values, helpers) => {
      const email = values.email;
      const id = customer.customer?.id;
      const name = values.name;
      const address = values.address;
      const phone = values.phone;

      try {
        await updateCustomer(id, name, email, address, phone);
        await wait(500);
        console.log(values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Customer updated!");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Edit customer" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Full name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Address "
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Update
          </Button>
          <NextLink href="/dashboard/customers/1" passHref>
            <Button
              // component="a"
              disabled={formik.isSubmitting}
              sx={{
                m: 1,
                mr: "auto",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </NextLink>
          <Button color="error" disabled={formik.isSubmitting}>
            Delete user
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
