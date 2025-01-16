import { RssDataEntity } from '../../../../../rss-data/infrastructure/persistence/relational/entities/rss-data.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'rss_translate',
})
export class RssTranslateEntity extends EntityRelationalHelper {
  @OneToOne(() => RssDataEntity, { eager: true, nullable: false })
  @JoinColumn()
  rssData: RssDataEntity;

  @Column({
    nullable: true,
    type: String,
  })
  content?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  title: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
