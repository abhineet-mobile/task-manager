const express = require('express')
const Tasks = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req,res)=>{
    const task = new Tasks(req.body)
    try{
        const createTasks = await task.save()
        res.send(task)
    }catch(error){
        res.status(400).send()
    }
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
    // console.log(req.body)
    // res.send('task')
})

router.get('/tasks', async (req, res)=>{
      try{
        const task = await Tasks.find({})
        res.send(task)
      }catch(error){
        res.status(500).send()
      }  
   
    // Tasks.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((error)=>{
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Tasks.findById(_id)
        if (!task){
            return res.status(500).send()
        }
        res.send(task)

    }catch(error){
     res.status(500).send()   
    }

    // Tasks.findById(_id).then((task)=>{
    //         if(!task){
    //            return res.status(500).send()
    //         }
    //         res.send(task)

    // }).catch((error)=>{
    //         res.status(500).send()
    // })
})


router.patch ('/tasks/:id', async(req, res)=>{

    //if the user is updationg a field which isn't avaialbe 
    const updates = Object.keys(req.body)
    const allowedUpdates= ['Description', 'Completed']
    const isValidOperations = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperations){
        return res.status(400).send({error:'Invalid updates'})
    }

    //end 
    try{
            const tasks = await Tasks.findById(req.params.id)
            updates.forEach((update)=>tasks[update] = req.body[update])
            await tasks.save()

          //  const tasks = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
            if(!tasks){
                return res.status(404).send()
            }
            res.send(tasks)
    }catch(error){
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async(req,res)=>{

    try{
            const tasks = await Tasks.findByIdAndDelete(req.params.id)
            if(!tasks){
                return res.status(404).send()
            }res.send(tasks)

    }catch(error){
        res.status(500).send()

    }
})



module.exports = router