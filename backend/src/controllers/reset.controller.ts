import { Request, Response } from "express";
import { requestPasswordReset, resetPassword } from "../services/password-reset";

export const requestPasswordResetHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await requestPasswordReset(email);
    res.json({ message: "Password reset email sent" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    await resetPassword(token, newPassword);
    res.json({ message: "Password reset successful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
