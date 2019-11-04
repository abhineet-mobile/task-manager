require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('add id ').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({complete:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments ({completed:false})
    return count 
}

deleteTaskAndCount ('add id here').then((demo)=>{
    console.log(demo)
}).catch((e)=>{
    console.log(e)
})
 
