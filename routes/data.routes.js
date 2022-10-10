const express = require('express');
const dataControllers = require('../controller/data.controllers');
const router = express.Router();

router.get('/totaux', dataControllers.votesParCandidat);
router.get('/votants-inscrits', dataControllers.votantsInscrits);
router.get('/pourcentage-blanc', dataControllers.pourcentageBlanc);
// http://localhost:3000/data/dynamique?tour=1&place=num_arrond&value=nb_votant&candidat=le_pen_marine
router.get('/dynamique', dataControllers.dynamique);


module.exports = router