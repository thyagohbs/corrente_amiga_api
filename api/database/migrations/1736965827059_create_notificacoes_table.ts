import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notificacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('especie', 40)
      table.string('raca', 40)
      table.string('porte', 20)
      table.string('sexo', 10)
      table.integer('idade_minima')
      table.integer('idade_maxima')
      table.decimal('latitude', 9, 6)
      table.decimal('longitude', 9, 6)
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
