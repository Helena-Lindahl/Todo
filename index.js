
const express = require("express");
const mongoose = require("mongoose");
const commentRouter = require("./router/commentRouter");
const config = require("./config/config")
const app = express();
const path = require("path");
//middleware
app.use(express.urlencoded({extended:true}))

//En till middleware för CSS 
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//router 
app.use(commentRouter)

//listen to port 
const port = process.env.PORT || 8021;
const options ={
    useUnifiedTopology: true, 
    useNewUrlParser: true
}
mongoose.connect(config.databaseURL,options ).then(()=> {
    console.log("Successful on port: " + port)
    //app is listening to port 
    app.listen(port);
}).catch( (e)=>{
    console.log(e)
})

module.exports = {app}