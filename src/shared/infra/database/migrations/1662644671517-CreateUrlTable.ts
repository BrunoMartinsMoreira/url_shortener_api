import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUrlTable1662644671517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'urls',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'original_url',
            type: 'varchar',
          },
          {
            name: 'hash',
            type: 'varchar',
          },
          {
            name: 'clicks',
            type: 'numeric',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'last_click_date',
            type: 'timestamp',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUrlUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('urls');
  }
}
