import { User } from "../entity/user.entity";
import ApplicationError from "../error/ApplicationError";
import { cartRepository } from "../repository/cart.repository";
import { productRepository } from "../repository/product.repository";
import { userRepository } from "../repository/user.repository";
export default class CartService {
  private async getUser(id: string) {
    try {
      const user = await userRepository.findOne({
        where: { id },
        select: ["id"],
      });
      if (!user) {
        throw new ApplicationError(404, "User not found !!");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  private async getProduct(id: string) {
    try {
      const product = await productRepository.findOne({
        where: { id },
        select: ["id"],
      });
      if (!product) {
        throw new ApplicationError(404, "User not found !!");
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
  async add(user_id: string, product_id: string) {
    try {
      const user = await this.getUser(user_id);
      const product = await this.getProduct(product_id);
      const cartItemExists = await cartRepository.findOne({
        where: { user_id: user, product_id: product },
      });
      if (cartItemExists) {
        throw new ApplicationError(400, "Item Already Added");
      }
      const newCartItem = cartRepository.create({
        user_id: user,
        product_id: product,
        qty: 1,
      });
      await cartRepository.save(newCartItem);
      return newCartItem;
    } catch (error) {
      throw error;
    }
  }
  async get(user_id: string, take: number, skip: number) {
    try {
      const user = await this.getUser(user_id);
      const cartItems = await cartRepository.find({
        where: { user_id: user },
        take,
        skip,
        relations: { product_id: true, user_id: true },
      });
      const total_items = await cartRepository.count({
        where: { user_id: user },
      });
      return { cartItems, total_items };
    } catch (error) {
      throw error;
    }
  }
  async getOne(user_id: string, id: string) {
    try {
      const user = await this.getUser(user_id);
      const cartItem = await cartRepository.findOne({
        where: { user_id: user, id },
      });
      return cartItem;
    } catch (error) {
      throw error;
    }
  }

  async update(user_id: string, id: string, qty: number) {
    try {
      const user = await this.getUser(user_id);
      const cartItem = await cartRepository.findOne({
        where: { user_id: user, id },
      });
      if (!cartItem) {
        throw new ApplicationError(404, "Cart Item not found");
      }
      if (qty < 0 && cartItem.qty < -qty) {
        throw new ApplicationError(400, "Quantity Should not be Nagative !!");
      }
      cartItem.qty += qty;
      await cartRepository.save(cartItem);
      return cartItem;
    } catch (error) {
      throw error;
    }
  }
  async delete(user_id: string, id: string) {
    try {
      const user = await this.getUser(user_id);
      const cartItem = await cartRepository.findOne({
        where: { user_id: user, id },
      });
      if (!cartItem) {
        throw new ApplicationError(404, "Cart item not found !!");
      }
      await cartRepository.remove(cartItem);
    } catch (error) {
      throw error;
    }
  }
}
