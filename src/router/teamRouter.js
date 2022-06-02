const express = require('express');
const router = express.Router();
const teamController = require('../controller/teamController');

router.post('/addteam',teamController.addTeam);
router.post('/updateTeam/:teamId',teamController.updateTeam);


module.exports = router