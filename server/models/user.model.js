const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Required Field"],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: `Invalid email.`
        }
    },
    firstName: {
        type: String,
        required: [true, "Required Field"],
    },
    lastName: {
        type: String,
        required: [true, "Required Field"],
    },
    contactNumber: {
        type: String,
        required: [true, "Required Field"],
        minlength: [10, "Must be a minimum of 10 digits. EX. 555-555-5555"]
    },
    street1: {
        type: String,
        required: [true, "Required Field."]
    },
    street2: String,
    city: {
        type: String,
        required: [true, "Required Field."]
    },
    addressState: {
        type: String,
        required: [true, "Required Field."]
    },
    country: {
        type: String,
        default: 'USA'
    },
    zip: {
        type: String,
        required: [true, "Required Field."]
    },    
    password: {
        type: String,
        required: [true, "Required Field"],
        minlength: [8, "Must be at least 8 characters long."]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps:true})

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next){
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords do not match.")
    }
    next();
})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password,10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

const User = new mongoose.model("User", UserSchema);

module.exports.User = User;
module.exports.UserSchema = UserSchema;