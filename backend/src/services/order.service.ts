import prisma from "../config/database";
import { Order } from "../interfaces/order.interface";

const createOrder = async (userId: number): Promise<Order> => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const orderItems = cart.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity
  }));

  const total = cart.items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

  const newOrder = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: orderItems
      }
    },
    include: { items: { include: { product: true } } }
  });

  // Clear the cart after creating the order
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return newOrder;
};

export { createOrder };