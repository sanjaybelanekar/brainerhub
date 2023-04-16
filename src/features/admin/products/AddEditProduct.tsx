import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Product from "../../../shared/models/productModel";
import { Formik } from "formik";
import defineInitialProduct from "../../../shared/yup-validations/product-validation/initialProduct";
import defineProductYupSchema from "../../../shared/yup-validations/product-validation/productYupValidation";
import { endPoints } from "../../../api";
import ProductService from "../../../services/ProductService";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import { useParams, useLocation } from "react-router-dom";

interface IAddEditProductProps {}

const commonObj = {
  hasName: true,
  hasDesc: true,
  hasPrice: true,
  hasQuantity: true,
};

let initialProduct = defineInitialProduct({ ...commonObj, hasImage: true });

const yupSchema = defineProductYupSchema(commonObj);

const AddEditProduct: React.FunctionComponent<IAddEditProductProps> = () => {
  const [productPic, setProductPic] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const { op, id } = useParams();
  const { pathname } = useLocation();

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files && e?.target?.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      setProductPic(reader?.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const loadProduct = () => {
    id &&
      ProductService.fetchOneProduct(id as string)
        .then(async (response) => {
          const data = await response?.data?.data;

          initialProduct.name = data?.name;
          initialProduct.price = data?.price;
          initialProduct.quantity = data?.quantity;
          initialProduct.desc = data?.desc;
          setProductPic(data?.image);
          setRefresh(false);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const addProduct = () => {
    initialProduct = defineInitialProduct({ ...commonObj, hasImage: true });
    setRefresh(true);
  };

  useEffect(() => {
    op == "edit" ? loadProduct() : addProduct();
  }, [op]);

  return (
    <>
      <Grid container>
        <Grid item></Grid>
      </Grid>
      <Paper
        sx={{
          p: 2,
          transition: `1s ease-in-out`,
        }}
      >
        <Formik
          initialValues={initialProduct}
          enableReinitialize
          validationSchema={yupSchema}
          onSubmit={(values, { resetForm }) => {
            //create FormData
            const fd = new FormData();

            values?.name && fd.append("name", values?.name as string);
            values?.price && fd.append("price", values?.price as string);
            values?.quantity &&
              fd.append("quantity", values?.quantity as string);
            values?.desc && fd.append("desc", values?.desc as string);
            values?.image && fd.append("image", values?.image as string);
            const id = pathname.split("/")[pathname.split("/").length - 1];

            if (op == "add")
              ProductService.createProduct(fd)
                .then((res) => {
                  const msg = res?.data?.message
                    ? res?.data?.message
                    : "Product Created Successfully";
                  successToast(msg, 3000);
                  resetForm({});
                  setProductPic("");
                })
                .catch((err) => {
                  console.error(err);
                  errorToast("Product coudn't Created");
                });
            else
              id &&
                ProductService.updateProduct(id, fd)
                  .then((res) => {
                    const msg = res?.data?.message
                      ? res?.data?.message
                      : "Product Updated Successfully";
                    successToast(msg, 3000);
                    loadProduct();
                  })
                  .catch((err) => {
                    console.error(err);
                    errorToast("Product coudn't Updated");
                  });
          }}
        >
          {({
            values,
            errors,
            isValid,
            dirty,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => {
            const touchedValue: any = touched;
            const errorsValue: any = errors;

            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={5}>
                    <Box>
                      <Card
                        variant="elevation"
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          width: 250,
                          height: 250,
                          m: "auto",
                          mb: 3,
                          borderRadius: "10%",
                          backgroundColor: "#f1eaea",
                        }}
                      >
                        <img
                          id="product-img"
                          src={
                            productPic == "" || productPic == undefined
                              ? "/images/product-picture-avatar-png-green.png"
                              : productPic?.includes("products-images")
                              ? `${endPoints.serverBaseURL}/${productPic}`
                              : productPic
                          }
                          style={{
                            margin: "auto",
                            width: "98%",
                            height: "98%",
                            padding: "0.20em",
                            borderRadius: "50%",
                          }}
                          alt="product-image"
                        />
                        <FormLabel
                          sx={{ position: "absolute", top: 2, right: 2 }}
                          htmlFor="image-select"
                        >
                          <CameraAltIcon />
                        </FormLabel>
                        <input
                          style={{ display: "none" }}
                          id="image-select"
                          type="file"
                          accept=".jpeg,.jpg,.png"
                          onChange={(e) => {
                            handlePicChange(e);
                            const file = e?.target?.files
                              ? e?.target?.files[0]
                              : "";
                            values.image = file;
                          }}
                        />
                      </Card>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    {/* nested Container */}
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12} > */}
                      <Grid
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          paddingTop: 2,
                          paddingLeft: 2,
                          paddingRight: 1,
                          paddingBottom: 1,
                        }}
                      >
                        <Box>
                          {
                            <>
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: 600, fontSize: "1.2em" }}
                              >
                                {op == "add" ? "Add" : "Edit"}
                              </Typography>
                            </>
                          }
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="given-name"
                          size="small"
                          required
                          fullWidth
                          id="name"
                          label="Name"
                          name="name"
                          autoFocus={values?.name ? false : true}
                          value={values?.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.name && errorsValue?.name
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.name && errorsValue?.name
                              ? errorsValue?.name
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="Price"
                          size="small"
                          name="price"
                          required
                          fullWidth
                          id="price"
                          label="Price"
                          value={values?.price}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.price && errorsValue?.price
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.price && errorsValue?.price
                              ? errorsValue?.price
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="quantity"
                          size="small"
                          name="quantity"
                          required
                          fullWidth
                          id="quantity"
                          label="Qty"
                          value={values?.quantity}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.quantity && errorsValue?.quantity
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.quantity && errorsValue?.quantity
                              ? errorsValue?.quantity
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="desc"
                          size="small"
                          name="desc"
                          required
                          fullWidth
                          multiline
                          minRows={3}
                          id="desc"
                          label="Description"
                          value={values?.desc}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.desc && errorsValue?.desc
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.desc && errorsValue?.desc
                              ? errorsValue?.desc
                              : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* fullWidth item */}
                  <Grid
                    sx={{ display: "flex", justifyContent: "center" }}
                    item
                    xs={12}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isValid && productPic != "" ? false : true}
                    >
                      {`${op == "add" ? "Add" : "Edit"} 
                      ${"product"}`}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
};

export default AddEditProduct;
