// 20250804083721_initial_existing_schema.mjs
export const up = function (knex) {
    return knex.schema
        .createTable("user", function (table) {
            table.increments('id').primary();
            table.string('username', 45).notNullable();
            table.string('password', 45).notNullable();
            table.string('role', 45);
            table.string('email', 45);
        })
        .createTable("supplier", function (table) {
            table.increments('id').primary();
            table.string('name', 45).notNullable();
            table.string('contact', 45);
        })
        .createTable("products", function (table) {
            table.increments('id').primary();
            table.string('name', 45).notNullable();
            table.integer('amount').notNullable();
            table.decimal('price', 6, 2).notNullable();
            table.integer('supplier').unsigned().references('id').inTable('supplier').onDelete('SET NULL');
        })
        .createTable("employee", function (table) {
            table.increments('id').primary();
            table.string('name', 45).notNullable();
            table.string('position', 45);
            table.decimal('salary', 6, 2);
        })
        .createTable("purchase", function (table) {
            table.increments('id').primary();
            table.integer('userId').unsigned().references('id').inTable('user').onDelete('CASCADE');
            table.integer("totalAmount");
            table.date("date");
        })
        .createTable("purchasedProduct", function (table) {
            table.increments('id').primary();
            table.integer("purchaseId").unsigned().references('id').inTable('purchase').onDelete('CASCADE');
            table.integer('productId').unsigned().references('id').inTable('products').onDelete('CASCADE');
            table.integer('quantity').notNullable();
            table.decimal('price', 6, 2).notNullable();
        });

};

export const down = function (knex) {
    return knex.schema
        .dropTableIfExists('purchasedProduct')
        .dropTableIfExists('purchase')
        .dropTableIfExists('products')
        .dropTableIfExists('employee')
        .dropTableIfExists('supplier')
        .dropTableIfExists('user');
};