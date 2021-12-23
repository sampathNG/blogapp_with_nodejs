require('dotenv').config()
const knex = require('knex')({
    client : "mysql2",
    connection : {
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    }
})
knex.schema.createTable('users',(t)=>{
    t.increments("id").primary()
    t.string('name')
    t.string('email')
    t.string('password')
}).then((data)=>{
    console.log('table created success')
}).catch((err)=>{
    console.log('table already exists')
})


knex.schema.createTable('posts',(t)=>{
    t.increments("id").primary()
    t.string('name')
    t.string('author')
    t.integer('price')
}).then((data)=>{
    console.log('table created success')
}).catch((err)=>{
    console.log('table already exists')
})

knex.schema.createTable("likeDislike",(table)=>{
    table.increments("id").primary()
    table.integer("user_ID")
    table.boolean('like').notNullable()
    table.boolean('Dislike').notNullable()
}).then((data)=>{
    console.log({massage:"table create"});
}).catch((err)=>{
console.log({massage:"table already created"});
})

module.exports = knex;

