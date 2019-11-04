const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required : true,     // help in making the field required 
        trim: true // trim to remove spaces in the name
    }, 
    email: {
        type: String,
        unique: true , // this is used so that if a user is alrwady logged in using a email ID he should not be able to use the same email ID again. 
        required: true,
        trim: true,
        lowercase: true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required:true,
        trim:true,
        minlength:7,
        // validate(value){
        //     if(value.length > 7){
        //         throw new Error('Password Length should be atleast 7 character')   ///minlength:7 this can also be used 
        //     }
        // },
        validate(value){
            if(value.toLowerCase().includes('password')){
                    throw new Error('Password cannot contain aplhabest password')
            }
        }
    },
    age:{
        type: Number, 
        default: 0,
        validate(value){
            if(value<0){
                throw new Error ('Age must be a positive number')      // help in making validation more effective  
            }
        }
    },

    tokens: [{
        token:{
            type: String, 
            required : true
        }
    }]
})

userSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, 'thisismycourse')

    user.tokens = user.tokens.concat({token:token})
    await user.save()
    return token 
}
userSchema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({email})
        
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch  = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
    
}

userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password, 8)
    }


    next()
})
//Defining a model
const User = mongoose.model('User', userSchema )

module.exports = User