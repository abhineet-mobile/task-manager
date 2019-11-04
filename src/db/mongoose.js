const mongoose = require('mongoose')
const validator = require('validator')

//Connect ot the database 
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true, 
    useCreateIndex: true,
    useUnifiedTopology: true 
})
// Inroder to add validations for phones, emails, pin, social security number it is best to use a NPM library 



// //Defining a model
// const User = mongoose.model('User', {
//     name:{
//         type: String, 
//         required : true,     // help in making the field required 
//         trim: true // trim to remove spaces in the name
//     }, 
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true, 
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required:true,
//         trim:true,
//         validate(value){
//             if(value.length<7){
//                 throw new Error('Password Length should be atleast 7 character')   ///minlength:7 this can also be used 
//             }
//         },
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                     throw new Error('Password cannot contain aplhabest password')
//             }
//         }
//     },
//     age:{
//         type: Number, 
//         default: 0,
//         validate(value){
//             if(value<0){
//                 throw new Error ('Age must be a positive number')      // help in making validation more effective  
//             }
//         }
//     }
// })
// Creating an instance 
// const me= new User({
//     name: '  Sheetal  Gurung', 
//     email:'SHEETAL@GMAIL.COM',
//     //age: 
//     password: 'PASSWORD'

// })

// //save in DB

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Errro!', error)
// })
//Creating  a model for task 

// const Tasks = mongoose.model('Tasks', {
//         Description: {
//                 type: String,
//                 trim: true,
//                 required:true
//         }, 
//         Completed:{
//                 type: Boolean,
//                 default:false
//         }
// })

//Creating Instance for the task

// const duty = new Tasks({
//     Description : "Learning data Science by python", 
//     Completed: true
//     })

//     duty.save().then(()=>{          // Save returns promise 
//         console.log(duty)
//     }).catch(()=>{
//         console.log('Error!', error)
//     })