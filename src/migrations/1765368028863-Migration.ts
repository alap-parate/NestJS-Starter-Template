import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765368028863 implements MigrationInterface {
    name = 'Migration1765368028863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`demo\` ADD \`deleted_at\` timestamp(6) NULL DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`demo\` DROP COLUMN \`deleted_at\``);
    }

}
