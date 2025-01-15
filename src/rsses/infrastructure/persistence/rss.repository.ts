import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Rss } from '../../domain/rss';

export abstract class RssRepository {
  abstract create(
    data: Omit<Rss, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Rss>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Rss[]>;

  abstract findById(id: Rss['id']): Promise<NullableType<Rss>>;

  abstract findByIds(ids: Rss['id'][]): Promise<Rss[]>;

  abstract update(
    id: Rss['id'],
    payload: DeepPartial<Rss>,
  ): Promise<Rss | null>;

  abstract remove(id: Rss['id']): Promise<void>;
}
