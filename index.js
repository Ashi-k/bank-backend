// import dataservicee file
const dataService=require("./service/dataservice")

//import cors
const cors=require('cors')

//import json web token
const jwt=require('jsonwebtoken')


// import express

const express=require("express")

// create app using express
const app=express()

// connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))

// to parse json data from req body
app.use(express.json())

//middleware
const jwtMiddleware=(req,res,next)=>{
    try {
        const token=req.headers['access_token']
    //verify token
    const data=jwt.verify(token,"supersecretkey1")
    console.log(data);

    next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'please login'
        })
    }
}



//register -post
app.post('/register',(req,res)=>{

    dataService.register(req.body.uname,req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
    // convert object to json and send as response
    // console.log(req.body);
    // res.send("success")
})

//login
app.post('/login',(req,res)=>{

    dataService.login(req.body.acnum,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
    // convert object to json and send as response
    
   
})

//deposit
app.post('/deposit',jwtMiddleware,(req,res)=>{

    dataService.deposit(req.body.acnum,req.body.password,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//withdraw
app.post('/withdraw',jwtMiddleware,(req,res)=>{

    dataService.withdraw(req.body.acnum,req.body.password,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//getTransaction
app.post('/transaction',jwtMiddleware,(req,res)=>{

    dataService.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})



//delete

app.delete('/delete/:acno',jwtMiddleware,(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


// request
// app.get('/',(req,res)=>{
//     res.send('Get Method.....123')
// })

// app.post('/',(req,res)=>{
//     res.send('Post Method.....123')
// })

// app.put('/',(req,res)=>{
//     res.send('Put Method.....123')
// })

// app.patch('/',(req,res)=>{
//     res.send('Patch Method.....123')
// })

// app.delete('/',(req,res)=>{
//     res.send('Delete Method.....123')
// })






// create port 
app.listen(3000,()=>{console.log("server started at port number 3000");})

