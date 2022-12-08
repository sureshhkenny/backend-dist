import { Router } from "express";
import { auth } from "../middleware/userToken";
import Game from "../controller/GameController";
import { Use } from "../middleware/ErrorHandling";
const Student = Router();

Student.use(auth);
Student.use(auth);

Student.get("/course", Use(Game.courseGet));
Student.get("/game/:course_id", Use(Game.gameGet));
Student.get("/game/:game_id/load", Use(Game.gameSingleJson));
Student.get("/game/:game_id/data", Use(Game.gameSingle));
Student.post("/u_game/:game_id", Use(Game.userGamePost));
Student.get("/u_game/:game_id", Use(Game.userGameGet));
Student.get("/u_game", Use(Game.userGameAll));
Student.get("/u_game/:u_game_id/load", Use(Game.userGameSingle));
Student.get("/u_game/:u_game_id/data", Use(Game.userGameData));
Student.put("/u_game/:u_game_id", Use(Game.userGameUpdate));
Student.get("/project/:project_id", Use(Game.projectSingle));
Student.post("/master/asset/upload", Use(Game.addAsset));

export default Student;
