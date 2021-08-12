require('dotenv').config()
const knex=require('knex')({
    client:'mysql',
    connection:{
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.databases
    }
})

knex.schema.createTable('user',(Table)=>{
    Table.increments('id').primary()
    Table.string('name')
    Table.string('surname')
    Table.bigInteger('mobile').primary()
    Table.string('Password')
    Table.bigInteger('DOB')
    Table.string('Gender')
}).then((data)=>{
    console.log("Table created successfully....");
}).catch((err)=>{
    console.log('Talble created already exits...');
})

knex.schema.createTable('post',(Table)=>{
    Table.increments('id').primary()
    Table.integer("user_id")
    Table.string('Public')
    Table.string('Description')
    Table.string('Image')
    Table.string('tag')
    Table.string('location')
    Table.string("Feeling")
}).then((data)=>{
    console.log('Post table created succesfully..');
}).catch((err)=>{
    console.log("Post table already exites..");
})

knex.schema.createTable('like_comment',(Table)=>{
    Table.increments('id').primary()
    Table.integer('user_id')
    Table.integer('post_id')
    Table.boolean('Like')
    Table.string('comment')
    Table.string('share')
}).then((data)=>{
    console.log("like_comment table created successefully....");
}).catch((err)=>{
    console.log("like_comment Table already exit...");
})

module.exports=knex;

