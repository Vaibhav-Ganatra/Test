module.exports= async (sequelize,DataTypes) => {
   const like= sequelize.define("Like",{
      id:{
         type:DataTypes.UUID,
         allowNull:false,
         defaultValue:DataTypes.UUIDV4,
         primaryKey:true
      },
      image_id:{
         type:DataTypes.UUID,
         allowNull:false,
         foreignKey:true
      },
      user_name:{
         type:DataTypes.STRING,
         allowNull:false,
      }
   });
   like.sync();
   return like;
}