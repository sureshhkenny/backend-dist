import { Request, Response } from "express";
import Asset from "../entities/Master/Asset";
import { uploadImage, uploadFile } from "../middleware/s3";
import Service from "../services/UserService";
import { AssetUpload } from "../entities/Master/AssetUpload";
import Course from "../entities/Course";
import Game from "../entities/Master/Game";
import UGame from "../entities/Transaction/UProject";
import { User } from "../entities/user";
import Belt from "../entities/Master/Belt";
export default {
  coursePost: async (req: Request, res: Response) => {
    const { name } = req.body;
    const course = Course.create({ name });
    await course.save();
    res.json({ success: true, msg: "course added successfully" });
  },
  courseGet: async (_: Request, res: Response) => {
    const courses = await Course.find({ order: { created_on: "ASC" } });
    res.json({ success: true, courses });
  },
  beltAdd: async (req: Request, res: Response) => {
    const { name } = req.body;
    const belt = Belt.create({ name });
    await belt.save();
    res.json({ success: true, msg: "belt added successfully" });
  },
  beltGet: async (_: Request, res: Response) => {
    const belt = await Belt.find();
    res.json({ success: true, belt });
  },
  gamePost: async (req: Request, res: Response) => {
    const { course_id } = req.params;
    const { name, stage, thumnail_url, json, belt_id } = req.body;
    const course = await Course.findOneById(course_id);
    const stage_number = stage.split("-");
    if (!course) {
      res.json({ success: false, msg: "course not found" });
    } else {
      const game = Game.create({
        course_id,
        name,
        stage,
        stage_number: stage_number[0],
        level: stage_number[1] ? stage_number[1] : 1,
        thumnail_url,
        json,
        belt_id,
      });
      await game.save();
      res.json({ success: true, game, msg: "game added successfully" });
    }
  },
  gameUpdate: async (req: Request, res: Response) => {
    const { game_id } = req.params;
    const game = await Game.findOneById(game_id);
    if (!game) {
      res.json({ success: false, msg: "game not found" });
    } else {
      const update = await Game.merge(game, req.body);
      await update.save();
      res.json({ success: true, msg: "game updated successfully" });
    }
  },
  gameGet: async (req: Request, res: Response) => {
    const { course_id } = req.params;
    const user_id: any = res.getHeader("userId");
    const games = await Game.find({
      where: { course_id },
      order: { stage: "ASC" },
      relations: ["belt"],
    });
    if (games.length == 0 || !user_id) {
      res.json({ success: false, msg: "no games found" });
    } else {
      for (let i = 0; i < games.length; i++) {
        const ug = await UGame.findOneBy({
          user_id,
          game_id: games[i].id,
        });

        if (!ug || games[i].belt_id != "fe412b49-5aca-4147-84a5-3adf99dfe7d7") {
          games[i]["status"] = false;
        } else {
          games[i]["status"] = true;
        }
        if (
          games[i].belt_id == "fe412b49-5aca-4147-84a5-3adf99dfe7d7" &&
          games[i].stage == "01-01"
        ) {
          games[i]["status"] = true;
        }
      }

      res.json({ success: true, games });
    }
  },
  adminGame: async (req: Request, res: Response) => {
    const { course_id } = req.params;
    const games = await Game.find({
      where: { course_id },
      order: { stage: "ASC" },
      relations: ["belt"],
    });
    res.json({ success: true, games });
  },
  gameSingleJson: async (req: Request, res: Response) => {
    const { game_id } = req.params;
    const game = await Game.findOneById(game_id);
    if (!game) {
      res.json({ success: false, msg: "game not found" });
    } else {
      res.send(game.json);
    }
  },
  gameSingle: async (req: Request, res: Response) => {
    const { game_id } = req.params;
    const game = await Game.findOneById(game_id);
    if (!game) {
      res.json({ success: false, msg: "game not found" });
    } else {
      res.json({ success: true, game });
    }
  },
  userGamePost: async (req: Request, res: Response) => {
    const { game_id } = req.params;
    const { user_id, json, name } = req.body;
    const game = await Game.findOneById(game_id);
    const ug = await UGame.findOneBy({ user_id, game_id });
    const user = await User.findOneById(user_id);
    if (!game || !user) {
      res.json({ success: false, msg: "game or user not found" });
    } else {
      if (!ug) {
        const userGame = UGame.create({ user_id, game_id, json, name });
        await userGame.save();
        res.json({
          success: true,
          msg: "game created successfully",
          userGame,
        });
      } else {
        const update = await UGame.merge(ug, req.body, { json: ug.json });
        await update.save();
        res.json({ success: true, msg: "game updated successfully", update });
      }
    }
  },
  userGameGet: async (req: Request, res: Response) => {
    const { game_id } = req.params;
    const game = await UGame.findBy({ game_id });
    if (!game) {
      res.json({ success: false, msg: "game not found" });
    } else {
      res.json({ success: true, game });
    }
  },
  userGameAll: async (_: Request, res: Response) => {
    const game = await UGame.find();
    if (!game) {
      res.json({ success: false, msg: "game not found" });
    } else {
      res.json({ success: true, game });
    }
  },
  userGameSingle: async (req: Request, res: Response) => {
    const { u_game_id } = req.params;
    const userGame = await UGame.findOneById(u_game_id);
    if (!u_game_id) {
      res.json({ success: false, msg: "game not found" });
    } else {
      res.send(userGame?.json);
    }
  },
  userGameData: async (req: Request, res: Response) => {
    const { u_game_id } = req.params;
    const userGame = await UGame.findOneById(u_game_id);
    if (!u_game_id) {
      res.json({ success: false, msg: "game not found" });
    } else {
      res.json({ success: true, userGame });
    }
  },
  userGameUpdate: async (req: Request, res: Response) => {
    const { u_game_id } = req.params;
    const ug = await UGame.findOneById(u_game_id);
    if (!u_game_id) {
      res.json({ success: false, msg: "game not found" });
    } else {
      if (
        (req.body.json == ug?.json && ug?.status == false) ||
        ug?.status == true
      ) {
        const update = await UGame.merge(ug, req.body);
        await update.save();
      } else {
        const update = await UGame.merge(ug, req.body, {
          status: true,
        });
        await update.save();

        let belt_id = "fe412b49-5aca-4147-84a5-3adf99dfe7d7";

        const current = await Game.findOneBy({
          id: ug?.game_id,
          belt_id,
        });
        const nextStage = parseInt(`${current?.stage_number}`) + 1;
        const nextGame1 = await Game.findOneBy({
          level: current?.level,
          stage_number: nextStage,
          belt_id,
        });

        if (!nextGame1) {
          const nextLevel = parseInt(`${current?.level}`) + 1;
          const nextGame2 = await Game.findOneBy({
            level: nextLevel,
            stage_number: 1,
            belt_id,
          });

          const check = await UGame.findOneBy({
            game_id: nextGame2?.id,
            user_id: ug?.user_id,
          });
          if (!check) {
            const next_game = UGame.create({
              user_id: ug?.user_id,
              game_id: nextGame2?.id,
              json: nextGame2?.json,
            });
            await next_game.save();
          }
        } else {
          const check = await UGame.findOneBy({
            game_id: nextGame1.id,
            user_id: ug?.user_id,
          });

          if (!check) {
            const next_game = UGame.create({
              user_id: ug?.user_id,
              game_id: nextGame1.id,
              json: nextGame1.json,
            });
            await next_game.save();
          }
        }
      }

      res.json({ success: true, msg: "user game updated successfully" });
    }
  },
  projectSingle: async (req: Request, res: Response) => {
    const { project_id } = req.params;
    const project = await Game.findOneById(project_id);
    if (!project) {
      res.json({ success: false, msg: "no project found" });
    } else {
      res.send(project.json);
    }
  },
  assetPost: async (req: Request, res: Response) => {
    const file = req.file;
    const { assetId, dataFormat } = req.body;
    const name = `${assetId}.${dataFormat}`;
    Service.asset_post(assetId, dataFormat, name);
    await uploadImage(file, name);
    res.json({ success: true, msg: "asset added successfully" });
  },
  assetsPost: async (req: Request, res: Response) => {
    const file = req.files;
    const { assetId, dataFormat } = req.body;
    const name = `${assetId}.${dataFormat}`;
    Service.asset_post(assetId, dataFormat, name);
    await uploadImage(file, name);
    res.json({ success: true, msg: "asset added successfully" });
  },
  assetGet: async (req: Request, res: Response) => {
    const { asset_id } = req.params;
    const asset = await Asset.findBy({ md5_ext: asset_id });
    if (!asset) {
      res.json({ success: false, msg: "asset not found" });
    } else {
      res.json({ success: true, asset });
    }
  },
  assetRead: async (_: Request, res: Response) => {
    const asset = await Asset.find();
    res.json({ success: true, asset });
  },
  projectUpdate: async (req: Request, res: Response) => {
    const { project_id } = req.params;
    const project = await Game.findOneById(project_id);
    if (!project) {
      res.json({ success: false, msg: "project not found" });
    } else {
      const update = await Game.merge(project, req.body);
      await update.save();
      res.json({ success: true, msg: "project updated successfully" });
    }
  },
  addAsset: async (req: Request, res: Response) => {
    const { assetId, assetType, data, dataFormat } = req.body;
    const md5 = `${assetId}.${dataFormat}`;
    const url = `https://tts-scratch.s3.ap-south-1.amazonaws.com/${md5}`;
    const asset = AssetUpload.create({
      assetId,
      assetType,
      url,
      dataFormat,
      md5,
    });
    await uploadFile(data, md5, assetType);
    await asset.save();
    res.json({ success: true, msg: "Asset added successfully" });
  },
};
