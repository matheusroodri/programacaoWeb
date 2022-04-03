import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Salas extends BaseSchema {
  protected tableName = 'reservas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id_sala')
      table.string('tipo').notNullable()
      table.integer('qtd_pessoas').notNullable()
      table.string('motivacao').notNullable()
      table.timestamp('dataHora', { useTz: true })

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
