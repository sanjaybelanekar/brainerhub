import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink as NLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { Formik } from "formik";
import defineUserYupValidation from "../../../shared/yup-validations/user-validation/usersYupValidation";
import defineInitialUser from "../../../shared/yup-validations/user-validation/initialUser";
import Visibility from "@mui/icons-material/Visibility";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import UserService from "../../../services/UserService";
import { successToast, errorToast } from "../../../ui/toast/Toast";

const Link = styled(NLink)({
  textDecoration: "none",
});

const combineFields = {
  hasFirst: true,
  hasLast: true,
  hasMobile: true,
  hasEmail: true,
  hasPassword: true,
  hasDob: true,
  hasGender: true,
};

const signupInitialUser = defineInitialUser({ ...combineFields });

const signupValidation = defineUserYupValidation({ ...combineFields });

const theme = createTheme();

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" justifyContent="center">
          <CssBaseline />

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>

              <Formik
                initialValues={signupInitialUser}
                enableReinitialize
                validationSchema={signupValidation}
                onSubmit={(values, { resetForm }) => {
                  UserService.createUser({
                    ...values,
                  })
                    .then((res) => {
                      const msg =
                        res?.data?.message || "User created successfully...";
                      successToast(msg, 3000);

                      resetForm({});
                      navigate("/login");
                    })
                    .catch((err) => {
                      const msg =
                        err?.response?.data?.message ||
                        "User couldn't created...";
                      errorToast(msg, 5000);
                      console.error(err);
                    });
                }}
              >
                {({
                  values,
                  errors,
                  isValid,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => {
                  const touchedName: any = touched?.name;
                  const errorsName: any = errors?.name;

                  return (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              autoComplete="firstName"
                              required
                              fullWidth
                              id="firstName"
                              label="First Name"
                              autoFocus
                              size="small"
                              name="name.first"
                              value={values?.name?.first}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                touchedName?.first && errorsName?.first
                                  ? true
                                  : false
                              }
                              helperText={
                                touchedName?.first && errorsName?.first
                                  ? errorsName?.first
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="name.last"
                              autoComplete="family-name"
                              size="small"
                              value={values?.name?.last}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                touchedName?.last && errorsName?.last
                                  ? true
                                  : false
                              }
                              helperText={
                                touchedName?.last && errorsName?.last
                                  ? errorsName?.last
                                  : ""
                              }
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              size="small"
                              value={values?.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                touched?.email && errors?.email ? true : false
                              }
                              helperText={
                                touched?.email && errors?.email
                                  ? errors?.email
                                  : ""
                              }
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              // type="password"
                              id="password"
                              size="small"
                              autoComplete="new-password"
                              value={values?.password}
                              onChange={handleChange}
                              onBlur={(e) => {
                                handleBlur(e);
                              }}
                              type={showPassword ? "text" : "password"}
                              InputLabelProps={{
                                shrink:
                                  values?.password?.length != 0 ? true : false,
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="end"
                                    sx={{ order: 2, mr: "1em" }}
                                  >
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              error={
                                touched?.password && errors?.password
                                  ? true
                                  : false
                              }
                              helperText={
                                touched?.password && errors?.password
                                  ? errors?.password
                                  : ""
                              }
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          id="sign-in-button"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={isValid ? false : true}
                        >
                          Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link to="/login">
                              Already have an account? Sign in
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </form>
                  );
                }}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
export default Register;
