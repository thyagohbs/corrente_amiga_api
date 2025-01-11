import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Animal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare especie: string

  @column()
  declare raca: string

  @column()
  declare porte: string

  @column()
  declare sexo: string

  @column()
  declare idade: number

  @column()
  declare descricao: string

  @column()
  declare foto: string

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  @column()
  declare status: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
