const { parseArgs } = require('node:util');
const State = require('../model/State');

// stopped here, think i just added the model state above.. 


const getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        if (!states || states.length === 0) {
            return res.status(204).json({ 'message': 'No states found.' });
        }

        res.json(states);
    } catch (err) {
        console.error(err);
        res.status(500).json({"message": err.message });
    }
    

}

const updateFunFact = async (req, res) => {
    if(!req?.params?.code) {
        return res.status(400).json({ 'message': 'State ID parameter is required.'})
    }

    const { newFunFact } = req.body;
    const state = await State.findOne({code: req.params.code}).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state has the abbreviation ${req.params.code}. `});
    }
    if (req.body?.funFact) { $push: { funfacts: newFunFact } }
    const result = await state.save();
    res.json(result);
};



const getState =  async (req, res) => {
    // check if id is 2 characters
    const { code } = req.params;
    if (code.length !== 2) {
        return res.status(400).json({
            status: "error",
            message: "Invalid State Abbreviation.  ID must be exactly 2 letters.",
        });
    } 

    // make characters uppercase
    // does not need to be elsed from above 
    const stateAbbr = code.toUpperCase();
    
    // search for state based on the stateAbbr
        try {
        const state = await State.findOne({ code: stateAbbr });
        if (!state || state.length === 0) return res.status(204).json({ 'message': `State ID ${code} not found.` });
        res.json(state);
    } catch (err) {
        console.error(err);
        res.status(500).json({"message": err.message });
    }

}



module.exports = {
    getAllStates,
    getState
}