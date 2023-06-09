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
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../src/lib/firebase";
import { useMounted } from "../../src/hooks/use-mounted";

const Login = () => {
  const isMounted = useMounted();
  const router = useRouter();

  const handleGoogleClick = async () => {
    try {
      const { user } = await signInWithGooglePopup();

      if (isMounted()) {
        router.push("/");
        toast.success("You are logged in!");
      }
      // if (auth.currentUser === user) {
      //   toast.error("You are already logged in! Continue browsing the App :)");
      // }
    } catch (err) {
      toast.error("Something is wrong");
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values, helpers) => {
      const email = values.email;
      const password = values.password;
      try {
        const { user }: any = await signInAuthUserWithEmailAndPassword(
          email,
          password
        );

        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        helpers.resetForm({
          values: {
            email: "",
            password: "",
          },
        });
        if (isMounted()) {
          router.push("/");
          toast.success(`You are logged in as ${user?.email}!`);
        }
        // if (auth.currentUser === user) {
        //   toast.error(
        //     "You are already logged in! Continue browsing the App :)"
        //   );
        // }
      } catch (error: any) {
        console.log(error);
        if (error.code === "auth/user-not-found") {
          toast.error("User not found. Please, check your email");
        }
        if (error.code === "auth/wrong-password") {
          toast.error("Wrong password");
        }
        console.error(error);
        toast.error("Something went wrong!");
        if (isMounted()) {
          helpers.setStatus({ success: false });
          // helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>CustomersApp | Login</title>
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
                  <Typography variant="h4">Log in</Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ my: 1 }}
                    variant="body2"
                  >
                    Log in with
                  </Typography>
                </div>
              </Box>

              <form onSubmit={formik.handleSubmit}>
                <Button
                  fullWidth
                  onClick={handleGoogleClick}
                  size="large"
                  variant="outlined"
                >
                  <Box
                    alt="Google"
                    component="img"
                    src="/static/google.svg"
                    sx={{ mr: 1 }}
                  />
                  Google
                </Button>
                <Box
                  sx={{
                    flexGrow: 1,
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      mt: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Divider orientation="horizontal" />
                    </Box>
                    <Typography
                      color="textSecondary"
                      sx={{ m: 2 }}
                      variant="body1"
                    >
                      OR
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Divider orientation="horizontal" />
                    </Box>
                  </Box>

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
                      Log In
                    </Button>
                  </Box>
                </Box>
              </form>
              <Divider sx={{ my: 3 }} />
              <Link
                color="textSecondary"
                href="/authentication/register"
                variant="body2"
              >
                Create new account
              </Link>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default Login;
