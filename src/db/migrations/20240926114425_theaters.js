
exports.up = function(knex) {
    return knex.schema.createTable('theaters', function(table) {
      table.increments('theater_id'); // Primary Key
      table.string('name').notNullable(); // Theater name
      table.string('address_line_1').notNullable(); // First address line
      table.string('address_line_2'); // Second address line (optional)
      table.string('city').notNullable(); // City
      table.string('state').notNullable(); // State
      table.string('zip').notNullable(); // Zip code
      table.timestamps(true, true); // created_at and updated_at fields
    });
};
  
exports.down = function(knex) {
    return knex.schema.dropTable('theaters');
  };