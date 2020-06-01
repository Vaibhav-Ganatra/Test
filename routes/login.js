const express= require("express");
const router= express.Router();
const jwt=require("jsonwebtoken");

router.post("/", async (req,res) =>{

   const db= req.db;
   const email=req.body.email;
   const password= req.body.password;
   try{
   const user=await db.users.findOne({
      where:{
         email:email,
         password:password
      }
   });
   if(user==null)
   {
      res.status(400).json({
         success:false,
         message:"Incorrect email or password"
      });
   }
   else{
      const token= await jwt.sign({email:email},"secret_key");
      console.log(token);
      res.status(200).json({
         success:true,
         message:"Signed-in successfully",
         token:token,
         user:{
            id:user.id,
            name:user.name,
            profilePicture:user.profilePicture
         }
      });
   }
   }
   catch(err){
      console.log(err);
      res.status(500).json({
         success:false,
         error:err
      });
   }
});

module.exports=router;