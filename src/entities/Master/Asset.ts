import { Entity, Column } from "typeorm";
import { Base } from "../base";

@Entity("m_assets")
export default class Asset extends Base {
  @Column()
  file_type?: string;
  @Column()
  file_name?: string;
  @Column()
  md5_ext?: string;
  @Column({ default: true })
  status?: boolean;
  @Column({ nullable: true })
  url?: string;
}
