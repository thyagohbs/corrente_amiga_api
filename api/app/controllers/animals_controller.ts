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

  async getById({ response, params }: HttpContext) {
    const animal = await Animal.findOrFail(params.id)

    if (!animal) {
      return response.status(404).json({
        success: false,
        message: 'Animal não encontrado!',
      })
    }

    return response.status(200).json({
      success: true,
      message: 'Animal criado com sucesso!',
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

  async delete({ response, params }: HttpContext) {
    const animal = await Animal.findOrFail(params.id)

    await animal.delete()

    return response.status(200).json({
      success: true,
      message: 'Animal deletado com sucesso!',
    })
  }
}
