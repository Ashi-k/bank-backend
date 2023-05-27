  const jwt=require('jsonwebtoken')
  const db=require('./db.js')
  

register=(uname,acno,psw)=>{

    // if(acno in userDetails){
      return db.user.findOne({acno}).then(user=>{
        if(user){
          return{
            status:false,
            message:'user already present',
            statusCode:401
          }
        }
        else{
          // create a new user object in db
           const newuser=new db.user({
              acno,
              username:uname,
              password:psw,
              balance:0,
              transaction:[]
           })
           //save in db
          newuser.save()

          return {
            status:true,
            message:'register success',
            statusCode:200
          }

        }
      })
     
    }
   
   

   login=(acnum,psw)=>{

    // if(acnum in userDetails){
      return db.user.findOne({acno:acnum,password:psw}).then(user=>{
         if(user){
          currentUser=user.username
          currentAcno=user.acno
  
          const token=jwt.sign({currentAcno},"supersecretkey1")
          
           return {
            status:true,
            message:'login success',
            statusCode:200,
            currentUser,
            currentAcno,
            token
  
          }
         }
         else{
          return{
            status:false,
            message:'incorrect Account number or password',
            statusCode:401
          }
         }
      })
  
      }
   
  

  deposit=(acnum,password,amount)=>{
    //convert string ammount to number
    var amnt = parseInt(amount)

    return db.user.findOne({acno:acnum,password}).then(user=>{
     if(user){
        user.balance+=amnt
        user.transaction.push({Type:"CREDIT",amount:amnt})

        user.save()
        return{
          status:true,
          message:`${amnt} is credited to your ac and the balance
           ${user.balance} `,
          statusCode:200
        }
     }
     else{
      return {
        status:false,
        message:'incorrect acount number or password',
        statusCode:401
      }
    }

    })

      
    }
   

  withdraw=(acnum,password,amount)=>{
   
    var amnt = parseInt(amount)
    return db.user.findOne({acno:acnum,password}).then(user=>{
      if(user){
        if(amnt<=user.balance){
        user.balance-=amnt
        user.transaction.push({Type:"DEBIT",amount:amnt})

        user.save()
        return{
          status:true,
            message:`${amnt} is debited and the balance is
             ${user.balance} `,
            statusCode:200
        }
      }

      else{
        return {
          status:false,
          message:'insufficient balance',
          statusCode:401
        }
      }
    }
    else{
      return {
        status:false,
        message:'incorrect account number or password',
        statusCode:401
      }
    }
      
      
    })
  }

        

       
  

  getTransaction=(acno)=>{
    return db.user.findOne({acno}).then(user=>{
      if(user){
        return {
          status: true,
          statusCode: 200,
          transaction:user.transaction
        }
      }
    })
    
  }


  deleteAcc=(acno)=>{
    return db.user.deleteOne({acno}).then(user=>{
      if(user){
        return{
          status:true,
          message:'account deleted',
          statusCode:200
        }
    
      }
      else{
        return{
          status:false,
          message:'user does not exist',
          statusCode:401
        }
      }
    })
  }

  


   module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
   }
