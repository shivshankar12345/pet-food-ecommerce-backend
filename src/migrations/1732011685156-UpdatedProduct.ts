import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedProduct1732011685156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER table Products add foreign key (seller_id) references User(id)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
