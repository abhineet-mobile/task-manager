const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/task')
const userRoutes = require ('./routes/user')
const taskRoutes = require ('./routes/task')
//configuring web server 
const app = express()
const port = process.env.PORT || 3000 

// app.use((req, res, next )=>{
//   if(req.method === 'GET'){
//     res.send('GET requests are diabled')
//   }else{
//       next()

//   }
// })
// app.use((req,res,next)=>{
//    res.status(503).send('Website is down for maintenece')
// })




//express automatcially parse incoming JSON for us

app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)


app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})

// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const myFunction =async ()=>{

    const token = jwt.sign({_id:'abcd123'}, 'thisisawebsiterorkwn', { expiresIn:'7 days'})
    console.log(token)

   const data=  jwt.verify(token,'thisisawebsiterorkwn' )
   console.log(data)
    // const password = 'Red12345'
    // const hashedPassword = await bcrypt.hash(password, 8)

    // console.log(password)
    // console.log(hashedPassword)

    // const isMatch = await bcrypt.compare('Red12345', hashedPassword)
    // console.log(isMatch)
}

myFunction()