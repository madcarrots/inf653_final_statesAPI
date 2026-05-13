const router = require('express').Router({mergeParams: true});



const verifier =  router.get('/', async (req, res) => {

// check if id is 2 characters
    const { code } = await req.params;
    if (code.length !== 2) {
        return res.status(400).json({
            status: "error",
            message: "Invalid State Abbreviation.  ID must be exactly 2 letters.",
        });
    } 

    const stateAbbr = code.toUpperCase();
    return stateAbbr;
});

module.exports = verifier;