

// Express Connection
const express = require('express');
const app = express();
const port = 8080;


//Mongoose Connection
const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLustDB');
}

main().then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{  
    console.error('Error connecting to MongoDB',err);
});

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})