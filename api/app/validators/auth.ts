import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(6),
    email: vine.string().email(),
    senha: vine.string().minLength(6),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    senha: vine.string().minLength(6),
  })
)
