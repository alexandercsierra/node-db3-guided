exports.up = function(knex) {
  return knex.schema
  //users table
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('username', 128)
        .unique()
        .notNullable();
    })
    //posts table
    .createTable('posts', tbl => {
      tbl.increments();
      tbl.text('contents');
      
      //foreign key
      tbl.integer('user_id') //the foreign key must be the same type as the primary key it references
        .unsigned() //always include .unsigned() when referencing an integer primary key
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE') // what happens if the value of the primary key changes. To keep relationship the same, all will update.
        .onDelete('CASCADE'); // what happens if the primary key table row is deleted. Would delete all things in this table related to primary key.

        //for posts it may make sense to delete all posts if user is deleted
        //RESTRICT, DO NOTHING, SET NULL, CASCADE are possible values
        //RESTRICT is recommended for delete
        //Update cascade is ok
        //RESTRICT and CASCADE are most common
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
