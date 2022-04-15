import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Rol from 'App/Models/Rol'
export default class RolesController {
    public async index({ response }: HttpContextContract) {
      
          const rol1 = await Database.query().from('roles').select("id","rol")
          return response.json({
            status: true,
            mensaje: "Se obtuvieron los Roles",
            data: rol1
          })
        
      }
     public async show ({ response, params }) {
        const rol1 = await Rol.query().select("id","rol").where({id: params.id}).first()
        return response.json({
          status: true,
          mensaje: "Se obtuvieron las marcas",
          data: rol1
        })
        
        // return view.render('marcas.index', { marcas: marcas.toJSON() })
      }
    
      public async create({}: HttpContextContract) {
        
      }
    
      public async store({ request, response }: HttpContextContract) {
        const rol1 = new Rol()
        const rol = request.input('rol')
        try {
          rol1.rol = rol
          await rol1.save()
        //   return response.status(200)
          return response.created({
            status:true,
            mensaje:"Se Creo el Rol correctamente",
            data:rol1    
           })
        } catch {
          return response.badRequest('Fallo al crear')
        }
      }
    
     
    
      public async edit({}: HttpContextContract) {}
    
      public async update({ params, request, response }: HttpContextContract) {
        const rol = request.input('rol')
        try {
          const rol1 = await Rol.findOrFail(params.id)
          rol1.rol = rol
          await rol1.save()
          return response.json({
            status: true,
            mensaje: "Se Actualizo el Rol ",
            data: rol1
          })
        } catch {
          response.badRequest('Fallo al actualizar')
        }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        try {
          const rol1 = await Rol.findOrFail(params.id)
          await rol1.delete()
          return response.json({
            status: true,
            mensaje: "Se Borro el Rol ",
            data: rol1
          })
        } catch {
          response.badRequest('Error al borrar')
        }
      }
    }
