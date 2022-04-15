'use strict'
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User'
 import Database from '@ioc:Adonis/Lucid/Database'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
      const {email,password} = request.only(['email','password'])
      const user = await Database.query().from('auths as u').innerJoin('roles as r', 'r.id', 'u.rolid').select("u.id", "u.email","r.rol").where("u.email",email).first()
       
      const token = await (auth.use('api').generate(user))
      return response.json({
        access_token: token,
        user: user
      })  
    }
   

  public async logout({ auth, response }) {
    try
        {
            await auth.use('api').authenticate()
            await auth.use('api').revoke()
            return true
        }catch{
            return response.badRequest('No existe el usuario')
        }
  }

  public async tknvalidacion({ auth }) {
    try {
      await auth.use('api').authenticate()
      return true
    } catch {
      return false
    }
  }

  public async rolvalidacion({ auth, response }) {
    try {
      await auth.use('api').authenticate()
      const rol = auth.use('api').user.$attributes.rol
      if (rol == 1) {
        return true
      } else {
        return false
      }
    } catch {
      return response.badRequest('El usuario no tiene acceso')
    }
  }

  public async getUser({ auth }) {
    await auth.use('api').authenticate()
    const user = auth.use('api').user.$attributes
    return user
  }
      }