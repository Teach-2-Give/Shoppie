import prisma from "../config/database";
import { Role } from "../interfaces/role.enum";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (email: string, password: string, name: string, role: Role = Role.USER) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });
    return newUser;
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target.includes('email')) {
      throw new Error('A user with the same email already exists');
    }
    throw error;
  }
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string, /**Ensure JWT_SECRET is provided */
      { expiresIn: "1h" }
    );
    return token;
  }
  return null;
};

const resetPassword = async (email: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword }
  });
  return !!updatedUser;
};

export { registerUser, loginUser, resetPassword };