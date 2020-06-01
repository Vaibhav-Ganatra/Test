const express= require("express");
const router= express.Router();
const auth= require("../authVerification");

router.post("/image",auth, async (req,res) =>{
   const imageId= req.body.imageId;
   const userId= req.body.userId;
   try{
      const user= await req.db.users.findOne({
         where:{
            id:userId
         }
      });
      const newLike= await req.db.superlikes.create({
         user_name:user.name,
         user_image:user.profilePicture,
         image_id:imageId
      });
      res.status(200).json({
         success:true
      });
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