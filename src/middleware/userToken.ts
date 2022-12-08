import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/user";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.json({ success: false, msg: "You must be login" });
    } else {
      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
      (req as CustomRequest).token = decoded;
      const { userId }: any = decoded;
      const user = await User.findOneById(userId);
      if (user?.role == "student") {
        res.setHeader("userId", user.id!);
        next();
      } else {
        res.json({ success: false, msg: "access denied" });
      }
    }
  } catch (err) {
    res.status(401).json({ success: false, msg: "invalid token" });
  }
};
