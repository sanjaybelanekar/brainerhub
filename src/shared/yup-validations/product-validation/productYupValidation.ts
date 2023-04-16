import * as yup from "yup";
import ProductModel from "../../models/productModel";

const defineProductYupSchema = ({
  has_id = false,
  hasName = false,
  hasPrice = false,
  hasDesc = false,
  hasQuantity = false,
  hasImage = false,
}) => {
  const initialProduct: any = {};

  if (hasName) initialProduct.name = yup.string().required("Title is required");
  if (hasDesc)
    initialProduct.desc = yup.string().required("Description is required");
  if (hasPrice)
    initialProduct.price = yup.string().required("Price is required");
  if (hasQuantity)
    initialProduct.quantity = yup.string().required("Quantity is required");

  if (hasImage)
    initialProduct.image = yup.string().required("Image is required");

  return yup.object().shape(initialProduct);
};

export default defineProductYupSchema;
