'use strict'
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import User from 'App/Models/auth'
 import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
   public async index ({ response }) {
   
    const newUser= await Database.query().from('auths as u')
    .innerJoin('roles as r', 'r.id', 'u.rolid').select("u.id","u.username","u.email","r.rol as Rol","u.created_at").where('u.status', 1)
   //CHECAR LO QUE GUARDA Y CAMBIAR EN LA TABLA DE ROLES DE NOMBRE A ROL COMO EN EN EL SERGICIO DE ROL EN METODO DE GETROL ABAJO
     
        return response.json({
          status: true,
          mensaje: "Se obtuvieron los Usuarios",
          data: newUser
        })
        }
        public async show ({ response, params }) {
          const newUser= await Database.query().from('auths as u')
    .innerJoin('roles as r', 'r.id', 'u.rolid').select("u.id","u.username","u.email","u.password","r.rol as Rol","u.status","u.created_at").where({"u.id": params.id}).first()
          return response.json({
            status: true,
            mensaje: "Se obtuvo el registro",
            data: newUser
          })
    
        }
    
     public async store({request,response,ctx:HttpContextContract}){
        const userData=request.only(['username','email','password','rolid'])
        const user= await User.create(userData)
        const query = Database.table('auths')
         const newUser= await Database.query().from('auths as u')
         .innerJoin('roles as r', 'r.id', 'u.rolid').select("u.id","u.username", "u.email","r.rol").where("u.id", user.id)
        //CHECAR LO QUE GUARDA Y CAMBIAR EN LA TABLA DE ROLES DE NOMBRE A ROL COMO EN EN EL SERGICIO DE ROL EN METODO DE GETROL ABAJO
            return response.created({
             status:true,
             mensaje:"SE REGISTRO EL USUARIO CORRECTAMENTE",
             data:newUser     
            })
        }
      public async update({request,response,params}){
          // const newUser= await User.find(params.id)
          const newUser = await User.findOrFail(params.id)
          newUser.username =request.input('username')
          newUser.email = request.input('email')
          newUser.password = request.input('password')
          newUser.rolid = request.input('rolid')
          newUser.status = request.input('status')
          await newUser.save()
      
          return response.json({
            status: true,
            mensaje: "Se Cambio la Configuracion del Usuario",
            data: newUser
          })
      
        } 
       
        public async destroy ({ response,params }) {
          const newUser = await User.findOrFail(params.id)
          await newUser.delete()
          return response.json({
          status: true,
          mensaje: "Se elimino el Usuario",
          data:newUser
         })
          }

     
    }
