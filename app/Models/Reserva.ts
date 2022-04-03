import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reserva extends BaseModel {

  @column()
  public id: number

  @column()
  public tipo: string

  @column()
  public qtd_pessoas: number

  @column()
  public motivacao: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public dataHora: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
