import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base } from "../base";
import Course from "../Course";
import T_Project from "../Transaction/UProject";
import Belt from "./Belt";

@Entity("m_game")
export default class Game extends Base {
  @Column()
  course_id?: string;
  @Column()
  name?: string;
  @Column()
  stage?: string;
  @Column()
  level?: number;
  @Column()
  stage_number?: number;
  @Column({ nullable: true })
  created_by?: string;
  @Column()
  json?: string;
  @Column({ nullable: true })
  thumnail_url?: string;
  @Column()
  belt_id?: string;
  @ManyToOne(() => Course, (course: any) => course.project)
  @JoinColumn({ name: "course_id" })
  course?: Course;
  @ManyToOne(() => Belt, (belt: any) => belt.game)
  @JoinColumn({ name: "belt_id" })
  belt?: Belt;
  @Column({ default: true })
  status?: boolean;

  @OneToMany(() => T_Project, (temp: any) => temp.project)
  temp?: T_Project[];
}
