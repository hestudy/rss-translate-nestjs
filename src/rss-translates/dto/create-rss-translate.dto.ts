import { RssDataDto } from '../../rss-data/dto/rss-data.dto';

import {
  // decorators here

  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreateRssTranslateDto {
  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  link: string;

  @ApiProperty({
    required: true,
    type: () => RssDataDto,
  })
  @ValidateNested()
  @Type(() => RssDataDto)
  @IsNotEmptyObject()
  rssData: RssDataDto;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  content?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  title: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
