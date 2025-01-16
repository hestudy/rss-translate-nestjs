import { RssesService } from '../rsses/rsses.service';
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateRssDataDto } from './dto/create-rss-data.dto';
import { UpdateRssDataDto } from './dto/update-rss-data.dto';
import { RssDataRepository } from './infrastructure/persistence/rss-data.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RssData } from './domain/rss-data';
import { Rss } from '../rsses/domain/rss';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class RssDataService {
  constructor(
    private readonly rssService: RssesService,

    // Dependencies here
    private readonly rssDataRepository: RssDataRepository,
    @InjectQueue('rssData') private rssDataQueue: Queue,
  ) {}

  async create(createRssDataDto: CreateRssDataDto) {
    // Do not remove comment below.
    // <creating-property />

    const rss_idObject = await this.rssService.findById(
      createRssDataDto.rss_id.id,
    );
    if (!rss_idObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          rss_id: 'notExists',
        },
      });
    }
    const rss_id = rss_idObject;

    return this.rssDataRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      link: createRssDataDto.link,

      rss: rss_id,

      data: createRssDataDto.data,
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

    updateRssDataDto: UpdateRssDataDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let rss_id: Rss | undefined = undefined;

    if (updateRssDataDto.rss_id) {
      const rss_idObject = await this.rssService.findById(
        updateRssDataDto.rss_id.id,
      );
      if (!rss_idObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            rss_id: 'notExists',
          },
        });
      }
      rss_id = rss_idObject;
    }

    return this.rssDataRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      link: updateRssDataDto.link,

      rss: rss_id,

      data: updateRssDataDto.data,
    });
  }

  remove(id: RssData['id']) {
    return this.rssDataRepository.remove(id);
  }

  hasRssData(link: string) {
    return this.rssDataRepository.hasRssData(link);
  }

  async testQueue() {
    const result = await this.rssService.findAllWithPagination({
      paginationOptions: {
        limit: 10,
        page: 1,
      },
    });

    await this.rssDataQueue.add('rssData', result.at(0), {
      jobId: result.at(0)?.id,
      removeOnComplete: true,
      removeOnFail: true,
    });

    return {
      success: true,
    };
  }
}
