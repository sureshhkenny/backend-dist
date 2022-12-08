import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createUser } from "./routes/createUser";
import Admin from "./routes/AdminRoute";
import db from "./config/db";
import Student from "./routes/StudentRoute";
db();
// import db_test from "./config/db_test";
// db_test();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", createUser);
app.use("/api/master", Admin);
app.use("/api", Student);

app.use(function (err: any, _: Request, res: Response, next: NextFunction) {
  console.log(err);
  console.log("calling next function...", next);
  res.json({ success: false, msg: "invalid request" });
});

app.listen(5000, () => console.log("Server is running on port 5000"));
