const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const validateStateCode = require('../../middleware/validateStateCode');

router.route('/')
    .get((req, res, next) => {
        if (req.query.contig !== undefined) {
            return statesController.getContigStates(req, res, next);
        }
        return statesController.getAllStates(req, res, next);
    });

router.route('/:code')
    .get(validateStateCode, statesController.getState);

module.exports = router;