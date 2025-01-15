import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import Parser from 'rss-parser';

@Entity({
  name: 'rss',
})
export class RssEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: 'json',
  })
  data?: Parser.Output<any> | null;

  @Column({
    nullable: false,
    type: String,
  })
  link: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
