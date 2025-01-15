import { ApiProperty } from '@nestjs/swagger';
import Parser from 'rss-parser';

export class Rss {
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  data?: Parser.Output<any> | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  link: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
