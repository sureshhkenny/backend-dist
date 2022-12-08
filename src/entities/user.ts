import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Entity("m_user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;
  @Column({ unique: true })
  username?: string;
  @Column()
  password?: string;
  @Column({ default: "student" })
  role?: string;
  @Column({ default: true })
  status?: Boolean;
  @CreateDateColumn()
  created_on?: Date;
  @UpdateDateColumn()
  updated_on?: Date;
}
