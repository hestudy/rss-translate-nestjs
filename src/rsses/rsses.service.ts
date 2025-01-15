import { Injectable } from '@nestjs/common';
import { CreateRssDto } from './dto/create-rss.dto';
import { UpdateRssDto } from './dto/update-rss.dto';
import { RssRepository } from './infrastructure/persistence/rss.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Rss } from './domain/rss';

@Injectable()
export class RssesService {
  constructor(
    // Dependencies here
    private readonly rssRepository: RssRepository,
  ) {}

  async create(createRssDto: CreateRssDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.rssRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      data: createRssDto.data,

      link: createRssDto.link,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rssRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Rss['id']) {
    return this.rssRepository.findById(id);
  }

  findByIds(ids: Rss['id'][]) {
    return this.rssRepository.findByIds(ids);
  }

  async update(
    id: Rss['id'],

    updateRssDto: UpdateRssDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.rssRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      data: updateRssDto.data,

      link: updateRssDto.link,
    });
  }

  remove(id: Rss['id']) {
    return this.rssRepository.remove(id);
  }
}
