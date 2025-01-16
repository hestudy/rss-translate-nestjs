import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RssTranslate } from '../../domain/rss-translate';

export abstract class RssTranslateRepository {
  abstract create(
    data: Omit<RssTranslate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<RssTranslate>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<RssTranslate[]>;

  abstract findById(
    id: RssTranslate['id'],
  ): Promise<NullableType<RssTranslate>>;

  abstract findByIds(ids: RssTranslate['id'][]): Promise<RssTranslate[]>;

  abstract update(
    id: RssTranslate['id'],
    payload: DeepPartial<RssTranslate>,
  ): Promise<RssTranslate | null>;

  abstract remove(id: RssTranslate['id']): Promise<void>;
}
