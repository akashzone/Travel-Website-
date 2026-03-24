

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        image: { type: String , default: 'https://unsplash.com/photos/a-house-with-a-pool-in-the-yard-gLyBSJqGyk4',set: (v)=> v === '' ? 'https://unsplash.com/photos/a-house-with-a-pool-in-the-yard-gLyBSJqGyk4' : v},
        country: {
            type: String,
            required: true,
        }
    }
);


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;