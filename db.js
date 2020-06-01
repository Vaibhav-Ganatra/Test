const {Sequelize}= require("sequelize");
 const sequelize= new Sequelize("YOUR_DATABASE_NAME","postgres","YOUR_PASSWORD",{
   host:"localhost",
   dialect:"postgres",
   define:{
      underscored:true
   }
 });
 const db={};
 try {
   sequelize.authenticate();
   console.log('Connection to Postgres has been established successfully.');
   configureDB();
 } catch (error) {
   console.error('Unable to connect to the database:', error);
 }
 async function configureDB(){
   db.Sequelize=Sequelize;
   db.sequelize=sequelize;

   //Models
   db.users= await require("./models/user")(sequelize,Sequelize);
   db.likes =await  require("./models/like")(sequelize,Sequelize);
   db.superlikes= await require("./models/superlike")(sequelize,Sequelize);
   db.block=await require("./models/block")(sequelize,Sequelize);
   db.images= await require("./models/images")(sequelize,Sequelize);

   //Associations
   db.users.hasMany(db.images);
   db.images.belongsTo(db.users);
   db.images.hasMany(db.likes);
   db.likes.belongsTo(db.images);
   db.images.hasMany(db.superlikes);
   db.superlikes.belongsTo(db.images);
   db.users.hasMany(db.block);
   db.block.belongsTo(db.users);
 }
 module.exports=db;
