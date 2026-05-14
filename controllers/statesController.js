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

/*
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
*/


const getFunFact = async (req, res) => {
    try {
        const state = await State.findOne({ code: req.stateCode })
            .select('state funfacts')
            .lean();
        
        if ( !state.funfacts || state.funfacts.length === 0 ) {
            return res.json({ message: `No Fun Facts found for ${state.state}` });
        }

        // random fun fact
        const randomFact = state.funfacts[Math.floor(Math.random() * state.funfacts.length)];
        res.json({ funfact: randomFact });
    } catch (err) {
        console.error(err);
            res.status(400).json({ message: "Invalid state abbreviation parameter" });
        
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

        res.json({ 'state': state.state, 'population': state.population.toLocaleString('en-US') });
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


const createFunfact = async (req, res) => {   
    try {
        if (!req.body?.funfact) {
            return res.status(400).json({ message: 'State fun facts value required' });
        }
        if ( !Array.isArray(req.body.funfacts)) {
            return res.status(400).json({ 
                message: 'State fun facts value must be an array' 
            });
        }

        const state = await State.findOne({ code: req.stateCode }).exec();

        if (!state) { 
            return res.status(404).json({ message: "Invalid state abbreviation parameter"});
        }

        //append with the dots. 
        state.funfacts.push(...req.body.funfacts);
        const result = await state.save();

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};


const updateFunFact = async (req, res) => {
    try {
        const { index, funfact } = req.body;

        if ( funfact === undefined) {
            return res.status(400).json({ message: 'State fun facts value required' });
        } else if (index === undefined) {
            return res.status(400).json({ message: 'State fun facts index value required' });
        }
        const state = await State.findOne({ code: req.stateCode }).exec();

        if (!state) { 
            return res.status(404).json({ message: "Invalid state abbreviation parameter"});
        }

        const idx = Number(index) - 1;  
        if (idx < 0 || idx >= state.funfacts.length) {
            return res.status(400).json({ message: `Index ${index} out of range` });
        }

        state.funfacts[idx] = funfact;   
        const result = await state.save();

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const deleteFunFact = async (req, res) => {
    try {
        if (!req.body?.index) {
            return res.status(400).json({ message: 'State fun facts index value required' });
        }
        const state = await State.findOne({ code: req.stateCode }).exec()
            .select('state funfacts');
            
        

        if (!state) { 
            return res.status(404).json({ message: "Invalid state abbreviation parameter"});
        }
        if ( !state.funfacts || state.funfacts.length === 0 ) {
            return res.json({ message: `No Fun Facts found for ${state.state}` });
        }
        const idx = Number(req.body.index) - 1;

        state.funfacts.splice(idx, 1);

        const result = await state.save();
        res.json(result);
    } catch (err) {
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
    getAdmission, 
    createFunfact,
    deleteFunFact

};