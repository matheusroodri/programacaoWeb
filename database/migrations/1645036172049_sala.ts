import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reservas extends BaseSchema {
  protected tableName = 'salas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('capacidade').notNullable()
      table.boolean('projetor').notNullable()
      table.boolean('condicionado').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
