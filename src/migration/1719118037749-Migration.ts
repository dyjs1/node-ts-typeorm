import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719118037749 implements MigrationInterface {
    name = 'Migration1719118037749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
    }

}
