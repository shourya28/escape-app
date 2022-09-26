const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const citySchema = new Schema({
        id: String,
        name: String,
        location: { lat: String, lon: String },
        countryName: String,
        iata: String,
        rank: Number,
        countryId: String,
        dest: String,
        airports: [String],
        images: [String],
        popularity: Number,
        regId: String,
        contId: String,
        subId: String,
        terId: String,
        con: Number,
})

module.exports = mongoose.model('City', citySchema);