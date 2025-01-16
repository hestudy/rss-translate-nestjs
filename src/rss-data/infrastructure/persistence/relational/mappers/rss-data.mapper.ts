import { RssData } from '../../../../domain/rss-data';
import { RssDataEntity } from '../entities/rss-data.entity';

export class RssDataMapper {
  static toDomain(raw: RssDataEntity): RssData {
    const domainEntity = new RssData();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: RssData): RssDataEntity {
    const persistenceEntity = new RssDataEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
