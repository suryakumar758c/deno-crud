import { Status, STATUS_TEXT } from "../../deps.ts";

import Product from "../models/product.model.ts";

import type { ApiResponse, RouterContext } from "../../deps.types.ts";

import type { DeleteProductRequestParam } from "./types/product.controller.types.ts";

/**
 * product controller
 */
class ProductController {
  /**
   * get products
   * @param context context
   */
  async getProducts(context: RouterContext<any>): Promise<void> {
    let result: ApiResponse = {
      status: Status.BadRequest,
      message: STATUS_TEXT.get(Status.BadRequest) as string,
      data: [],
    };

    try {
      const data: Product[] = await Product.getProducts();

      result = {
        status: Status.OK,
        message: STATUS_TEXT.get(Status.OK) as string,
        data,
      };
    } catch (error) {
      console.error("getProducts", error);
      result.data = error.message;
    }

    context.response.status = result.status;
    context.response.body = result;
  }

  /**
   * add product
   * @param context context
   */
  async addProduct(context: RouterContext<any>): Promise<void> {
    let result: ApiResponse = {
      status: Status.BadRequest,
      message: STATUS_TEXT.get(Status.BadRequest) as string,
      data: [],
    };

    try {
      const product = await context.request.body({ type: "json" }).value;

      console.log(product);

      const productAdded = await Product.addProduct(product);

      result.status = Status.Created;
      result.message = STATUS_TEXT.get(Status.Created) as string;
      result.data = productAdded;
    } catch (error) {
      console.error("addProduct", error);
      result.data = error.message;
    }

    context.response.status = result.status;
    context.response.body = result;
  }

  /**
   * update product
   * @param context context
   */
  async updateProduct(context: RouterContext<any>): Promise<void> {
    let result: ApiResponse = {
      status: Status.BadRequest,
      message: STATUS_TEXT.get(Status.BadRequest) as string,
      data: [],
    };

    try {
      const product = await context.request.body({ type: "json" }).value;

      console.log(product);

      if (!product?.id) {
        throw new Error("product id required!");
      }

      const productUpdated = await Product.updateProduct(product);

      result.status = Status.OK;
      result.message = STATUS_TEXT.get(Status.OK) as string;
      result.data = productUpdated;
    } catch (error) {
      console.error("updateProduct", error);
      result.data = error.message;
    }

    context.response.status = result.status;
    context.response.body = result;
  }

  /**
   * delete product
   * @param context context
   */
  async deleteProduct(
    context: RouterContext<any, DeleteProductRequestParam, any>
  ): Promise<void> {
    let result: ApiResponse = {
      status: Status.BadRequest,
      message: STATUS_TEXT.get(Status.BadRequest) as string,
      data: [],
    };

    try {
      const { id } = context.params;

      console.log({ id });

      if (!id) {
        throw new Error("product id required!");
      }

      const productDeleted = await Product.deleteProduct(id);

      result.status = Status.Accepted;
      result.message = STATUS_TEXT.get(Status.Accepted) as string;
      result.data = productDeleted;
    } catch (error) {
      console.error("deleteProduct", error);
      result.data = error.message;
    }

    context.response.status = result.status;
    context.response.body = result;
  }
}

export default new ProductController();
