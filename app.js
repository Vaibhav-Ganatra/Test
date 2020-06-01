const express= require("express");
const app=express();

const bodyParser= require("body-parser");
app.use(bodyParser.json());

const morgan= require("morgan");
app.use(morgan("dev"));

const db= require("./db");
app.use((req,res,next) => {
   req.db=db;
   next();
});

const User= require("./routes/users");
app.use("/users",User);
const images= require("./routes/images");
app.use("/images",images);
const like= require("./routes/lke");
app.use("/like",like);
const superLike= require("./routes/superlike");
app.use("/superlike",superLike);
const block= require("./routes/block");
app.use("/block", block);
const login=require("./routes/login");
app.use("/login",login);

const http=require("http");
const server= http.createServer(app);
server.listen(3000,(err) =>{
   if(err)
      console.log(err);
   else
      console.log("Server running");
});