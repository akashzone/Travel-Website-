
// Express Connection
const express = require('express');
const app = express();
const port = 8080;


const path = require('path');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));


const methodOverride = require('method-override');
app.use(methodOverride("_method"));


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


app.get('/listings/new', async (req,res)=>{
    res.render('./listing/new.ejs')
});
app.get('/listings/:id/edit', async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(listing)
    res.render('./listing/edit.ejs',{listing})
});

app.put('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    let updatedListing = req.body.listing;
    await Listing.findByIdAndUpdate(id,updatedListing,);
    res.redirect(`/listings`);
})

app.delete('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id)
    res.redirect('/listings');
})

app.post('/listings',async (req,res)=>{
    let listing = req.body.listing;
    await Listing.insertOne(listing);
    res.redirect('/listings')
});

app.get('/listings/:id',async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render('./listing/show.ejs',{listing});
});
app.get('/listings', async (req,res)=>{
    let allListings = await Listing.find({});
    res.render('./listing/listings.ejs',{listings: allListings});
})

// app.get('/testListings', async (req,res)=>{
//     let sampleListing = new Listing({
//         title: 'Beautiful Beach House',
//         description: 'A stunning beach house with ocean views and modern amenities.',
//         price: 500,
//         location: 'Malibu, California',
//         country: 'USA'
//     })
//     await sampleListing.save(); 
//     c    onsole.log('Sample listing saved to database');
//     console.log(sampleListing);
//     res.send('This is the listings page');
// });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})