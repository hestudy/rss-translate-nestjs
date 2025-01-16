import { Injectable } from '@nestjs/common';
import { CreateRssDataDto } from './dto/create-rss-data.dto';
import { UpdateRssDataDto } from './dto/update-rss-data.dto';
import { RssDataRepository } from './infrastructure/persistence/rss-data.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RssData } from './domain/rss-data';

@Injectable()
export class RssDataService {
  constructor(
    // Dependencies here
    private readonly rssDataRepository: RssDataRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createRssDataDto: CreateRssDataDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.rssDataRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rssDataRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: RssData['id']) {
    return this.rssDataRepository.findById(id);
  }

  findByIds(ids: RssData['id'][]) {
    return this.rssDataRepository.findByIds(ids);
  }

  async update(
    id: RssData['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateRssDataDto: UpdateRssDataDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.rssDataRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: RssData['id']) {
    return this.rssDataRepository.remove(id);
  }
}
