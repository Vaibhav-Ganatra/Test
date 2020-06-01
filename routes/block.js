const express= require("express");
const router= express.Router();
const auth= require("../authVerification");

router.post("/",auth,async (req,res) => {
   const userId= req.body.userId;
   const blockedId= req.body.blockedId;
   if(userId===blockedId)
   {
      res.status(400).json({
         success:false,
         message:"Cannot block own id"
      });
   }
   else{
      try{
         const block= req.db.block.create({
            user_id:userId,
            blocked_id:blockedId
         });
         res.status(200).json({
            success:true,
            message:"User blocked"
         });
      }
      catch(err){
         console.log(err);
         res.status(500).json({
            success:false,
            error:err
         });
      }
   }
});

module.exports= router;