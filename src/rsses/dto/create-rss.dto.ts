import { IsUrl } from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateRssDto {
  data?: any | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsUrl()
  link: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
