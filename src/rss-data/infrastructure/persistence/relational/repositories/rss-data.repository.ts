import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RssDataEntity } from '../entities/rss-data.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { RssData } from '../../../../domain/rss-data';
import { RssDataRepository } from '../../rss-data.repository';
import { RssDataMapper } from '../mappers/rss-data.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RssDataRelationalRepository implements RssDataRepository {
  constructor(
    @InjectRepository(RssDataEntity)
    private readonly rssDataRepository: Repository<RssDataEntity>,
  ) {}

  async create(data: RssData): Promise<RssData> {
    const persistenceModel = RssDataMapper.toPersistence(data);
    const newEntity = await this.rssDataRepository.save(
      this.rssDataRepository.create(persistenceModel),
    );
    return RssDataMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssData[]> {
    const entities = await this.rssDataRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => RssDataMapper.toDomain(entity));
  }

  async findById(id: RssData['id']): Promise<NullableType<RssData>> {
    const entity = await this.rssDataRepository.findOne({
      where: { id },
    });

    return entity ? RssDataMapper.toDomain(entity) : null;
  }

  async findByIds(ids: RssData['id'][]): Promise<RssData[]> {
    const entities = await this.rssDataRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RssDataMapper.toDomain(entity));
  }

  async update(id: RssData['id'], payload: Partial<RssData>): Promise<RssData> {
    const entity = await this.rssDataRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rssDataRepository.save(
      this.rssDataRepository.create(
        RssDataMapper.toPersistence({
          ...RssDataMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RssDataMapper.toDomain(updatedEntity);
  }

  async remove(id: RssData['id']): Promise<void> {
    await this.rssDataRepository.delete(id);
  }

  async hasRssData(link: string): Promise<boolean> {
    const result = await this.rssDataRepository.count({
      where: {
        link,
      },
    });
    return result > 0;
  }
}
