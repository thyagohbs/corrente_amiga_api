import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'animals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome', 80).notNullable()
      table.string('especie', 40).notNullable()
      table.string('raca', 40)
      table.string('porte', 20)
      table.string('sexo', 10)
      table.integer('idade')
      table.text('descricao')
      table.string('foto')
      table.string('status', 20).notNullable().defaultTo('disponivel')
      table.decimal('latitude', 9, 6)
      table.decimal('longitude', 9, 6)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
