import { Entity, Column } from "typeorm";
import { Base } from "../base";

@Entity("m_asset")
export class AssetUpload extends Base {
  @Column()
  assetId?: String;
  @Column({ type: "simple-json" })
  assetType?: {
    contentType: String;
    name: String;
    runtimeFormat: String;
    immutable: Boolean;
  };
  @Column({ default: true })
  clean?: Boolean;
  @Column()
  url?: String;
  @Column()
  dataFormat?: String;
  @Column()
  md5?: String;
}
