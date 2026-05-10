const { parseArgs } = require('node:util');

const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data }
}

const getAllStates = (req, res) => {
    res.json(data.states);
}

const getState = (req, res) => {
    // check if id is 2 characters
    const { id } = req.params;
    if (id.length !== 2) {
        return res.status(400).json({
            status: "error",
            message: "Invalid State Abbreviation.  ID must be exactly 2 letters.",
        });
    } 

    // make characters uppercase
    // does not need to be elsed from above 
    const stateAbbr = id.toUpperCase();
    
    // search for state based on the stateAbbr
    const state = data.states.find( st => st.code === stateAbbr); // i was using id as in example vids. but it needs to match the param name in json file.  so "code"
    
    if (!state) {
        return res.status(400).json({ "message": `State ID ${id} not found.` });
    }
    res.json(state);
}



module.exports = {
    getAllStates,
    getState
}