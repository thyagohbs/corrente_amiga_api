import Notificacao from '#models/notificacao'
import User from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotificacaosController {
  async index({}: HttpContext) {}

  async create({ request, response }: HttpContext) {
    const userId = response.ctx!.auth.user!.id

    const dados = request.only(['especie', 'raca', 'porte', 'sexo', 'idade_minima', 'idade_maxima'])

    const user = await User.find(userId)

    if (!user) {
      return response.status(404).json({ success: false, message: 'Usuário não encontrado!' })
    }

    const notificacao = await Notificacao.create({ userId, ...dados })

    return response.status(201).json({ success: true, data: notificacao })
  }

  async store({ request }: HttpContext) {}

  async show({ params }: HttpContext) {}

  async edit({ params }: HttpContext) {}

  async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
