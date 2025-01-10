import Animal from '#models/animal'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { createAnimalValidator } from '#validators/animal'

export default class AnimalsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    await request.validateUsing(createAnimalValidator)

    const userId = response.ctx!.auth.user!.id

    const { nome, especie } = request.only(['nome', 'especie'])

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ success: false, message: 'Usuário não encontrado' })
    }

    const animal = await Animal.create({ userId, nome, especie })

    return response.status(201).json({ success: true, data: animal })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}
  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
