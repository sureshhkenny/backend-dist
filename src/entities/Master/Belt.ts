import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base } from "../base";
import Game from "./Game";

@Entity("m_belt")
export default class Belt extends Base {
  @Column()
  name?: string;
  @OneToMany(() => Game, (game: any) => game.belt)
  game?: Game[];
}
