import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLinkInRssTranslate1737090889568 implements MigrationInterface {
  name = 'AddLinkInRssTranslate1737090889568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_translate" ADD "link" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rss_translate" DROP COLUMN "link"`);
  }
}
