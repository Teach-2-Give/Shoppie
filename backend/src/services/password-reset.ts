import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';

import bcrypt from 'bcrypt';
import { addHours } from 'date-fns'; // Utility to add hours to the current date
import { sendResetEmail } from './emailservice';

export const requestPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const token = uuidv4();
  const expiresAt = addHours(new Date(), 1); // Token expires in 1 hour

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt
    }
  });

  await sendResetEmail(email, token);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!passwordResetToken || new Date() > passwordResetToken.expiresAt) {
    throw new Error("Invalid or expired password reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: passwordResetToken.userId },
    data: { password: hashedPassword }
  });

  await prisma.passwordResetToken.delete({
    where: { id: passwordResetToken.id }
  });

  return true;
};
