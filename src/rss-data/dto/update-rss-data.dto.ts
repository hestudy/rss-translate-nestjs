// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRssDataDto } from './create-rss-data.dto';

export class UpdateRssDataDto extends PartialType(CreateRssDataDto) {}
