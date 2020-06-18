
const express = require('express') //import express libray

const contactRoute = require('./api/routes/context')

const app = express()  //app define

const PORT = process.env.PORT || 3000 // define port

app.listen(PORT, () =>{
    console.log('server is running on ',{PORT}) //runing application in PORT

})


app.use('/api/context/', contactRoute)



// app.get('/', (req, res) =>{
//     res.send('<h1>Hello World</h1> <h6>My Name is Tajal Islam') //url, req method setting
     
// })

// app.get('/post', (req, res) =>{
//     res.json(context)
     
// })

// app.post('/post', (req, res) =>{
//     res.json({
//         message:'I am from post requet'
//     })
     
// })




// const context = [
//     {name:"tajal", roll:1189, email:"md@gmail.com"},
//     {name:"sopnil", roll:1189, email:"md@gmail.com"}
// ]
