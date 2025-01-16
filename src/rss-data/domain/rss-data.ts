import { Rss } from '../../rsses/domain/rss';
import { ApiProperty } from '@nestjs/swagger';
import Parser from 'rss-parser';

export class RssData {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  link: string;

  @ApiProperty({
    type: () => Rss,
    nullable: false,
  })
  rss: Rss;

  @ApiProperty({
    type: () => Object,
    nullable: false,
  })
  data: Parser.Item;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
