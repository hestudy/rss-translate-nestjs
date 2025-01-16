import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRssDataTable1737016271710 implements MigrationInterface {
  name = 'CreateRssDataTable1737016271710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_data" DROP CONSTRAINT "FK_6fe2acb2181ae7bc65f942c6143"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_data" RENAME COLUMN "rssIdId" TO "rssId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_data" ADD CONSTRAINT "FK_7ca4683f0e935b861d563afc778" FOREIGN KEY ("rssId") REFERENCES "rss"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_data" DROP CONSTRAINT "FK_7ca4683f0e935b861d563afc778"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_data" RENAME COLUMN "rssId" TO "rssIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_data" ADD CONSTRAINT "FK_6fe2acb2181ae7bc65f942c6143" FOREIGN KEY ("rssIdId") REFERENCES "rss"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
