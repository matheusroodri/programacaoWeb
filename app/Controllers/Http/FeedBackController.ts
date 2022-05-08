import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feedback from 'App/Models/Feedback'
import Database from '@ioc:Adonis/Lucid/Database'

export default class FeedBackController {

  public async index({ view, auth }: HttpContextContract) {
    const feedbacks = await Feedback.all()
    var authaux = auth.user?.email
    
    const user = await Database.rawQuery('select admin from users where email = ? and admin = 1',[authaux? authaux : ''])

    var admin = 0

    for (const usery in user) {
      if(usery == '0'){
        admin = 1
      }
    }

    return view.render('salas/index', { feedbacks: feedbacks, admin: admin })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('layouts/feedback-user')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['sala', 'descricao'])

    await Feedback.create(data)

    return response.redirect().toRoute('sala.show')
  }

  public async show({ params, view}: HttpContextContract) {
    const reserva = await Feedback.find(params.id)

    return view.render('reservas/show', { reserva: reserva })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
