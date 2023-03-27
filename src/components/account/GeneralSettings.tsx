import { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Link,
  Button,
  Card,
  CardContent,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
// import { AppUserContext } from "../../../context/appUserContext";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import * as Yup from "yup";
import { useFormik } from "formik";

export const GeneralSettings = (props: {}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(null); //(user?.displayName);
  const [email, setEmail] = useState(null); //(user?.email);
  const [image, setImage] = useState(null); //(user?.photoURL);

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "image/gif",
  ];
  const formik1 = useFormik({
    initialValues: {
      image: null,
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed().nullable(),
      // .test(
      //   "size",
      //   "File size is too big",
      //   (value) => value && value.size <= 1024 * 1024 // 5MB
      // )
      // .test(
      //   "type",
      //   "Invalid file format selection",
      //   (value) =>
      //     // console.log(value);
      //     !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      // ),
      // name: Yup.string().max(255),
      // email: Yup.string()

      // .email(`${t("Must be a valid email")}`)
      // .max(255),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
    },
  });

  const formik2 = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()

        // .required(`${t("No password provided.")}`)
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      // confirmPassword: Yup.string().oneOf(
      //    [Yup.ref("password"), null]

      //   `${t("Passwords must match")}`
      // ),
    }),
    onSubmit: async (values, helpers) => {
      console.log(values);
    },
  });

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              {/* @ts-ignore */}
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <form onSubmit={formik1.handleSubmit}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Avatar
                    // src={user?.photoURL}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    <UserCircleIcon fontSize="small" />
                  </Avatar>
                  <Button
                  // onChange={(event) =>
                  //   formik1.setFieldValue("image", event.target.files[0])
                  // }
                  >
                    Change
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    error={Boolean(formik1.touched.name && formik1.errors.name)}
                    helperText={formik1.touched.name && formik1.errors.name}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // value={name || user?.name || ""}
                    // onChange={(e) => {
                    //   setName(e.currentTarget.value);
                    // }}
                    label="Full Name"
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    error={Boolean(
                      formik1.touched.email && formik1.errors.email
                    )}
                    helperText={formik1.touched.email && formik1.errors.email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // value={email || user?.email || ""}
                    // onChange={(e) => {
                    //   setEmail(e.currentTarget.value);
                    // }}
                    label="Email Address"
                    required
                    size="small"
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      ...(!isEditing && {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderStyle: "dotted",
                        },
                      }),
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  // onClick={handleEdit}
                  sx={{ mt: 4 }}
                  disabled={formik1.isSubmitting}
                  type="submit"
                >
                  Update
                </Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Change password</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <Typography variant="subtitle2">Old password</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <OutlinedInput
                  onChange={formik2.handleChange}
                  label="Password"
                  type="password"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    // ...(!isEditing && {
                    //   "& .MuiOutlinedInput-notchedOutline": {
                    //     borderStyle: "dotted",
                    //   },
                    // }),
                  }}
                  value={formik2.values.oldPassword}
                  // error={Boolean(
                  //   formik2.touched.oldPassword && formik2.errors.oldPassword
                  // )}
                  // helperText={
                  //   formik2.touched.oldPassword && formik2.errors.oldPassword
                  // }
                />
              </Box>
              <Typography variant="subtitle2" sx={{ mt: 3 }}>
                New password
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <OutlinedInput
                  onChange={formik2.handleChange}
                  label="Password"
                  type="password"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    // ...(!isEditing && {
                    //   "& .MuiOutlinedInput-notchedOutline": {
                    //     borderStyle: "dotted",
                    //   },
                    // }),
                  }}
                  value={formik2.values.password}
                  error={Boolean(
                    formik2.touched.password && formik2.errors.password
                  )}
                />
              </Box>
              <Typography variant="subtitle2" sx={{ mt: 3 }}>
                Confirm new password
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <OutlinedInput
                  onChange={formik2.handleChange}
                  label="Password"
                  type="password"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    // ...(!isEditing && {
                    //   "& .MuiOutlinedInput-notchedOutline": {
                    //     borderStyle: "dotted",
                    //   },
                    // }),
                  }}
                  value={formik2.values.confirmPassword}
                  error={Boolean(
                    formik2.touched.confirmPassword &&
                      formik2.errors.confirmPassword
                  )}
                />
              </Box>
              <div>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  sx={{ mt: 3 }}
                >
                  Make sure it&#39;s at least 15 characters OR at least 8
                  characters including a number and a lowercase letter.
                </Typography>
              </div>
              <Button
                variant="contained"
                // onClick={handleEdit}
                disabled={formik2.isSubmitting}
              >
                Update password
              </Button>
              <Link
                href="#"
                underline="hover"
                sx={{ pl: 2 }}
                color="primary"
                onClick={(event: React.SyntheticEvent) =>
                  event.preventDefault()
                }
              >
                I forgot my password
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Delete account</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Typography sx={{ mb: 3 }} variant="subtitle1">
                Delete your account and all of your source data. This is
                irreversible.
              </Typography>
              <Button color="error" variant="outlined">
                Delete account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
