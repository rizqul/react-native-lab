import { ProductListResponse, ProductParams } from "../utils/types/product";
import { api } from "./api";

export async function getProducts(params: ProductParams = {}): Promise<ProductListResponse> {
  const { page = 1, pageSize = 10, sortDir = "asc" } = params;

  const response = await api.get("/products", { params: { page, pageSize, sortDir } });

  return response.data;
}
