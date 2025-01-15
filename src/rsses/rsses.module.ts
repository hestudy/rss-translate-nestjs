import { Module } from '@nestjs/common';
import { RssesService } from './rsses.service';
import { RssesController } from './rsses.controller';
import { RelationalRssPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalRssPersistenceModule,
  ],
  controllers: [RssesController],
  providers: [RssesService],
  exports: [RssesService, RelationalRssPersistenceModule],
})
export class RssesModule {}
