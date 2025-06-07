import type { MigrationInterface, QueryRunner } from "typeorm";

export class DepartmentsAndRooms1749333456546 implements MigrationInterface {
    name = 'DepartmentsAndRooms1749333456546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`department_code\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`room\` (\`id\` int NOT NULL AUTO_INCREMENT, \`room_code\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`department_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`room\` ADD CONSTRAINT \`FK_c85e9fbd4b6112f029c1e9f363d\` FOREIGN KEY (\`department_id\`) REFERENCES \`department\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room\` DROP FOREIGN KEY \`FK_c85e9fbd4b6112f029c1e9f363d\``);
        await queryRunner.query(`DROP TABLE \`room\``);
        await queryRunner.query(`DROP TABLE \`department\``);
    }
}
