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

router.route('/:code/funfact')
    .get(validateStateCode, statesController.getFunFact);

router.route('/:code/capital')
    .get(validateStateCode, statesController.getCapital);

router.route('/:code/nickname')
    .get(validateStateCode, statesController.getNickname);

router.route('/:code/Population')
    .get(validateStateCode, statesController.getPopulation);

router.route('/:code/admission')
    .get(validateStateCode, statesController.getAdmission);


router.route('/:code/funfact')
    .post(validateStateCode, statesController.createFunfact)
    .put(validateStateCode, statesController.updateFunFact)
    .delete(validateStateCode, statesController.deleteFunFact)


module.exports = router;