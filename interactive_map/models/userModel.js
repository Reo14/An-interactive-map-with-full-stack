const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        //required: true,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    uid: {
        type: String,
        
    },
    date: {
        type: Date,
        default: Date.now
    },
      
});



module.exports = model('User', UserSchema)