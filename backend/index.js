const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/key.js');
const { User } = require('./models/User')

const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//*---------------Database----------------
mongoose.connect(config.mongoURI)
.then(() => console.log("Database Connected..."))
.catch(err => console.log(err))


//*---------------Routes----------------
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/auth/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    console.log("User Registered\n", userInfo)
    return res.status(200).json({
      success: true
    })
  });
});


//*---------------PORT------------------
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})