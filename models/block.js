module.exports= async (sequelize,DataTypes) => {
   const block= sequelize.define("Block",{
      id:{
         type:DataTypes.UUID,
         allowNull:false,
         defaultValue:DataTypes.UUIDV4,
         primaryKey:true
      },
      user_id:{
         type:DataTypes.UUID,
         allowNull:false,
         foreignKey:true
      },
      blocked_id:{
         type:DataTypes.UUID,
         allowNull:false
      }
   });
   block.sync();
   return block;
}