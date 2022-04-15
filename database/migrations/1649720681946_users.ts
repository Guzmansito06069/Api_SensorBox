import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      // table.string('remember_me_token').nullable()
      // table.integer('rolid').unsigned().references('id').inTable('roles').onDelete('CASCADE').defaultTo(2)
      // table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
