import Animal from '#models/animal'
import User from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'
import { createAnimalValidator, updateAnimalValidator } from '#validators/animal'

export default class AnimalsController {
  async index({ response }: HttpContext) {
    const usuarioAtual = response.ctx!.auth.user!

    // pega todos os animais do usuário atual
    const animais = await usuarioAtual!.related('animals').query()

    return response.status(200).json({
      success: true,
      data: animais,
    })
  }

  async create({ request, response }: HttpContext) {
    await request.validateUsing(createAnimalValidator)

    const userId = response.ctx!.auth.user!.id

    const { nome, especie } = request.only(['nome', 'especie'])

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ success: false, message: 'Usuário não encontrado!' })
    }

    const animal = await Animal.create({ userId, nome, especie })

    return response.status(201).json({ success: true, data: animal })
  }

  async filter({ response, params }: HttpContext) {
    const { campo, valor } = params

    var animais = null

    switch (campo) {
      case 'especie':
        animais = await Animal.query().where('especie', 'like', `%${valor.toLowerCase()}%`)
        break

      case 'raca':
        animais = await Animal.query().where('raca', 'like', `%${valor.toLowerCase()}%`)
        break

      case 'porte':
        animais = await Animal.query().where('porte', 'like', `%${valor.toLowerCase()}%`)
        break

      case 'sexo':
        animais = await Animal.query().where('sexo', 'like', `%${valor.toLowerCase()}%`)
        break

      default:
        animais = await Animal.query().where('status', 'disponivel')
    }

    if (!animais.length) {
      return response.status(404).json({
        success: false,
        message: 'Animais não encontrados!',
      })
    }

    return response.status(200).json({
      success: true,
      data: animais,
    })
  }

  async edit({ response, params }: HttpContext) {
    const animal = await Animal.findOrFail(params.id)

    if (!animal) {
      return response.status(404).json({
        success: false,
        message: 'Animal não encontrado!',
      })
    }

    return response.status(200).json({
      success: true,
      data: animal,
    })
  }

  async update({ request, response, params }: HttpContext) {
    await request.validateUsing(updateAnimalValidator)

    const { nome, especie } = request.only(['nome', 'especie'])
    const userId = request.input('userId')

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({
        success: false,
        message: 'Usuário não encontrado!',
      })
    }

    const animal = await Animal.find(params.id)

    if (!animal) {
      return response.status(404).json({
        success: false,
        message: 'Animal não encontrado!',
      })
    }

    animal.nome = nome
    animal.especie = especie
    animal.userId = userId

    await animal.save()

    response.status(200).json({
      success: true,
      data: animal,
    })
  }

  async destroy({ response, params }: HttpContext) {
    const animal = await Animal.findOrFail(params.id)

    await animal.delete()

    return response.status(200).json({
      success: true,
      message: 'Animal deletado com sucesso!',
    })
  }
}
