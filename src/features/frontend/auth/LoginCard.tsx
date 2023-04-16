import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink as NLink, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import defineInitialUser from "../../../shared/yup-validations/user-validation/initialUser";
import defineUserYupValidation from "../../../shared/yup-validations/user-validation/usersYupValidation";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import AuthService from "../../../services/AuthService";
import { addLoggedUser } from "../../../app/slices/AuthSlice";

const Link = styled(NLink)({
  textDecoration: "none",
});
const commonObj = {
  hasEmail: true,
  hasPassword: true,
};

const initialUser = defineInitialUser({
  ...commonObj,
});

const loginValidation = defineUserYupValidation({
  ...commonObj,
});

interface ILoginCardProps {}

const LoginCard: React.FunctionComponent<ILoginCardProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeElementId, setActiveElementId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const defaultLogin = pathname.includes("login");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Grid item>
      <Formik
        initialValues={initialUser}
        enableReinitialize
        validationSchema={loginValidation}
        onSubmit={(values, { resetForm }) => {
          AuthService.userLogin(values)
            .then((res) => {
              const aToken = res?.headers["x-accesstoken"] as string;
              const rToken = res?.headers["x-refreshtoken"] as string;

              sessionStorage.setItem("aToken", aToken);
              sessionStorage.setItem("rToken", rToken);

              const message = res?.data?.message || "Login Succesfull :-)";
              successToast(message, 3000);

              dispatch(addLoggedUser(res?.data?.data));
              resetForm({});
              navigate("/secured");
            })
            .catch((err) => {
              resetForm({
                values: {
                  email: values.email,
                  password: "",
                },
              });

              const message =
                err?.response?.data?.message ||
                "Incorrect Email or User not Avialiable";
              errorToast(message, 5000);
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
          return (
            <form onSubmit={handleSubmit}>
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
                  Sign in
                </Typography>
                <Box sx={{ mt: 1, width: "60%" }}>
                  <Grid>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      size="small"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email ? true : false}
                      helperText={
                        touched.email && errors.email ? errors.email : ""
                      }
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      required
                      fullWidth
                      margin="normal"
                      name="password"
                      label="Password"
                      id="password"
                      size="small"
                      autoComplete="new-password"
                      value={values?.password}
                      onChange={handleChange}
                      onFocus={() => setActiveElementId("password")}
                      onBlur={(e) => {
                        handleBlur(e);
                        setActiveElementId("");
                      }}
                      type={showPassword ? "text" : "password"}
                      InputLabelProps={{
                        shrink:
                          activeElementId == "password"
                            ? true
                            : values?.password?.length != 0
                            ? true
                            : false,
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
                        touched?.password && errors?.password ? true : false
                      }
                      helperText={
                        touched?.password && errors?.password
                          ? errors?.password
                          : ""
                      }
                    />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isValid ? false : true}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs={6}>
                      <Link to={"/register"}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default LoginCard;
