exports.up = function(knex) {
    return knex.schema.createTable('critics', function(table) {
      table.increments('critic_id'); // Primary Key
      table.string('preferred_name').notNullable(); // Critic's preferred first name
      table.string('surname').notNullable(); // Critic's last name
      table.string('organization_name').notNullable(); // Organization the critic works for
      table.timestamps(true, true); // created_at and updated_at fields
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('critics');
  };