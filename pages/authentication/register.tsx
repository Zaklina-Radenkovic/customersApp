import Head from "next/head";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
} from "../../src/lib/firebase";
import { useMounted } from "../../src/hooks/use-mounted";

const Register = () => {
  //isMounted returns fnc, isMounted() returns true/false
  const isMounted = useMounted();
  const router = useRouter();

  //whenever we connect to database it is async fnc
  const handleGoogleClick = async () => {
    try {
      // const response = await signInWithGooglePopup();
      // console.log(response);
      //   we can destructure user from response
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);

      // before performing an action
      if (isMounted()) {
        router.push("/");
        toast.success("You are registered!");
      }
    } catch (err) {
      toast.error("Something is wrong");
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string().max(255).required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().min(8).max(255).required("Password is required"),
    }),

    onSubmit: async (values, helpers) => {
      const email = values.email;
      const password = values.password;
      const name = values.displayName;
      try {
        const { user }: any = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        await createUserDocumentFromAuth(user, { name });

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        helpers.resetForm({
          values: {
            displayName: "",
            email: "",
            password: "",
          },
        });
        if (isMounted()) {
          router.push("/");
          toast.success(`You are registered as ${user?.email}!`);
        }
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Cannot create user, email already in use");
        }
        if (error.code === "auth/invalid-email") {
          toast.error("Cannot create user, invalid email");
        }
        if (isMounted()) {
          helpers.setStatus({ success: false });
          // helpers.setErrors({ submit: error.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>CustomersApp | Register</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: 400,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="h4">Register</Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    color="primary"
                    error={Boolean(
                      formik.touched.displayName && formik.errors.displayName
                    )}
                    fullWidth
                    helperText={
                      formik.touched.displayName && formik.errors.displayName
                    }
                    label="Name"
                    margin="normal"
                    name="displayName"
                    onBlur={formik.handleBlur}
                    required
                    onChange={formik.handleChange}
                    value={formik.values.displayName}
                  />
                  <TextField
                    color="primary"
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    type="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.email}
                  />
                  <TextField
                    color="primary"
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Password"
                    margin="normal"
                    name="password"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    required
                    value={formik.values.password}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Button
                      disabled={formik.isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Register
                    </Button>
                    <Typography
                      sx={{
                        justifyContent: "center",
                        display: "flex",
                        m: 2,
                      }}
                      color="textSecondary"
                    >
                      Or
                    </Typography>
                    <Button
                      size="large"
                      fullWidth
                      variant="outlined"
                      onClick={handleGoogleClick}
                    >
                      Sign in with{" "}
                      <Box
                        alt="Google"
                        component="img"
                        src="/static/google.svg"
                        sx={{ ml: 1 }}
                      />
                    </Button>
                  </Box>
                </form>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Link
                color="textSecondary"
                href="/authentication/login"
                variant="body2"
              >
                Having an account?
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default Register;
