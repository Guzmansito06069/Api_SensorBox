import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'


export default class auth extends BaseModel {
  public static table='auths'

  @column({ isPrimary: true })
  public id: number
  @column()
  public username: string
  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string
  @column()
  public rolid:number
  @column()
  public rememberMeToken?: string
  @column()
  public status: boolean
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (auth: auth) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }
}
