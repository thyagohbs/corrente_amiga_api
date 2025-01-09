// import type { HttpContext } from '@adonisjs/core/http'

import auth from '@adonisjs/auth/services/main'
import Animal from '#models/animal'

export default class AnimalsController {
  async store({ request: any, auth }) {
    const dados = request.only([
      'nome',
      'especie',
      'raca',
      'porte',
      'sexo',
      'idade',
      'descricao',
      'foto',
      'latitude',
      'longitude',
    ])

    const animal = await Animal.create({
      ...dados,
      status: 'desaparecido',
      usuario_id: auth.user.id,
    })
    return animal
  }
}
