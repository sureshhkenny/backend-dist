import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/user";
const router = express.Router();

router.post(
  "/api/signup",
  [
    check("password", "password must be more than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req: any, res: any) => {
    try {
      const { username, password } = req.body;
      const hashpassword = await bcrypt.hash(password, 10);

      // const token = await JWT.sign({ username }, tkn, { expiresIn: "365d" });

      const check = await User.findOneBy({ username });
      if (!check) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({ errors: errors.array() });
        }

        const user = User.create({
          username,
          password: hashpassword,
        });

        await user.save();
        const token = jwt.sign(
          { userId: user.id },
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: "2400s" }
        );
        res.status(201).json({
          success: true,
          token,
          user_id: user.id,
          msg: "registered successfully",
        });
      } else {
        res.json({ success: false, msg: "user already exist" });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, msg: "invalid request" });
    }
  }
);

router.post("/api/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOneBy({ username });

  if (!user) {
    return res.json({ success: false, msg: "Invalid credentials" }); // Can't find user
  }
  try {
    const token = jwt.sign(
      { userId: user.id },
      `${process.env.ACCESS_TOKEN_SECRET}`
      // { expiresIn: "2400s" }
    );
    if (user.password && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        success: true,
        msg: "Successfully logged in",
        user_id: user.id,
        role: user.role,
        token,
      });
    } else {
      return res.json({
        success: false,
        msg: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: "invalid request" });
  }
});

router.get("/api", async (_: Request, res: Response) => {
  try {
    res.json({ success: true, msg: "Welcome to Schoolcode api..." });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "invalid request" });
  }
});

export { router as createUser };
