import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumn1681150838702 implements MigrationInterface {
  name = 'AddNewColumn1681150838702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mig" ADD "lastName" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "mig" DROP COLUMN "lastName"`);
  }
}
