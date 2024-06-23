import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1719117136697 implements MigrationInterface {
    name = 'Migration1719117136697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
    }

}
