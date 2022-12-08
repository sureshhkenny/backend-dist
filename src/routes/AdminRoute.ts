import { Router } from "express";
import Game from "../controller/GameController";
import { Use } from "../middleware/ErrorHandling";
const Admin = Router();
import multer from "multer";
import { auth } from "../middleware/adminToken";
const storage = multer.memoryStorage();
const upload = multer({ storage });

Admin.use(auth);

Admin.post("/course", Use(Game.coursePost));
Admin.get("/course", Use(Game.courseGet));
Admin.post("/belt", Use(Game.beltAdd));
Admin.get("/belt", Use(Game.beltGet));
Admin.post("/game/:course_id", Use(Game.gamePost));
Admin.put("/game/:game_id", Use(Game.gameUpdate));
Admin.get("/game/:course_id", Use(Game.adminGame));
Admin.get("/game/:game_id/load", Use(Game.gameSingleJson));
Admin.get("/game/:game_id/data", Use(Game.gameSingle));
Admin.post("/asset", upload.single("file"), Use(Game.assetPost));
Admin.post("/assets", upload.array("files", 10), Use(Game.assetsPost));
Admin.get("/asset", Use(Game.assetRead));
Admin.get("/asset/:asset_id", Use(Game.assetGet));
Admin.post("/asset/upload", Use(Game.addAsset));

export default Admin;

// games.post("/games", Game.game_post);
// games.get("/games", Game.game_get);
// games.get("/game/:game_id", Game.game_get_one);
// games.get("/game/:game_id/all", Game.game_get_all);
// games.get("/project/:project_id", Game.project_get);
// games.put("/project/:project_id", Game.project_update);
// games.get("/project", Game.project_read);
// games.post("/project", Game.add_game);
// games.put("/project/:project_id", Game.update_game);
