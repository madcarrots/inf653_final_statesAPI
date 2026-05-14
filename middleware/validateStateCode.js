const validateStateCode = (req, res, next) => {
    const { code } = req.params;

    if (!code || code.length !==2) {
        return res.status(400).json({
            "error": "Invalid State Abbreviation. ID must be exactly 2 letters."
        });
    }

    req.stateCode = code.toUpperCase();
    next();
};

module.exports = validateStateCode;