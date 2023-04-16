import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
// import Pagination from "./Pagination";
// import BlogService from "../../../services/BlogService";
import {
  Outlet,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import ProductService from "../../../services/ProductService";
import Pagination from "../Pagination";

interface IProductsProps {}

const Products: React.FunctionComponent<IProductsProps> = (props) => {
  const [data, setData] = React.useState<Array<any>>([]);
  // Pagination
  const [dataLength, setDataLength] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productPerPage] = React.useState(3);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const changeSearchParam = () => {
    searchParams.set("query", query);
    setSearchParams(searchParams);
  };

  const loadProducts = (query = "") => {
    ProductService.fetchAllProducts(
      `?query=${query}&skip=${
        productPerPage * (currentPage - 1)
      }&limit=${productPerPage}`
    )
      .then(async (response) => {
        const data = await response?.data?.data;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalDataLength = () => {
    ProductService.fetchAllProducts(`?length=true`)
      .then(async (response: any) => {
        const data = await response?.data?.data;
        setDataLength(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    totalDataLength();
  }, []);

  React.useEffect(() => {
    loadProducts();
  }, [currentPage]);

  useEffect(() => {
    const query = searchParams.get("query");
    query && loadProducts(query);
  }, [searchParams]);

  return (
    <>
      {
        <>
          <Container>
            <Grid item>
              <Grid container sx={{ mt: 4 }}>
                <Grid item xs={10}>
                  <TextField
                    size="small"
                    type="text"
                    sx={{ mr: 2 }}
                    onChange={(e: any) => setQuery(e?.target?.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={() => changeSearchParam()}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("products/add/0")}
                  >
                    Add Product
                  </Button>
                </Grid>
              </Grid>
              <Grid
                padding={1}
                paddingY={6}
                display="grid"
                justifyContent="space-evenly"
                sx={{
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                }}
              >
                {Array.isArray(data) &&
                  data.map((product, i) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={product?._id}
                      sx={{ pt: 3 }}
                    >
                      <ProductCard
                        id={product?._id}
                        name={product?.name}
                        price={product?.price}
                        desc={product?.desc}
                        image={product?.image}
                        quantity={product?.quantity}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 3 }}>
              <Pagination
                totalPosts={dataLength}
                postsPerPage={productPerPage}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
          </Container>
        </>
      }
    </>
  );
};

export default Products;
