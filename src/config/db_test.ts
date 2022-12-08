import { createConnection } from "typeorm";
import { User } from "../entities/user";
import Games from "../entities/Course";

export default async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      database: "scratch",
      entities: [User, Games],
      synchronize: true,
    });
    console.log("connected to local postgres");
  } catch (err) {
    console.log("Unable to connect\n", err);
  }
};
