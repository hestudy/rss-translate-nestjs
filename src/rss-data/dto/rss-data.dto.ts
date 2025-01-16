import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RssDataDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
