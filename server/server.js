const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
var cors = require('cors');

//connexion to db
mongoose.connect('mongodb://localhost:27017/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('SUCCESS !'))
  .catch(() => console.log('ERROR !'));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/',routes);
app.listen(3354,()=>{
    console.log('started on port 3354');
})

