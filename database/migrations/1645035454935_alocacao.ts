import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokens extends BaseSchema {
  protected tableName = 'alocacao'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('tipo').notNullable()
      table.timestamp('dataHora', { useTz: true })
      table.string('responsavel_alocacao').notNullable()
      table.integer('qtd_alunos').notNullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('expires_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
