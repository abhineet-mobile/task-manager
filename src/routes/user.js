const express = require('express')
const User = require ('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//creating users 
router.post('/users', async (req, res)=>{
    const user  = new User (req.body)

        try{
            await user.save()
            const userToken = await user.generateAuthToken()
            res.status(201).send({user, userToken})
        }catch (error){
            res.status(400).send(error)
        }
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400)   
    //   res.send(error)
    //   //both the above lines can be comdined to be like this res.status(400).send(error)
    // })
    // console.log(req.body)
    // res.send('testing')
})
router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
   
    }catch(error){
        res.status(400).send()
    }
})

router.get('/users/me',auth ,async(req, res)=>{
    res.send(req.user)
    // try{
    //         const user =  await User.find({})
    //         res.send(user)
    // }catch (error){
    //         res.status(500).send()
    // }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })

})

router.get('/users/:id', async(req,res)=>{
    const _id = req.params.id 

    try{
        const user =  await User.findById (_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)

    }catch(error){
        res.status(500).send()

    }
    // User.findById (_id).then((user)=>{
    //     if(!user){
    //         return res.status(500).send()
    //     }
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})


router.patch('/users/:id', async(req,res)=>{
//if the user is updationg a field which isn't avaialbe 
    const updates = Object.keys(req.body)
    const allowedUpdated= ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update)=> allowedUpdated.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    //end 
    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update)=>user[update] =req.body[update])
        await user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(error){
        res.status(400).send()
    }
})

router.delete('/users/:id', async (req, res) =>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send()
        } 
        res.send(user)
    }catch(error){
        res.status(500).send()
    }
})



module.exports = router