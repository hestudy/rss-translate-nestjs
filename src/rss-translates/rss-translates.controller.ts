import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RssTranslatesService } from './rss-translates.service';
import { CreateRssTranslateDto } from './dto/create-rss-translate.dto';
import { UpdateRssTranslateDto } from './dto/update-rss-translate.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RssTranslate } from './domain/rss-translate';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRssTranslatesDto } from './dto/find-all-rss-translates.dto';

@ApiTags('Rsstranslates')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rss-translates',
  version: '1',
})
export class RssTranslatesController {
  constructor(private readonly rssTranslatesService: RssTranslatesService) {}

  @Post()
  @ApiCreatedResponse({
    type: RssTranslate,
  })
  create(@Body() createRssTranslateDto: CreateRssTranslateDto) {
    return this.rssTranslatesService.create(createRssTranslateDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RssTranslate),
  })
  async findAll(
    @Query() query: FindAllRssTranslatesDto,
  ): Promise<InfinityPaginationResponseDto<RssTranslate>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rssTranslatesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RssTranslate,
  })
  findById(@Param('id') id: string) {
    return this.rssTranslatesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RssTranslate,
  })
  update(
    @Param('id') id: string,
    @Body() updateRssTranslateDto: UpdateRssTranslateDto,
  ) {
    return this.rssTranslatesService.update(id, updateRssTranslateDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.rssTranslatesService.remove(id);
  }
}
