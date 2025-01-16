import { RssEntity } from '../../../../../rsses/infrastructure/persistence/relational/entities/rss.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import Parser from 'rss-parser';

@Entity({
  name: 'rss_data',
})
export class RssDataEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: String,
  })
  link: string;

  @ManyToOne(() => RssEntity, { eager: true, nullable: false })
  rss: RssEntity;

  @Column({
    nullable: false,
    type: 'json',
  })
  data: Parser.Item;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
