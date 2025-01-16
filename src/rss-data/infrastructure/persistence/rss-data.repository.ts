import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RssData } from '../../domain/rss-data';

export abstract class RssDataRepository {
  abstract create(
    data: Omit<RssData, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RssData>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssData[]>;

  abstract findById(id: RssData['id']): Promise<NullableType<RssData>>;

  abstract findByIds(ids: RssData['id'][]): Promise<RssData[]>;

  abstract update(
    id: RssData['id'],
    payload: DeepPartial<RssData>,
  ): Promise<RssData | null>;

  abstract remove(id: RssData['id']): Promise<void>;

  abstract hasRssData(link: string): Promise<boolean>;
}
