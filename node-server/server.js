
const express=require('express');
const mongoose=require('mongoose');

const cors=require('cors');
const app=express();

const port=process.argv.PORT||5000;

mongoose.connect('mongodb://localhost:27017/api',
    {
        //useNewUrlParser: true,
  //useUnifiedTopology: true
    }
).then(()=>
    console.log("mongoDB is connected")
).catch(err=> console.error(err))

app.use(cors());
app.use(express.json())



//routes
app.use('/api/todos', require('./route/todos'))

app.listen(port,()=>{
    console.log(`server is connected using ${port}`)
});

