import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { RssTranslate } from '../../../../domain/rss-translate';
import { RssTranslateRepository } from '../../rss-translate.repository';
import { RssTranslateEntity } from '../entities/rss-translate.entity';
import { RssTranslateMapper } from '../mappers/rss-translate.mapper';

@Injectable()
export class RssTranslateRelationalRepository
  implements RssTranslateRepository
{
  constructor(
    @InjectRepository(RssTranslateEntity)
    private readonly rssTranslateRepository: Repository<RssTranslateEntity>,
  ) {}

  async create(data: RssTranslate): Promise<RssTranslate> {
    const persistenceModel = RssTranslateMapper.toPersistence(data);
    const newEntity = await this.rssTranslateRepository.save(
      this.rssTranslateRepository.create(persistenceModel),
    );
    return RssTranslateMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssTranslate[]> {
    const entities = await this.rssTranslateRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => RssTranslateMapper.toDomain(entity));
  }

  async findById(id: RssTranslate['id']): Promise<NullableType<RssTranslate>> {
    const entity = await this.rssTranslateRepository.findOne({
      where: { id },
    });

    return entity ? RssTranslateMapper.toDomain(entity) : null;
  }

  async findByIds(ids: RssTranslate['id'][]): Promise<RssTranslate[]> {
    const entities = await this.rssTranslateRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RssTranslateMapper.toDomain(entity));
  }

  async update(
    id: RssTranslate['id'],
    payload: Partial<RssTranslate>,
  ): Promise<RssTranslate> {
    const entity = await this.rssTranslateRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rssTranslateRepository.save(
      this.rssTranslateRepository.create(
        RssTranslateMapper.toPersistence({
          ...RssTranslateMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RssTranslateMapper.toDomain(updatedEntity);
  }

  async remove(id: RssTranslate['id']): Promise<void> {
    await this.rssTranslateRepository.delete(id);
  }

  async hasLink(link: string): Promise<boolean> {
    const count = await this.rssTranslateRepository.count({
      where: {
        link,
      },
    });

    return count > 0;
  }
}
