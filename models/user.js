// const {Sequelize,DataTypes}= require("sequelize");
// const sequelize= new Sequelize("test","postgres","zxcvbnma",{
//    host:"localhost",
//    dialect:"postgres"
//  });
//  var user;

// app.use("/create",addUser);


// async function addUser(req,res){
//    const User= sequelize.models.User;
//    const vaibhav=await User.create({name:"Vaibhav Ganatra"});
//     console.log(vaibhav.name);
//     console.log(vaibhav.toJSON());
//     res.status(200).json({
//        success:true
//     });
//    }

// app.use("/allUsers", async (req,res) => {
//    const User= sequelize.models.User;
//    const users= await User.findAll({attributes:["name","email"]});
//    console.log("All users"+JSON.stringify(users,null,2));
//    res.status(200).json({
//       success:true,
//       users:users
//    });
// })

// main();

module.exports = async (sequelize,DataTypes) => {
   const User=sequelize.define("User",{
      id:{
         type:DataTypes.UUID,
         allowNull:false,
         defaultValue:DataTypes.UUIDV4,
         primaryKey:true
      },
      name:{
         type:DataTypes.STRING,
         allowNull:false
      },
      email:{
         type:DataTypes.STRING,
         unique:true,
         allowNull:false
      },
      password:{
         type:DataTypes.STRING,
         allowNull:false
      },
      profilePicture:{
         type:DataTypes.TEXT,
         defaultValue:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2Fiwoxbb_user-profile-default-image-png-clipart-png-download%2F&psig=AOvVaw3GYKtU4B-LEgx9LHfr4fR1&ust=1591037986118000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjV9sLk3ukCFQAAAAAdAAAAABAD"
      }
   });
   User.sync();
   return User;
}
