import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
// import LoadingButton from "@mui/lab/LoadingButton";
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
import { updateCustomer, deleteCustomer } from "../../lib/firebase";

type iCustomerEditFormProps = {
  customer: object;
  address: string;
  email: string;
  phone: string;
  name: string;
  id: string;
  avatar: string | null;
  photoURL: string | null;
};

export const EditForm = (
  { customer }: iCustomerEditFormProps,
  ...other: any
) => {
  const router = useRouter();

  // console.log(customer.name);
  const formik = useFormik({
    initialValues: {
      // @ts-ignore
      name: customer.name || "",
      // @ts-ignore
      email: customer.email || "",
      // @ts-ignore
      address: customer.address || "",
      // @ts-ignore
      phone: customer.phone || "",
      // @ts-ignore
      id: customer.id || "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      address: Yup.string().max(255),
      phone: Yup.string().max(15),
    }),

    onSubmit: async (values, helpers) => {
      const data = {
        email: values.email,
        // id = customer.id;
        name: values.name,
        address: values.address,
        phone: values.phone,
      };
      // const email = values.email;
      // @ts-ignore
      const id = customer.id;
      // const name = values.name;
      // const address = values.address;
      // const phone = values.phone;

      try {
        await updateCustomer(id, data);
        await wait(500);
        console.log(values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Customer updated!");
        helpers.resetForm({
          values: {
            name: "",
            email: "",
            address: "",
            phone: "",
            id: "",
            submit: null,
          },
        });
        router.push("/customers");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        // @ts-ignore
        helpers.setErrors({ submit: err.message });
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
                fullWidth
                label="Full name"
                name="name"
                required
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={formik.touched.name && formik.errors.name}
                error={Boolean(formik.touched.name && formik.errors.name)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                required
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={formik.touched.email && formik.errors.email}
                error={Boolean(formik.touched.email && formik.errors.email)}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formik.values.address}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // helperText={formik.touched.address && formik.errors.address}
                error={Boolean(formik.touched.address && formik.errors.address)}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                // helperText={formik.touched.phone && formik.errors.phone}
                label="Phone number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
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

          <NextLink
            // @ts-ignore
            href={`/customers/${customer?.id}`}
            passHref
          >
            <Button
              variant="outlined"
              disabled={formik.isSubmitting}
              sx={{
                m: 1,
                mr: "auto",
              }}
            >
              Cancel
            </Button>
          </NextLink>

          <Button
            color="error"
            disabled={formik.isSubmitting}
            //disabled={!dirty}
            onClick={() => {
              // @ts-ignore
              deleteCustomer(customer?.id);
              toast.success("Customer successfully deleted");
              formik.resetForm({
                values: {
                  name: "",
                  email: "",
                  address: "",
                  phone: "",
                  id: "",
                  submit: null,
                },
              });
            }}
          >
            Delete user
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
