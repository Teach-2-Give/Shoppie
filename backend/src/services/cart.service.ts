import prisma from "../config/database";

const addToCart = async (userId: number, productId: number, quantity: number) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });
  
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        items: {
          create: {
            productId,
            quantity
          }
        }
      },
      include: {
        items: true
      }
    });
  } else {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId }
    });
    
    if (existingCartItem) {
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      });
    }
    
    cart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true }
    });
  }
  
  return cart;
};

const getCart = async (userId: number) => {
  return await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }
  });
};

export { addToCart, getCart };