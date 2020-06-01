const express=require("express");
const router = express.Router();

router.post("/addUser",async (req,res) => {
   try{
      const newUser= await req.db.users.create({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password
      });
      //console.log(newUser);
      res.status(200).json({
         success:true,
         newUser:{
            name:newUser.name,
            email:newUser.email,
            profilePicture:newUser.profilePicture
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

router.get("/all",async (req,res) =>{
   try{
      const users= await req.db.users.findAll();
      const maps= await users.map((user)=>{
         return Object.assign(
            {},
            {
               id:user.id,
               name:user.name,
               email:user.email,
               profile:user.profilePicture
            }
         )
      })
      res.status(200).json({
         success:true,
         users:maps
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

router.post("/test/create",async (req,res) =>{
   const  testuser = await addUser(req.db);
   console.log(testuser.result);
   if(testuser.result){
      const user=testuser.user;
      res.status(200).json({
         success:true,
         message:"Adding User",
      });
   }
   else{
      res.status(500).json({
         success:false,
         error:testuser.error.name
      });
   }
})

module.exports= router;

async function addImage(id,db){
   console.log("Test User Id",id);
   for(var i=0;i<10;i++)
   {
      const image= await db.images.create({
         user_id:id,
         url:"https://www.freepik.com/free-photo/vacation-wonder-fresh-trees-waterfall-outdoor_1251065.htm#page=1&query=scenery&position=1"
      });
      console.log("Image Added");
   }
 }

 async function addUser(db){
   try{
      for(var i=0;i<7;i++)
      {
      const user = await db.users.create({
         name:"TestUser"+i,
         email:"testuser"+i+"@example.com",
         password:"12345678"
      });
      addImage(user.id,db);
   }
      return {result:true};
   
      }
      catch(err)
      {
         console.log(err);
         return {
            result:false,
            error:err
         };
      }
 }
const auth= require("../authVerification");
 router.get("/me",auth,async (req,res)=>{
   const id= req.headers.user_id;
   const db=req.db;
   db.users.findOne({
         where:{
            id:id
         },
      include:[{
         model:db.images,
         include:[{
            model:db.superlikes
            },
         {   
            model:db.likes
            }]
         }]
   }).then((user) => {
      const resObj= {
         id:user.id,
         name:user.name,
         email:user.email,
         profilePicture:user.profilePicture,
         images:user.Images.map((image) =>{
            return Object.assign({},{
               id:image.id,
               url:image.url,
               likes:image.Likes.map((like) => {
                  return Object.assign({},{
                     name:like.user_name
                  })
               }),
               superlikes:image.SuperLikes.map((superlike) =>{
                  return Object.assign({},{
                     name:superlike.user_name,
                     profilePicture:superlike.user_image
                  });
               })
            })
         })
      }
      res.status(200).json({
         success:true,
         user:resObj
      });
   })
   .catch((err) =>{
      console.log(err);
      res.status(500).json({
         success:false,
         error:err
      });
   }) 
 });

 const Op= require("sequelize").Op;

 router.get("/forMe",auth,async (req,res) =>{
    const userId= req.headers.user_id;

    const db=req.db;
    var blockedUsers=[];
    blockedUsers.push(userId);
    try{
      const blockList= await db.block.findAll({
         where:{
            blocked_id:userId
         }
      });
      await blockList.forEach((block) => {
         console.log("Blocked by",block.user_id);
         blockedUsers.push(block.user_id);
      });
      console.log(blockedUsers);
       const users= await db.users.findAll({
          where:{
             id:{
                [Op.notIn]:blockedUsers
             }
          }
       });
       //console.log(users);
       res.status(200).json({
          success:true,
          users:users.map((user) =>{
             return Object.assign({},{
                id:user.id,
                name:user.name,
                email:user.email,
                profilePicture:user.profilePicture
             });
          })
       })
   }
   catch(err){
      console.log(err);
      res.status(500).json({
         success:false,
         error:err
      });
   }
 })