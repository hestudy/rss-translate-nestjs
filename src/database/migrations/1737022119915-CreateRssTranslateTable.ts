import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRssTranslateTable1737022119915 implements MigrationInterface {
    name = 'CreateRssTranslateTable1737022119915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rss_translate" ("content" character varying, "title" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rssDataId" uuid NOT NULL, CONSTRAINT "REL_99e8d453f3846c63b6c49500d8" UNIQUE ("rssDataId"), CONSTRAINT "PK_3868909b4b59d52eb8fdb5033d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rss_translate" ADD CONSTRAINT "FK_99e8d453f3846c63b6c49500d86" FOREIGN KEY ("rssDataId") REFERENCES "rss_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rss_translate" DROP CONSTRAINT "FK_99e8d453f3846c63b6c49500d86"`);
        await queryRunner.query(`DROP TABLE "rss_translate"`);
    }

}
