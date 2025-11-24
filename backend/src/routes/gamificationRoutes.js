// backend/src/routes/gamificationRoutes.js (Você deve criar este arquivo)

const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const rankingController = require ('../controllers/rankingController');

// Rota para o frontend buscar o ranking
router.get('/ranking', rankingController.getRanking); 

// Rota para o frontend registrar um desafio concluído
router.post('/challenges/complete', challengeController.completeChallenge); 

module.exports = router;