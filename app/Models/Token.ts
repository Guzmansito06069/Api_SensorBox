import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Token extends BaseModel {
  public static table ='tokens'
  @column({ isPrimary: true })
  public id: number
  @column()
  public user_id:number
  @column()
  public token:string
  @column()
  public type:string
  @column()
  public is_revoked:boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
