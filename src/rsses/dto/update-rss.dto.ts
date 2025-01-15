// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRssDto } from './create-rss.dto';

export class UpdateRssDto extends PartialType(CreateRssDto) {}
