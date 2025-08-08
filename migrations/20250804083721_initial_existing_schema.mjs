exports.up = function (knex) {
    return knex.schema
        .createTable("user",
            function (table) {
                table.increments('id').primary();
                table.string('username', 45);
                table.string('password', 45);
                table.string('role', 45);
                table.string('email', 45);

            })
        .createTable("supplier",
            function (table) {
                table.increments('id').primary();
                table.string('name', 45);
                table.string('contact', 45);


            })
        .createTable("products",
            function (table) {
                table.increments('id').primary();
                table.string('name', 45);
                table.integer('amount');
                table.decimal('price', 6, 2);
                table.integer('supplier').references('supplier.id')


            })
        .createTable("employee",
            function (table) {
                table.increments('id').primary();
                table.string('name', 45);
                table.string('position', 45);
                table.decimal('salary', 6, 2);
            })

};

//drop table function later