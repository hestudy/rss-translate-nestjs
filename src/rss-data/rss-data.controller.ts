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
import { RssDataService } from './rss-data.service';
import { CreateRssDataDto } from './dto/create-rss-data.dto';
import { UpdateRssDataDto } from './dto/update-rss-data.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RssData } from './domain/rss-data';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRssDataDto } from './dto/find-all-rss-data.dto';

@ApiTags('Rssdata')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rss-data',
  version: '1',
})
export class RssDataController {
  constructor(private readonly rssDataService: RssDataService) {}

  @Post()
  @ApiCreatedResponse({
    type: RssData,
  })
  create(@Body() createRssDataDto: CreateRssDataDto) {
    return this.rssDataService.create(createRssDataDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(RssData),
  })
  async findAll(
    @Query() query: FindAllRssDataDto,
  ): Promise<InfinityPaginationResponseDto<RssData>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rssDataService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('testQueue')
  testQueue() {
    return this.rssDataService.testQueue();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RssData,
  })
  findById(@Param('id') id: string) {
    return this.rssDataService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: RssData,
  })
  update(@Param('id') id: string, @Body() updateRssDataDto: UpdateRssDataDto) {
    return this.rssDataService.update(id, updateRssDataDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.rssDataService.remove(id);
  }
}
