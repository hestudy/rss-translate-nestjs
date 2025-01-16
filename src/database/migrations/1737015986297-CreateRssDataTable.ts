import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRssDataTable1737015986297 implements MigrationInterface {
  name = 'CreateRssDataTable1737015986297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rss_data" ("data" json NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rssIdId" uuid NOT NULL, CONSTRAINT "PK_41814b746c4cc029bd9a0eceacd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rss_data" ADD CONSTRAINT "FK_6fe2acb2181ae7bc65f942c6143" FOREIGN KEY ("rssIdId") REFERENCES "rss"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rss_data" DROP CONSTRAINT "FK_6fe2acb2181ae7bc65f942c6143"`,
    );
    await queryRunner.query(`DROP TABLE "rss_data"`);
  }
}
