import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumShorurlToUrlsTable1662682356614
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'urls',
      new TableColumn({
        name: 'short_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('urls', 'short_url');
  }
}
