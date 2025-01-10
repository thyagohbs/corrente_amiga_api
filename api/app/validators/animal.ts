import vine from '@vinejs/vine'

export const createAnimalValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(6),
    especie: vine.string().minLength(6),
  })
)

export const updateAnimalValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(6),
    especie: vine.string().minLength(6),
  })
)

export const idValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
  })
)
