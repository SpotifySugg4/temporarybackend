exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments();
      users.string("name").notNullable();
      users.string("email").notNullable().unique();
      users.string("password").notNullable();
    })
    .then((res) => console.log("ADDED TABLE USERS"));
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
