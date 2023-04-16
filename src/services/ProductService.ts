import "../api/index";
import { API, endPoints } from "../api/index";
import ProductModel from "../shared/models/productModel";

class ProductService {
  static createProduct(product: ProductModel | FormData) {
    return API.post(endPoints.api.products.create, product);
  } //createProduct

  static updateProduct(id: string, product: ProductModel | FormData) {
    return API.put(endPoints.api.products.update + id, product);
  } //updateProduct

  static deleteProduct(id: string) {
    return API.delete(endPoints.api.products.delete + id);
  } //deleteProduct

  static fetchAllProducts(query = "") {
    return API.get(endPoints.api.products.getAll + query);
  } //fetchAllProducts

  static fetchOneProduct(id: string) {
    return API.get(endPoints.api.products.getOne + id);
  } //fetchOneProduct
}
export default ProductService;
