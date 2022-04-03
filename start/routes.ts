/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('index')
}).as('index')

Route.get('/salas/:id', 'SalasController.show')

// Rotas dos Reservas
Route.get('/reservas/create', 'ReservasController.create').as('reservas.create')
Route.get('/reservas/:id', 'ReservasController.show')
  .where('id', /^[0-9]$/)
  .as('reservas.show')
Route.get('/reservas', 'ReservasController.index').middleware('auth:web').as('reservas.index')
Route.post('/reservas', 'ReservasController.store').middleware('auth:web').as('reservas.store')


Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.post('/login/backoffice', 'SessionsController.store').as('sessions.store.backoffice')
Route.get('/logout',async ({ view }) => {
  return view.render('index')
}).as('sessions.destroy')

Route.get('/users/create', 'UsersController.create').as('users.create')
Route.post('/users/', 'UsersController.store').as('users.store')
