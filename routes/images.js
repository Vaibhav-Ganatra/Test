const express= require("express");
const router= express.Router();
const auth= require("../authVerification");

router.post("/add",auth,async (req,res) => {
   const user_id= req.body.user_id;
   const image_url= req.body.image_url;
   try{
      const image= await req.db.images.create({
         user_id:user_id,
         url:image_url
      });
      res.status(200).json({
         success:true,
         image:{
            id:image.id,
            url:image.url
         }
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

router.get("/all",auth,async (req,res)=>{
      const user_id= req.headers.user_id;
      try{
      const images=await req.db.images.findAll({
         where:{
            user_id:user_id
         },attributes:["id","user_id","url"]
      });
      res.status(200).json({
         success:true,
         images:images
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

module.exports= router;
