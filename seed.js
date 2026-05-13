/* require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const State = require('./model/State');
const statesData = require('./model/statesData.json');

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Optional: clear existing collection
        await mongoose.connection.dropCollection('states').catch(() => {});
        
        await State.insertMany(statesData);
        
        console.log(`✅ Successfully seeded ${statesData.length} states!`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        if (err.name === 'ValidationError') {
            console.error('→ Schema validation error - check field names match JSON');
        }
        process.exit(1);
    }
};

seedDatabase();
*/

// this was used once to get the data into mongo db so that i could use it. My previous attempt at inserting from the mongo website did not work