import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class ForeignKeyUsersAppointments1606068102939
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'fkey_appointments_provider_id_users_id',
        columnNames: ['provider_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments',
      'fkey_appointments_provider_id_users_id'
    );
  }
}
