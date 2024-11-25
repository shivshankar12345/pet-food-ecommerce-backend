import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class Cart1732172394207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name:"cart",columns:[new TableColumn({isPrimary:true,name:"id",generationStrategy:"uuid",type:"varchar"}), new TableColumn({name:"qty", type:"int", isNullable:false}),new TableColumn({name:"product_id",type:"varchar(36)",isNullable:false}), new TableColumn({name:"user_id",type:"varchar(36)", isNullable:false})],foreignKeys:[{referencedTableName:"User",referencedColumnNames:["id"],columnNames:["user_id"]},{referencedColumnNames:["id"],referencedTableName:"Products",columnNames:["product_id"]}]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cart");
    }

}
