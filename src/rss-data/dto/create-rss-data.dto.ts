import { RssDto } from '../../rsses/dto/rss.dto';

import {
  IsJSON,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import Parser from 'rss-parser';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateRssDataDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  link: string;

  @ApiProperty({
    required: true,
    type: () => RssDto,
  })
  @ValidateNested()
  @Type(() => RssDto)
  @IsNotEmptyObject()
  rss_id: RssDto;

  @ApiProperty({
    required: true,
    type: () => Object,
  })
  @IsJSON()
  data: Parser.Item;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
