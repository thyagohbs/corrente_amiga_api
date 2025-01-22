/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AuthController = () => import('#controllers/auth_controller')
const AnimalController = () => import('#controllers/animals_controller')
const NotificacaoController = () => import('#controllers/notificacaos_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'Bem vindo a API - Corrente Amiga',
      }
    })

    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        router.get('/animais', [AnimalController, 'index']).as('animais.index')
        router.post('/animais/create', [AnimalController, 'create']).as('animais.create')
        router.get('/animais/:id/edit', [AnimalController, 'edit']).as('animais.edit')
        router.get('/animais/:campo/:valor', [AnimalController, 'filter']).as('animais.filter')
        router.put('/animais/:id', [AnimalController, 'update']).as('animais.update')
        router.delete('/animais/:id', [AnimalController, 'destroy']).as('animais.destroy')
      })
      .use(middleware.auth())

    router
      .group(() => {
        router
          .post('/notificacao/create', [NotificacaoController, 'create'])
          .as('notificacao.create')
      })
      .use(middleware.auth())
  })
  .prefix('/api')
