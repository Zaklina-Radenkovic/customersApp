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
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { updateCustomer } from "../../lib/firebase";
import { useCustomerContext } from "../../context/CustomerContext";
import { DeleteModal } from "../DeleteModal";
import { useUserContext } from "../../context/UserContext";

export const GeneralSettings = (props: any) => {
  const { user, setUser }: any = useCustomerContext();
  const { currentUser, setCurrentUser }: any = useUserContext();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function handleClick() {
    setIsUpdating(true);
  }

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
      user: user,
      image: user?.photoURL || "",
      name: user?.name || "",
      email: user?.email || "",
      id: user?.id || "",
      submit: null,
    },
    enableReinitialize: true,
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
        setIsUpdating(true);
        await updateCustomer(id, data);
        setUser(data);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        setIsUpdating(false);
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
  const handleNameChange = useCallback(() => {
    formik1.setFieldValue("name", formik1.values.name);
  }, [formik1]);
  const handleEmailChange = useCallback(() => {
    formik1.setFieldValue("email", formik1.values.email);
  }, [formik1]);

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
                    //  helperText={formik1.touched.name && formik1.errors.name}
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
                    onClick={user?.email ? handleEdit : handleEmailChange}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </Box>

                <LoadingButton
                  sx={{ mt: 4 }}
                  loading={isUpdating ? true : false}
                  type="submit"
                  variant="contained"
                  disabled={formik1.isSubmitting}
                >
                  {" "}
                  <span>Update</span>
                </LoadingButton>
              </form>
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
