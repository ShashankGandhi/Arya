const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

/**
 * User schema
 */

var userSchema = new mongoose.Schema({
    // auto-generated id of mongodb
    emailId: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: true
    }
  },
  {timestamps: true}
);

// userSchema.pre('save', async (next) => {
//   var user = this;
//   console.log('this==========', this, user)
//   // only hash the password if it has been modified (or is new)
//   // if (!user.isModified('password')) return next();
//   console.log(typeof process.env.SALT_ROUNDS)
//   const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
//   user.password = await bcrypt.hash(user.password, salt);
// });
module.exports =  mongoose.model('user', userSchema);
