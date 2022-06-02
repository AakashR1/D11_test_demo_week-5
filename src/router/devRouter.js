const express = require('express');
const router = express.Router();
const developerController = require('../controller/devController');

router.post('/addDeveloper',developerController.addDeveloper);
router.patch('/updateDeveloper/:devId',developerController.updateTeam);
router.post('/login/',developerController.postlogin);
router.get('/getteamWithDev/',developerController.getteamWithDev);
router.get('/getdevWithEmail/:email',developerController.getDevWithteam);
router.get('/getDevSortDOB',developerController.getDevSortDOB);


module.exports = router