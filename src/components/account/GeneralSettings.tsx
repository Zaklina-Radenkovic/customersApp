import { useState, useCallback } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { wait } from "../../utils/wait";
import { updateCustomer } from "../../lib/firebase";
import { useCustomerContext } from "../../context/CustomerContext";
import { DeleteModal } from "../DeleteModal";

export const GeneralSettings = (props: any) => {
  const { user }: any = useCustomerContext();
  // console.log(user);
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email);
  // const [image, setImage] = useState(user?.photoURL);

  const handleNameChange = () => {
    setName(formik1.values.name);
  };

  const handleEmailChange = () => {
    setEmail(formik1.values.email);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const openModalHandler = () => {
    setModalIsVisible(true);
  };

  const closeModalHandler = () => {
    setModalIsVisible(false);
  };

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "image/gif",
  ];
  const formik1 = useFormik({
    initialValues: {
      image: user?.photoURL || "",
      name: name,
      email: email,
      id: user?.id || "",
      submit: null,
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
      name: Yup.string().max(255),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      const data = {
        image: values.image,
        email: values.email,
        name: values.name,
      };
      const id = user.id;
      try {
        await updateCustomer(id, data);
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

  // const formik2 = useFormik({
  //   initialValues: {
  //     oldPassword: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   validationSchema: Yup.object({
  //     password: Yup.string()
  //       .required("No password provided.")
  //       .min(8, "Password is too short - should be 8 chars minimum.")
  //       .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  //     confirmPassword: Yup.string().oneOf(
  //       //@ts-ignore
  //       [Yup.ref("password"), null],
  //       "Passwords must match"
  //     ),
  //   }).required(),

  //   onSubmit: async (values, helpers) => {
  //     //   const data = {
  //     //     image: values.image,
  //     //     name: values.name,
  //     //     email: values.email,
  //     //   };
  //     //   // toast.success('Account updated')
  //     //   // router.push('').catch(console.error);
  //     //   console.error(err);
  //     //   // toast.error("Something went wrong!");
  //     //   helpers.setStatus({ success: false });
  //     //   helpers.setErrors({ submit: err.message });
  //     //   helpers.setSubmitting(false);
  //     // },
  //     console.log(values);
  //   },
  // });

  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
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
                    src={user?.photoURL}
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64,
                    }}
                  >
                    <UserCircleIcon fontSize="small" />
                  </Avatar>
                  <Button>
                    <input
                      name="image"
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(event) =>
                        event.target.files
                          ? formik1.setFieldValue(
                              "image",
                              event.target.files[0]
                            )
                          : null
                      }
                    />
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
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                    }}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="name"
                    label="Full Name"
                    value={formik1.values.name}
                    onBlur={formik1.handleBlur}
                    onChange={formik1.handleChange}
                    error={Boolean(formik1.touched.name && formik1.errors.name)}
                    // helperText={formik1.touched.name && formik1.errors.name}
                  />
                  <Button onClick={handleNameChange}>Save</Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 3,
                    alignItems: "center",
                  }}
                >
                  <TextField
                    disabled={!isEditing}
                    sx={{
                      flexGrow: 1,
                      mr: 3,
                      ...(!isEditing && {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderStyle: "dashed",
                        },
                      }),
                    }}
                    label="Email Address"
                    name="email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    required
                    value={formik1.values.email}
                    onBlur={formik1.handleBlur}
                    onChange={formik1.handleChange}
                    error={Boolean(
                      formik1.touched.email && formik1.errors.email
                    )}
                    // helperText={formik1.touched.email && formik1.errors.email}
                  />

                  <Button
                    onClick={!user?.email ? handleEmailChange : handleEdit}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </Box>
                <Button
                  sx={{ mt: 4 }}
                  variant="contained"
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

      {/* <Card sx={{ mt: 4 }}>
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
                    ...(!isEditing && {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dotted",
                      },
                    }),
                  }}
                  value={formik2.values.oldPassword}
                  error={Boolean(
                    formik2.touched.oldPassword && formik2.errors.oldPassword
                  )}
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
      </Card> */}

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
              <Button
                color="error"
                variant="outlined"
                onClick={openModalHandler}
              >
                Delete account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {modalIsVisible ? (
        <DeleteModal
          open={modalIsVisible}
          onClose={closeModalHandler}
          id={user?.id}
        />
      ) : null}
    </Box>
  );
};
