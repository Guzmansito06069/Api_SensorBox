import { DateTime } from 'luxon'
import { BaseModel, column,hasMany,
  HasMany } from '@ioc:Adonis/Lucid/Orm'
// Importo el Modelo
export default class User extends BaseModel {
public static table='users'
  @column({ isPrimary: true })
  public id: number
  //creo la colomnas que me faltan
  @column ()
  public email:string

  @column()
  public password:string
  @column()
  public rolid:number
  @column()
  public rememberMeToken?: string
  //agrega la relaciones que tiene
  
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
