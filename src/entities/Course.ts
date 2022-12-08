import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./base";
import Project from "./Master/Game";

@Entity("m_course")
export default class Course extends Base {
  @Column()
  name?: string;
  @Column({ nullable: true })
  thumnail_url?: string;
  @Column({ default: false })
  status?: Boolean;

  @OneToMany(() => Project, (project: any) => project.course)
  project?: Project[];

  // @Column()
  // stages?: string;
  // @Column()
  // games?: string;
  // @Column()
  // scratch_url?: string;
  // @Column()
  // json_data?: string;
  // @Column()
  // image?: string;
}
