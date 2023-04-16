import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import EastIcon from "@mui/icons-material/East";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import endPoints from "../../../api/endpoints";

const ExploreGrid = styled(Grid)({
  transition: "0.7s ease-in-out",
  "&:hover": {
    transform: "translate(15px)",
  },
});

const TitleArea = styled(Typography)({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
});

const DescArea = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
});

interface IProductCardProps {
  id: string;
  image: string;
  name: string;
  desc: string;
  price: number | any;
  quantity: any;
}
const ProductCard: React.FunctionComponent<IProductCardProps> = ({
  id,
  image,
  name,
  desc,
  price,
  quantity,
}) => {
  return (
    <>
      <Grid container sx={{ pt: 2, px: 2, pb: 2 }}>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 5,
            backgroundColor: "white",
            transition: "0.8s ease-in-out",
            "&:hover": {
              boxShadow: "0px 0px 20px -5px rgb(0 0 0 / 50%)",
              transform: "translateY(-5px)",
            },
          }}
        >
          <NavLink
            to={`products/edit/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Grid item sx={{ p: 2, pb: 1.2 }} xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* -------------------Image Area-------------------- */}
                <Grid>
                  <Box position="relative">
                    <img
                      style={{
                        width: "100%",
                        height: 230,
                        borderRadius: 10,
                        objectFit: "cover",
                      }}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "placeholder-blogs.png";
                      }}
                      src={
                        `${endPoints?.serverBaseURL}/${image}`
                          ? `${endPoints?.serverBaseURL}/${image}`
                          : "/placeholder-blogs.png"
                      }
                      alt=""
                    />
                  </Box>
                </Grid>

                {/* -----------------Title & Description-------------------- */}
                <Grid
                  sx={{
                    p: 1,
                    minHeight: 168,
                  }}
                >
                  <TitleArea
                    sx={{
                      color: "#005d9d",
                      fontSize: 19,
                      fontWeight: 600,
                      pb: 1,
                    }}
                  >
                    {name}
                  </TitleArea>
                  <Grid
                    container
                    sx={{
                      p: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={8}>
                          {price} Rs
                        </Grid>
                        <Grid item xs={4}>
                          Qty: {quantity}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <DescArea
                        sx={{
                          color: "#7a7a7a",
                          fontSize: 16,
                          fontWeight: 400,
                          fontFamily: "inherit",
                        }}
                      >
                        {desc}
                      </DescArea>
                    </Grid>
                  </Grid>
                </Grid>
                {/* ---------------------Divider-------------------- */}
                <Divider />
                {/* -------------------Read More----------------------- */}

                <ExploreGrid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#005d9d",
                    pt: 1,
                    cursor: "pointer",
                  }}
                >
                  <Typography sx={{ p: 1, fontSize: 15, fontWeight: 900 }}>
                    Edit
                  </Typography>
                  <EastIcon />
                </ExploreGrid>
              </Grid>
            </Grid>
          </NavLink>
        </Paper>
      </Grid>
    </>
  );
};

export default ProductCard;
