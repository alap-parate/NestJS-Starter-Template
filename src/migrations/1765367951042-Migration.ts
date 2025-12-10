import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765367951042 implements MigrationInterface {
    name = 'Migration1765367951042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`demo\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`demo\` DROP COLUMN \`description\``);
    }

}
