exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
      table.increments('review_id'); // Primary Key
      table.text('content').notNullable(); // Review content in markdown
      table.integer('score').notNullable(); // Numerical score given by critic
      table
        .integer('critic_id')
        .unsigned()
        .notNullable()
        .references('critic_id')
        .inTable('critics')
        .onDelete('CASCADE'); // Foreign Key referencing critics
      table
        .integer('movie_id')
        .unsigned()
        .notNullable()
        .references('movie_id')
        .inTable('movies')
        .onDelete('CASCADE'); // Foreign Key referencing movies
      table.timestamps(true, true); // created_at and updated_at fields
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
  };