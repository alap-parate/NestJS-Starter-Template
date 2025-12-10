import { BaseEntity } from "@/shared/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Demo extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
