import { RssData } from '../../rss-data/domain/rss-data';
import { ApiProperty } from '@nestjs/swagger';

export class RssTranslate {
  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  link: string;

  @ApiProperty({
    type: () => RssData,
    nullable: false,
  })
  rssData: RssData;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  content?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
