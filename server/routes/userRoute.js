const router = require('express').Router();
const userControler = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/self',auth,userControler.check_token);
router.post('/login', userControler.login);
router.post('/signup', userControler.sign_up);

module.exports = router;