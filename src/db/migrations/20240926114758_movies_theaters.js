exports.up = function(knex) {
    return knex.schema.createTable('movies_theaters', function(table) {
      table.integer('movie_id').unsigned().notNullable();
      table
        .foreign('movie_id')
        .references('movie_id')
        .inTable('movies')
        .onDelete('CASCADE'); // Foreign key referencing movies
  
      table.integer('theater_id').unsigned().notNullable();
      table
        .foreign('theater_id')
        .references('theater_id')
        .inTable('theaters')
        .onDelete('CASCADE'); // Foreign key referencing theaters
  
      table.boolean('is_showing').notNullable().defaultTo(false); // Whether the movie is currently showing
  
      table.primary(['movie_id', 'theater_id']); // Composite primary key
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('movies_theaters');
  };