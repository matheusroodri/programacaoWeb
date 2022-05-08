import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Sala from 'App/Models/Sala'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import databaseConfig from 'Config/database'

export default class SessionsController {
  public async create({ view }: HttpContextContract) {
    return view.render('index')
  }

  public async store({ request, auth, response, session, view}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const salas = await Sala.all()
    
    try {
     const user = await Database.rawQuery('select admin from users where email = ? and admin = 1',[email])
     var admin = 0

      for (const usery in user) {
        if(usery == '0'){
          admin = 1
        }
      }
      await auth.use('web').attempt(email, password)   
      return view.render('layouts/main', { salas : salas, admin: admin})
    } catch (e) {
      console.log(e)
      session.flashExcept(['login'])
      session.flash({ errors: { login: 'Não encontramos nenhuma conta com essas credenciais.' } })

      return response.redirect().toRoute('sessions.create')
    }
  }


  public async destroy({ response, auth }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('/login')
  }
}