import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salas extends BaseSchema {
  protected tableName = 'feedbacks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('sala').notNullable()
      table.string('descricao').notNullable()

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
