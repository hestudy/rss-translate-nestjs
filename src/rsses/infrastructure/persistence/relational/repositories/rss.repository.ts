import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RssEntity } from '../entities/rss.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Rss } from '../../../../domain/rss';
import { RssRepository } from '../../rss.repository';
import { RssMapper } from '../mappers/rss.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RssRelationalRepository implements RssRepository {
  constructor(
    @InjectRepository(RssEntity)
    private readonly rssRepository: Repository<RssEntity>,
  ) {}

  async create(data: Rss): Promise<Rss> {
    const persistenceModel = RssMapper.toPersistence(data);
    const newEntity = await this.rssRepository.save(
      this.rssRepository.create(persistenceModel),
    );
    return RssMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Rss[]> {
    const entities = await this.rssRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => RssMapper.toDomain(entity));
  }

  async findById(id: Rss['id']): Promise<NullableType<Rss>> {
    const entity = await this.rssRepository.findOne({
      where: { id },
    });

    return entity ? RssMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Rss['id'][]): Promise<Rss[]> {
    const entities = await this.rssRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => RssMapper.toDomain(entity));
  }

  async update(id: Rss['id'], payload: Partial<Rss>): Promise<Rss> {
    const entity = await this.rssRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rssRepository.save(
      this.rssRepository.create(
        RssMapper.toPersistence({
          ...RssMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RssMapper.toDomain(updatedEntity);
  }

  async remove(id: Rss['id']): Promise<void> {
    await this.rssRepository.delete(id);
  }
}
