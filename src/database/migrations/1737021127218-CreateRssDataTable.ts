import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRssDataTable1737021127218 implements MigrationInterface {
    name = 'CreateRssDataTable1737021127218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rss_data" ADD "link" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rss_data" DROP COLUMN "link"`);
    }

}
