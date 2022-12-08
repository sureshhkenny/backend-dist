import { createConnection } from "typeorm";
import { User } from "../entities/user";
import Asset from "../entities/Master/Asset";
import Game from "../entities/Master/Game";
import { AssetUpload } from "../entities/Master/AssetUpload";
import Course from "../entities/Course";
import UGame from "../entities/Transaction/UProject";
import Belt from "../entities/Master/Belt";

export default async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "screenit.cpgmuun9semi.ap-south-1.rds.amazonaws.com",
      port: 5000,
      username: "postgres",
      password: "ScreenitawsDB2020",
      database: "scratch_test",
      // host: "schoolcode.chbbwydjh9iv.eu-west-2.rds.amazonaws.com",
      // port: 5432,
      // password: "schoolcodeuser",
      // database: "schoolcode",
      entities: [User, Course, Asset, Game, UGame, AssetUpload, Belt],
      synchronize: true,
    });
    console.log("connected to global postgres");
  } catch (err) {
    console.log("Unable to connect\n", err);
  }
};
