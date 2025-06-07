import { ROLES } from "src/auth/auth.roles";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoles1749327101562 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const role of ROLES) {
            await queryRunner.query(
                `INSERT INTO role (id, name, roleKey, description) VALUES (?, ?, ?, ?)`,
                [role.id, role.name, role.roleKey, role.description],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const role of ROLES) {
            await queryRunner.query("DELETE FROM role WHERE id = ?", [role.id]);
        }
    }
}
