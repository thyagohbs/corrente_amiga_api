import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    await request.validateUsing(registerValidator)

    const emailExiste = await User.findBy('email', request.input('email'))

    if (emailExiste) {
      return response.abort({ message: 'E-mail ja cadastrado!' })
    }

    const user = await User.create({
      nome: request.input('nome'),
      email: request.input('email'),
      senha: request.input('senha'),
    })

    const token = await User.accessTokens.create(user)

    response.status(201).json({
      success: true,
      token: token,
      data: user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, senha } = await request.validateUsing(loginValidator)

    const user = await User.findBy('email', email)

    if (!user || user === null) {
      return response.status(401).json({
        success: false,
        message: 'Usuário não encontrado!',
      })
    }

    const contaExiste = await hash.verify(user!.senha, senha)

    if (contaExiste) {
      const token = await User.accessTokens.create(user!)

      return response.status(200).json({
        success: true,
        token: token,
        data: user,
      })
    } else {
      return response.status(401).json({
        success: false,
        message: 'E-mail ou Senha incorreta!',
      })
    }
  }
}
