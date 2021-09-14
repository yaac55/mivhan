const router = require('express').Router();
var userRoute = require('./userRoute');

router.use('/user',userRoute);

module.exports = router;