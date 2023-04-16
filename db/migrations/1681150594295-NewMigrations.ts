import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrations1681150594295 implements MigrationInterface {
  name = 'NewMigrations1681150594295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "mig" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, CONSTRAINT "PK_5c82cd64e88041dc118b23469bd" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mig"`);
  }
}
