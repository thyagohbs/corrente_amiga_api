import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './usuario.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Notificacao extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare especie: string

  @column()
  declare raca: string

  @column()
  declare porte: string

  @column()
  declare sexo: string

  @column()
  declare idade_minima: number

  @column()
  declare idade_maxima: number

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
