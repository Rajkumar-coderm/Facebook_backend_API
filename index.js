const express=require('express');
const app=express();
app.use(express.json())

app.use('/',require('./Routs/sin'))
app.use('/',require('./Routs/log'))
app.use('/',require('./Routs/post'))
app.use('/',require('./Routs/like_comment'))
app.use('/',require('./Routs/search'))

app.listen(2022,()=>{
    console.log("srver start");
})