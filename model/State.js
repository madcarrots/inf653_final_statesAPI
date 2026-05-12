const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
    },
    website: {
        type: String,
        unique: true
    }, 
    admission_date: {
        type: Date, 
        required: true
    }, 
    admission_number: {
        type: Int32
    },
    capital_city: {
        type: String,
        required: true
    },
    capital_url: {
        type:String
    },
    population: {
        type: Int32,
        required: true
    }, 
    population_rank: {
        type: Int32
    }, 
    constitution_url: {
        type: String
    },
    state_flag_url: {
        type: String
    }, 
    state_seal_url: {
        type: String
    },
    map_image_url: {
        type: String
    },
    landscape_background_url: {
        type: String
    },
    skyline_background_url: {
        type: String
    }, 
    twitter_url: {
        trype: String
    }, 
    facebook_url: {
        type: String
    },
    funfacts: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('State', stateSchema);