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

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        router.get('/animais', [AnimalController, 'index'])
        router.post('/animais', [AnimalController, 'create'])
        router.get('/animais/:id', [AnimalController, 'getById'])
        router.get('/animais/status/:status', [AnimalController, 'getAnimalsByStatus'])
        router.get('/animais/filtrar/:campo/:valor', [AnimalController, 'getAnimalsByFilter'])        
        router.put('/animais/:id', [AnimalController, 'update'])
        router.delete('/animais/:id', [AnimalController, 'delete'])
      })
      .use(middleware.auth())
  })
  .prefix('api')
