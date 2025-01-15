import { DateTime } from 'luxon'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import Animal from './animal.js'
import Notificacao from './notificacao.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'senha',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare telefone: string | null

  @hasMany(() => Notificacao)
  declare notificacao: HasMany<typeof Notificacao>

  @hasMany(() => Animal)
  declare animals: HasMany<typeof Animal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
