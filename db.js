const {Pool}= require("pg");

const pool=new Pool({connectionString:'postgresql://todo_app_owner:npg_Zm5sJ4QvzFkC@ep-autumn-heart-a5d78avo-pooler.us-east-2.aws.neon.tech/todo_app?sslmode=require'
})


module.exports=pool