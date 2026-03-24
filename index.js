
// Express Connection
const express = require('express');
const app = express();
const port = 8080;


//Mongoose Connection
const mongoose = require('mongoose');
const Listing = require('./models/listings');
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

app.get('/testListings', async (req,res)=>{
    let sampleListing = new Listing({
        title: 'Beautiful Beach House',
        description: 'A stunning beach house with ocean views and modern amenities.',
        price: 500,
        location: 'Malibu, California',
        country: 'USA'
    })
    await sampleListing.save(); 
    console.log('Sample listing saved to database');
    console.log(sampleListing);
    res.send('This is the listings page');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})