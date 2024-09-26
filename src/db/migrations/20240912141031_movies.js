exports.up = function (knex) {
  return knex.schema.createTable("movies", function (table) {
    table.increments("movie_id"); // Primary Key
    table.string("title").notNullable(); // Movie title
    table.integer("runtime_in_minutes").notNullable(); // Movie runtime
    table.string("rating").notNullable(); // Movie rating
    table.text("description"); // Movie description
    table.string("image_url"); // URL for the movie's poster
    table.timestamps(true, true); // created_at and updated_at fields
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};
