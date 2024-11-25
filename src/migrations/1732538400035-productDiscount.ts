import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductDiscount1732538400035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE Products ADD COLUMN discounted_price DECIMAL(10, 2) NOT NULL DEFAULT 0, ADD COLUMN discounted_percentage DECIMAL(5, 2) NOT NULL DEFAULT 0")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("Products",["discounted_price","discounted_percentage"]);
    }
}
