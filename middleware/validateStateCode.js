const validateStateCode = (req, res, next) => {
    const { code } = req.params;

    if (!code || code.length !==2) {
        return res.status(400).json({
            message: "Invalid state abbreviation parameter"
        });
    }

    req.stateCode = code.toUpperCase();
    next();
};

module.exports = validateStateCode;