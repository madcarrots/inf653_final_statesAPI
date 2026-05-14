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

        
        const state = await State.findOne({ code: stateAbbr }).select('-_id').lean();

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

const getFunFact = async (req, res) => {
    try {
        const state = await State.findOne({ code: req.stateCode })
            .select('funfacts')
            .lean();
        
        if (!state || !state.funfacts || state.funfacts.length === 0) {
            return res.status(404).json({ message: `No Fun Facts found for ${req.stateCode}` });
        }

        // random fun fact
        const randomFact = state.funfacts[Math.floor(Math.random() * state.funfacts.length)];
        res.json({ funfact: randomFact });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const getCapital = async (req, res) => {
    try {
        const state = await State.findOne({ code: req.stateCode })
            .select('state capital_city')
            .lean();

        if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter"});

        res.json({ 'state': state.state, 'capital': state.capital_city });
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


const getNickname = async (req, res) => {
    try {
        const state = await State.findOne({ code: req.stateCode })
            .select('state nickname')
            .lean();

        if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter"});

        res.json({ 'state': state.state, 'nickname': state.nickname });
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


const getPopulation = async (req, res) => {
    try {
        const state = await State.findOne({ code: req.stateCode })
            .select('state population')
            .lean();

        if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter"});

        res.json({ 'state': state.state, 'population': state.population });
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


const getAdmission = async (req, res) => {
    try {
        const state = await State.findOne({ code: req.stateCode })
            .select('state admission_date')
            .lean();

        if (!state) return res.status(404).json({ message: "Invalid state abbreviation parameter"});

        res.json({ 'state': state.state, 'admitted': state.admission_date });
    }   catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    getAllStates,
    getState,
    getContigStates,
    updateFunFact,
    getFunFact,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission
};