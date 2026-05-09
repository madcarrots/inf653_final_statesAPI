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
    const { abbr } = req.params;
    if (abbr.length !== 2) {
        return res.status(400).json({
            status: "error",
            message: "Invalid State Abbreviation.  ID must be exactly 2 letters.",
        });
    } else {
        // make characters uppercase
        stateAbbr = abbb.toUpperCase();
    }
    // search for state based on the stateAbbr
    const state = data.states.find( st => st.id === stateAbbr);
    if (!state) {
        return res.status(400).json({ "message": `State ID ${req.params.id} not found.` });
    }
    res.json(state);
}



module.exports = {
    getAllStates,
    getState
}