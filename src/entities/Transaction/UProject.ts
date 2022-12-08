import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "../base";
import Project from "../Master/Game";

@Entity("u_project")
export default class UGame extends Base {
  @Column()
  user_id?: string;
  @Column()
  game_id?: string;
  @Column()
  json?: string;
  @Column({ nullable: true })
  name?: string;
  @Column({ default: false })
  status?: boolean;

  @ManyToOne(() => Project, (project: any) => project.temp)
  @JoinColumn({ name: "game_id" })
  project?: Project;
}
