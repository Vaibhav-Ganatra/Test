module.exports= async (sequelize,DataTypes) => {
   const superLike= sequelize.define("SuperLike",{
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
      },
      user_image:{
         type:DataTypes.TEXT,
         allowNull:false
      }
   });
   superLike.sync();
   return superLike;
}