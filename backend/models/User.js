const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
},
{
    timestamps: true
});

//*---------------Hash Password----------------
userSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')){
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema);

module.exports = {User};