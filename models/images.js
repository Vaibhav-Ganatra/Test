module.exports = async (sequelize,DataTypes) => {
   const image=sequelize.define("Images",{
      id:{
         type:DataTypes.UUID,
         allowNull:false,
         defaultValue:DataTypes.UUIDV4,
         primaryKey:true
      },
      user_id:{
         type:DataTypes.UUID,
         allowNull:false
      },
      url:{
         type:DataTypes.TEXT,
         allowNull:false
      }
   });
   image.sync();
   return image;
}
