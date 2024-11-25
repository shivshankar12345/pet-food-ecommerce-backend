import { NextFunction, Request, Response } from "express";
import CartService from "../services/cart.service";
import Responses from "../modules/responses";
import ApplicationError from "../error/ApplicationError";

const cartService = new CartService();
export default class CartController {
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { product_id } = req.body;
      const { id } = req as any;
      if (!product_id) {
        throw new ApplicationError(400, "Provide Product Id");
      }
      const cartItem = await cartService.add(id, product_id);
      Responses.generateSuccessResponse(res, 200, { cartItem });
    } catch (error) {
      next(error);
    }
  }
  async getCartItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, page_num } = req.query;
      const { id } = req as any;
      const limitOfDocs = limit ? parseInt(limit as string) : 10;
      const skipElements =
        (page_num ? parseInt(page_num as string) - 1 : 0) * limitOfDocs;
      const data = await cartService.get(id, limitOfDocs, skipElements);
      const total_pages =
        (Math.trunc(data.total_items / limitOfDocs) ==
        data.total_items / limitOfDocs
          ? data.total_items / limitOfDocs
          : Math.trunc(data.total_items / limitOfDocs) + 1) || 1;
      return Responses.generateSuccessResponse(res, 200, {
        data: {
          ...data,
          current_page: page_num ? parseInt(page_num as string) : 1,
          total_pages,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCartQuantity(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const { qty, cart_id } = req.body;
      if (!qty) {
        throw new ApplicationError(400, "Please Provide the Quantity !!");
      }
      await cartService.update(id, cart_id, qty);
      Responses.generateSuccessResponse(res, 200, {
        message: "Quantity Updated Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async deletCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const { cart_item_id } = req.query;
      if (!cart_item_id) {
        throw new ApplicationError(400, "Please Provide Cart Id");
      }
      await cartService.delete(id, cart_item_id as string);
      return Responses.generateSuccessResponse(res, 200, {
        message: "Item Deleted Successfully !!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req as any;
      const { cart_id } = req.query;
      const item = await cartService.getOne(id, cart_id as string);
      return Responses.generateSuccessResponse(res, 200, { item });
    } catch (error) {
      next(error);
    }
  }
}
