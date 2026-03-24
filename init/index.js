 
const mongoose = require('mongoose');
const Listing = require('../models/listings');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLustDB');
}

main().then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{  
    console.error('Error connecting to MongoDB',err);
});
const initialData = require('./data.js');

async function initDatabase(){
    try{
        await Listing.deleteMany({});
        await Listing.insertMany(initialData.data);
        console.log(initialData.data);
        console.log('Database initialized with sample data');
    }
    catch(err){
        console.error('Error initializing database',err);
    }
}

initDatabase();