import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feedback from 'App/Models/Feedback'

export default class FeedBackController {

  public async index({ view }: HttpContextContract) {
    const reservas = await Feedback.all()

    return view.render('reservas/index', { reservas: reservas })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('layouts/feedback-user')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['sala', 'descricao'])

    await Feedback.create(data)

    return response.redirect().toRoute('index')
  }

  public async show({ params, view }: HttpContextContract) {
    const reserva = await Feedback.find(params.id)

    return view.render('reservas/show', { reserva: reserva })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
