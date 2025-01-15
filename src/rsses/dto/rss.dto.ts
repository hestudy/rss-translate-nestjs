import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RssDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
