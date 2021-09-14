const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * login use bcrypt to compare password if valid 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req, res) => {

    const user = await User.findOne({ userName: req.body.userName })
    
    if(!user)
    {
      res.status(401).json({ error: 'error' });
    }
    //crypt password
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        res.status(401).json({ error: 'error' });
      }
    })
    .catch(error => res.status(500).json({ error }));
    
    res.status(200).json({
      token: jwt.sign(
        { userId: user._id },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h'}
      ),
      message: 'connexion successful.'
    });           

  };
  
  //function to check if token is good
  exports.check_token = (req, res) => {
    return res.status(200).json({userId: req.user_id});
  }

    /**
   * check if token is valid with checking userID
   * @param {*} userId 
   * @returns bool 
   */
     exports.check_userId = async(userId) => {
      try {
        let user = await User.findOne({ _id: userId })
        if(user) return true
        return false
      } catch (error) {
        return false
      }
    };


