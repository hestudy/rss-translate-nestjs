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
import { RssesService } from './rsses.service';
import { CreateRssDto } from './dto/create-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Rss } from './domain/rss';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllRssesDto } from './dto/find-all-rsses.dto';

@ApiTags('Rsses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'rsses',
  version: '1',
})
export class RssesController {
  constructor(private readonly rssesService: RssesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Rss,
  })
  create(@Body() createRssDto: CreateRssDto) {
    return this.rssesService.create(createRssDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Rss),
  })
  async findAll(
    @Query() query: FindAllRssesDto,
  ): Promise<InfinityPaginationResponseDto<Rss>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.rssesService.findAllWithPagination({
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
    type: Rss,
  })
  findById(@Param('id') id: string) {
    return this.rssesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Rss,
  })
  update(@Param('id') id: string, @Body() updateRssDto: UpdateRssDto) {
    return this.rssesService.update(id, updateRssDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.rssesService.remove(id);
  }
}
