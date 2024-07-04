// import prisma from "../config/database";
// import { Role } from "../interfaces/role.enum";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { v4 as uuidv4 } from "uuid";
// import nodemailer from "nodemailer";

// const registerUser = async (email: string, password: string, name: string, role: Role = Role.USER) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword,
//         name,
//         role
//       }
//     });
//     return newUser;
//   } catch (error: any) {
//     if (error.code === 'P2002' && error.meta?.target.includes('email')) {
//       throw new Error('A user with the same email already exists');
//     }
//     throw error;
//   }
// };

// const loginUser = async (email: string, password: string) => {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (user && await bcrypt.compare(password, user.password)) {
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1h" }
//     );
//     return token;
//   }
//   return null;
// };

// const requestPasswordReset = async (email: string) => {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     throw new Error('No user found with that email address');
//   }

//   const resetToken = uuidv4();
//   const resetTokenExpiry = new Date();
//   resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token expires in 1 hour

//   await prisma.passwordReset.create({
//     data: {
//       email,
//       token: resetToken,
//       expiry: resetTokenExpiry
//     }
//   });

//   // Send email to user with the reset link
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Password Reset',
//     text: `Please click the following link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
//   };

//   await transporter.sendMail(mailOptions);

//   return resetToken;
// };

// const resetPassword = async (token: string, newPassword: string) => {
//   const passwordReset = await prisma.passwordReset.findUnique({ where: { token } });

//   if (!passwordReset || passwordReset.expiry < new Date()) {
//     throw new Error('Invalid or expired token');
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   const updatedUser = await prisma.user.update({
//     where: { email: passwordReset.email },
//     data: { password: hashedPassword }
//   });

//   // Remove the password reset token after successful password update
//   await prisma.passwordReset.delete({ where: { token } });

//   return !!updatedUser;
// };

// export { registerUser, loginUser, requestPasswordReset, resetPassword };


import prisma from "../config/database";
import { Role } from "../interfaces/role.enum";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


/**
 * Function to register a new user
 * @param email 
 * @param password 
 * @param name 
 * @param role 
 * @returns 
 */
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


/**
 * Function to login a user
 * @param email 
 * @param password 
 * @returns 
 */
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


/**
 * Function to reset a user's password
 * @param email 
 * @param newPassword 
 * @returns 
 */
const resetPassword = async (email: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword }
  });
  return !!updatedUser;
};

export { registerUser, loginUser, resetPassword };

