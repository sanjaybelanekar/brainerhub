import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import LoginCard from "./LoginCard";
import { Paper } from "@mui/material";
import endpoints from "../../../api/endpoints";

const theme = createTheme();

const Login = () => {
  const [images, setImages] = useState([]);

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
            elevation={1}
            square
          >
            <LoginCard />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
export default Login;
