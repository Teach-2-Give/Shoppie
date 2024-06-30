import { Request, Response, NextFunction } from "express";
import { Role } from "../interfaces/role.enum";

const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as Role)) {
      return res.status(403).json({ error: "Forbidden, you do not have the required role" });
    }
    next();
  };
};

export { authorize };