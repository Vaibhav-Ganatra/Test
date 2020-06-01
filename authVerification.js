const jwt= require("jsonwebtoken");

module.exports= async (req,res,next) => {
   try{
      const token=req.headers.token;
      //Verify Token 
      jwt.verify(token,"secret_key",(err,decoded)=>{
         if(err){
            console.log(err);
            res.status(403).json({
               message:"UNAUTHORIZED!"
            });
         }
         else{
            next();
         }
      });

   }
   catch(err){
      res.status(500).json({
         success:false,
         error:err
      });
   }
};