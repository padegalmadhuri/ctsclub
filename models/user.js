
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  regno: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,

  },

  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  }
});

// Authenticate input on database
// UserSchema.methods.comparePassword=function(candidatepassword,checkpassword){
//   bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
//     if(err) return checkpassword(err)
//     checkpassword(null,isMatch)
//   })
// }
// Hashing password before saving it to the database
UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
