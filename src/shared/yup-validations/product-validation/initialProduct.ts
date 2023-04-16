import ProductModel from "../../models/productModel";

const defineInitialProduct = ({
  has_id = false,
  hasName = false,
  hasPrice = false,
  hasDesc = false,
  hasQuantity = false,
  hasImage = false,
}) => {
  const initialProduct: any = {};

  if (has_id) initialProduct._id = "";
  if (hasName) initialProduct.name = "";
  if (hasPrice) initialProduct.price = "";
  if (hasDesc) initialProduct.desc = "";
  if (hasQuantity) initialProduct.quantity = "";
  if (hasImage) initialProduct.image = "";

  return initialProduct;
};

export default defineInitialProduct;
