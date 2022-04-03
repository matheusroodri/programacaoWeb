import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserva from 'App/Models/Reserva'

export default class ReservasController {
  public async index({ view }: HttpContextContract) {
    const reservas = await Reserva.all()

    return view.render('reservas/index', { reservas: reservas })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('reservas.create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['id', 'tipo', 'qtd_pessoas'])

    const reserva = await Reserva.create(data)

    return response.redirect().toRoute('reservas.show', { id: reserva.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const reserva = await Reserva.find(params.id)

    return view.render('reservas/show', { reserva: reserva })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
