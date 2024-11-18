import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class BankAccounts1731922915478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createTable(new Table({name:"bank_accounts",columns:[new TableColumn({name:"id",generationStrategy:"uuid",isPrimary:true,type:"varchar(36)"}),new TableColumn({name:"user",foreignKeyConstraintName:"User",type:"varchar(36)"}),new TableColumn()]}),)
        await queryRunner.query(`create table bank_account(id varchar(36) Primary Key, user varchar(36) not null,account_num varchar(256) unique not null, ifsc_code varchar(11) not null , bank_name varchar(256) not null,account_type enum("current","savings") not null, account_for 
enum("customer","seller","admin") not null, foreign key(user) references user(id))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bank_account");
    }

}
