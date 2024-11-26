import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";

export class Address1732613632532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`create table address(id varchar(36) primary key, user_id varchar(36) not null,house_num varchar(255) default "0",street varchar(255) not null, pincode varchar(6) not null, city varchar(255) not null, state varchar(255) not null, name varchar(255) not null, phone_num varchar(10) not null, Foreign Key (user_id) References User(id))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address")
    }

}
