const State = require('../model/State');

const getAllStates = async (req, res) => {
    try {
        const states = await State.find().lean();
        if (!states || states.length === 0) {
            return res.status(204).json({ 'message': 'No states found.' });
        }
        res.json(states);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "message": err.message });
    }
};

const getState = async (req, res) => {
    try {
        const stateAbbr = req.stateCode;   // ← comes from middleware

        const state = await State.findOne({ code: stateAbbr }).lean();

        if (!state) {
            return res.status(204).json({ 'message': `State ID ${stateAbbr} not found.` });
        }
        res.json(state);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "message": err.message });
    }
};

const getContigStates = async (req, res) => {
    try {
        const isContig = req.query.contig === 'true';

        let query = {};
        if (isContig) {
            query.code = { $nin: ['AK', 'HI'] };
        } else {
            query.code = { $in: ['AK', 'HI'] };
        }

        const states = await State.find(query).lean();
        res.json(states);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const updateFunFact = async (req, res) => {
    if (!req?.params?.code) {
        return res.status(400).json({ 'message': 'State ID parameter is required.' });
    }

    const { newFunFact } = req.body;

    const state = await State.findOne({ code: req.params.code.toUpperCase() }).exec();

    if (!state) {
        return res.status(204).json({ "message": `No state has the abbreviation ${req.params.code}.` });
    }

    if (req.body?.funFact && newFunFact) {
        state.funfacts.push(newFunFact);   // Correct way
    }

    const result = await state.save();
    res.json(result);
};

module.exports = {
    getAllStates,
    getState,
    getContigStates,
    updateFunFact
};