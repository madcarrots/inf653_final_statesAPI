const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    _state: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true, uppercase: true }, // auto-uppercase nice-to-have
    nickname: String,
    website: String,
    admission_date: String,
    admission_number: Number,
    capital_city: { type: String, required: true },
    capital_url: String,
    population: Number,
    population_rank: Number,
    constitution_url: String,
    state_flag_url: String, 
    state_seal_url: String,
    map_image_url: String,
    landscape_background_url: String,
    skyline_background_url: String,
    twitter_url: String,
    facebook_url: String,
    funfacts: [],
},  {timestamps: true });
        


module.exports = mongoose.model('State', stateSchema);