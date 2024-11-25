import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class IsFeatureInProduct1732096763061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("Products",new TableColumn({name : "IsFeatured", type:"boolean",default:false}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("Products","IsFeatured");
    }

}
