const mongodb = require ('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID 
// const{ MongoClient, ObjectID} = require('mongodb')  // this is a short hand of above 3 lines of code 

const connectionURL = 'mongodb://127.0.0.1:27017'   //local host IP
const databaseName   = 'task-manager' // this can be anything this is the name of the Database 
// The below command is to connect  database to the server in case of 32 bit use this command too useUnifiedTopology: true,

// const id = new  ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useUnifiedTopology: true,useNewUrlParser: true}, (error, client)=>{
     if(error){
         return console.log('Unable to connect to Database')
     }
     
     const db = client.db(databaseName)

     //DELETE 
// db.collection('users').deleteMany({
//     age:27  //delete users whose age is 27
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

//DELETE MANAY 
db.collection('tasks').deleteOne({Description: 'Buy React course and learn it '}).then((result)=>{
        console.log(result)
}).catch(()=>{
        console.log(error)
})


     //UPDATE
//      const updatePromise =db.collection('users').updateOne({
//          _id: new ObjectID('5da5f79face5470814725c88')
//      }, {
//          $set:{
//              name:'Sheetal Gurung'
//          }
// // {
// //     $inc:{
// //         age: 1  //this is used to increase the age, if you want to decrease the age use -1 instead
// //     }
// // }
//      })
//      updatePromise.then((result)=>{
//         console.log(result)
//      }).catch((error)=>{
//         console.log(error)
//      })
//UPDATE MANY
//  db.collection('tasks').updateMany({
//      Completed: false }, {
//          $set:{
//              Completed: true
//          }
//      })

//  updatePromise.then((result)=>{
//             console.log(result.modifiedCount)
//          }).catch((error)=>{
//             console.log(error)
//          })
     ///READ
    //    db.collection('users').findOne({name: 'Sheetal'}, (error, result)=>{  // findOne is used to search for one value
    //        if(error){
    //            return console.log('Unable to fetch data')
    //        }
    //        console.log(result)


    //    })
    //    db.collection('users').find({age:30}).toArray((error, result)=>{  /// find and toArray (cursor method) are used to seach multiple data. 
    //     console.log(result)
    //    })
    //    db.collection('users').find({age:30}).count((error, count)=>{  /// find and count (cursor method) are used to seach multiple data. 
    //     console.log(count)
    //    })

    //  db.collection('tasks').findOne({ _id: new ObjectID('5da5f9632d76f61650c9b517')}, (error, tasks)=>{
    //     if(error){
    //         return console.log('No tasks found')
    //     }
    //     console.log(tasks)
    //  })

    //  db.collection('tasks').find({Completed:false}).toArray((error, complete)=>{
    //      if(error){
    //          return console.log('Non of the tasks are complete')
    //      }
    //      console.log(complete)
    //  })
    //  db.collection('tasks').find({Completed:false}).count((error, complete)=>{
    //     if(error){
    //         return console.log('Non of the tasks are complete')
    //     }
    //     console.log(complete)
    // })

// ADDING or CREATING  OUR OWN REFERENCE id 

// db.collection('users').insertOne({
//     _id: id,
//     name: 'Ram',
//     age: 32
// }, (error, result)=>{
//     if(error){
//         console.log ('New id was not added ')
//     }
//     console.log(result.ops)
// })


//creating one record or document in the database
    //  db.collection('users').insertOne({
    //      name: 'Abhinav', 
    //      age: 36
    //  }, (error, result)=>{
    //      if(error){
    //          console.log('Unable to Insert user')
    //      }
    //      console.log(result.ops)  // ops returns an array of documents added 

    //  })
    // console.log('connected correctly')

    //Inserting multiple collections in the database 

    // db.collection('users').insertMany([
    //     {
    //         name: 'Abhinav',
    //         age: 36
    //     }, 
    //     {
    //         name: 'Sheetal',
    //         age: 30
    //     }

    // ], (error, result)=>{
    //     if(error){
    //         console.log('Unab;e to add the user')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //         {
    //             Description: 'Leaning node.js completely and understadning its different aspects',
    //             Completed: true
    //         },
    //         {
    //             Description: 'Buy React course and learn it ',
    //             Completed: false
    //         },
    //         {
    //             Description: 'Earning one 100000 rupee per month ',
    //             Completed: true
    //         }

    // ], (error, result)=>{
    //     if(error){
    //         console.log('Tasks not added correctly')
    //     }
    //     console.log(result.ops)
    // })
})