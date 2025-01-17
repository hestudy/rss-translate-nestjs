import { RssData } from '../rss-data/domain/rss-data';
import { RssDataService } from '../rss-data/rss-data.service';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { RssTranslate } from './domain/rss-translate';
import { CreateRssTranslateDto } from './dto/create-rss-translate.dto';
import { UpdateRssTranslateDto } from './dto/update-rss-translate.dto';
import { RssTranslateRepository } from './infrastructure/persistence/rss-translate.repository';

@Injectable()
export class RssTranslatesService {
  constructor(
    private readonly rssDataService: RssDataService,

    // Dependencies here
    private readonly rssTranslateRepository: RssTranslateRepository,
    @InjectQueue('rssTranslate') private rssTranslateQueue: Queue,
  ) {}

  async create(createRssTranslateDto: CreateRssTranslateDto) {
    // Do not remove comment below.
    // <creating-property />

    const rssDataObject = await this.rssDataService.findById(
      createRssTranslateDto.rssData.id,
    );
    if (!rssDataObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          rssData: 'notExists',
        },
      });
    }
    const rssData = rssDataObject;

    return this.rssTranslateRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      link: createRssTranslateDto.link,

      rssData,

      content: createRssTranslateDto.content,

      title: createRssTranslateDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rssTranslateRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: RssTranslate['id']) {
    return this.rssTranslateRepository.findById(id);
  }

  findByIds(ids: RssTranslate['id'][]) {
    return this.rssTranslateRepository.findByIds(ids);
  }

  async update(
    id: RssTranslate['id'],

    updateRssTranslateDto: UpdateRssTranslateDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let rssData: RssData | undefined = undefined;

    if (updateRssTranslateDto.rssData) {
      const rssDataObject = await this.rssDataService.findById(
        updateRssTranslateDto.rssData.id,
      );
      if (!rssDataObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            rssData: 'notExists',
          },
        });
      }
      rssData = rssDataObject;
    }

    return this.rssTranslateRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      link: updateRssTranslateDto.link,

      rssData,

      content: updateRssTranslateDto.content,

      title: updateRssTranslateDto.title,
    });
  }

  remove(id: RssTranslate['id']) {
    return this.rssTranslateRepository.remove(id);
  }

  async testQueue() {
    const result = await this.rssDataService.findAllWithPagination({
      paginationOptions: {
        limit: 10,
        page: 1,
      },
    });
    await this.rssTranslateQueue.add('rssTranslate', result.at(0), {
      jobId: result.at(0)?.id,
      removeOnComplete: true,
      removeOnFail: true,
    });
    return {
      success: true,
    };
  }

  hasLink(link: string) {
    return this.rssTranslateRepository.hasLink(link);
  }
}
