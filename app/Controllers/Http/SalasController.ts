import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from 'App/Models/Sala'
import Database from '@ioc:Adonis/Lucid/Database'


export default class SalasController {
  public async index({}: HttpContextContract) {}

  public async create({view}: HttpContextContract) {
    return view.render('salas/create')
  }

  public async store({request, response}: HttpContextContract) {
    const id = request.input('id')
    const capacidade = request.input('cap')
    var projetor = request.input('projetor')
    var condicionado = request.input('condicionado')
  
    if(projetor == 'on'){
      projetor = 'true'
    }else{
      projetor = 'false'
    }
    if(condicionado == 'on'){
      condicionado = 'true'
    }else{
      condicionado = 'false'
    }
    
    try {
      await Sala.create({ id: id, capacidade: capacidade, projetor: projetor, condicionado: condicionado })
      return response.redirect().toRoute('sala.show')
    } catch (e) {
      console.log(e)
      return response.redirect().toRoute('sala.show')
    }
  }

  public async show({view, auth }: HttpContextContract) {
    const sala = await Sala.all()
    var authaux = auth.user?.email
    
    const user = await Database.rawQuery('select admin from users where email = ? and admin = 1',[authaux? authaux : ''])

    var admin = 0

    for (const usery in user) {
      if(usery == '0'){
        admin = 1
      }
    }
    

    return view.render('salas/show', { salas : sala, admin: admin})
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}