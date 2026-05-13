const { parseArgs } = require('node:util');
const State = require('../model/State');

// stopped here, think i just added the model state above.. 


const getAllStates = async (req, res) => {
    const states = await State.find();
    if (!states) return res.status(204).json({ 'message': 'No states found.' });
}

const updateFunFact = async (req, res) => {
    if(!req?.body?.id) {
        return res.status(400).json({ 'message': 'State ID parameter is required.'})
    }

    const { newFunFact } = req.body;
    const state = await State.findOne({_id: req.params.code}).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state has the abbreviation ${req.params.code}. `});
    }
    if (req.body?.funFact) { $push: { funacts: newFunFact } }
    const result = await state.save();
    res.json(result);
};



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