import { DataTypes, Model } from "../../deps.ts";

import { Values } from "../../deps.types.ts";

import connection from "./connection.ts";

import { ProductType } from "./types/product.types.ts";

class Product extends Model {
  static table = "products";
  static timestamps = true;

  static fields = {
    // id: { primaryKey: true, autoIncrement: true },
    _id: { primaryKey: true },
    name: { type: DataTypes.STRING, unique: true },
    count: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    isActive: DataTypes.BOOLEAN,
  };

  static defaults = {
    count: 0,
    price: 0,
    isActive: false,
  };

  /**
   * get products
   * @returns {Promise<Model[]>} products
   */
  static getProducts(): Promise<Model[]> {
    return this.all();
  }

  /**
   * add product
   * @param product product
   * @returns {Promise<Model>} created product
   */
  static async addProduct(product: ProductType & Values): Promise<Model> {
    const productExists: number = await this.where({
      name: product.name,
    }).count();

    if (productExists > 0) {
      throw new Error("product already exists!");
    }

    return this.create(product);
  }

  /**
   * update product
   * @param product product
   * @returns {Promise<Model | Model[]>} created product
   */
  static updateProduct(
    product: ProductType & Values
  ): Promise<Model | Model[]> {
    return this.where({ _id: product.id as number }).update(product);
  }

  /**
   * delete product
   * @param id product id
   * @returns {Promise<Model | Model[]>} created product
   */
  static deleteProduct(id: string): Promise<Model | Model[]> {
    return this.deleteById(id);
  }
}

connection.link([Product]);

// await connection.sync({ drop: false });

export default Product;
