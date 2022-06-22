const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;



/**
 * login use bcrypt to compare password if valid 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req, res) => {

    const {password,userName} = req.body;

    const user = await User.findOne({ userName})
    if(!user)
    {
      res.status(401).json({ error: 'user doesnt exist' });
    }else{
      //decrypt password
      bcrypt.compare(password, user.password)
      .then(valid => {
        if (!valid) {
          console.log(valid);
          res.status(401).json({ error: 'wrong password' });
        }else{
          console.log(valid);
          res.status(200).json({
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h'}
            ),
            message: 'connexion successful.'
          }); 
        }
      })
      .catch(error => res.status(500).json({ error }));
    }          
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

    exports.sign_up = async (req, res) => {
      
      const {password,userName} = req.body;
      console.log(password,userName);
      const user = await User.findOne({ userName})
      if(user)
      {
        res.status(401).json({ error: 'user already exist' });
      }else{
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, function(err, hash) {
              console.log(hash);
              let user  = new User({userName,password: hash});
              user.save().then((results)=>{
                res.status(200).send('create succesfully');
              },(error)=> {
                  res.status(400).send(error);
              });
            });
        });
      }

   

    }

