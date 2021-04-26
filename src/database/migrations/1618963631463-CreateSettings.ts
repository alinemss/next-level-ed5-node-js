//Mission Complete
//para criar a migration rodei no console o yarn typeform "migration:create"  (funcionalidade do typeorm) -n CreateSettings (Nome Definido por mim)

import {MigrationInterface, QueryRunner, Table} from "typeorm";
export class CreateSettings1618963631463 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ]
            })

        )

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");

    }

}
