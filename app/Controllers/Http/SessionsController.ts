import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Sala from 'App/Models/Sala'
import UserCreateValidator from 'App/Validators/UserCreateValidator'

export default class SessionsController {
  public async create({ view }: HttpContextContract) {
    return view.render('index')
  }

  public async store({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const salas = await Sala.all()

    try {
      await auth.use('web').attempt(email, password)
      return response.redirect().toRoute('index', { salas : salas })
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
