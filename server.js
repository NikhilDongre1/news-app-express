const express = require("express");
const axios = require("axios");
const app = express();


app.use(express.static('public'));
app.use('/stylesheet',express.static(__dirname + 'public/stylesheet'));
app.use('/images',express.static(__dirname + 'public/images'));
app.use('/javascript',express.static(__dirname + 'public/javacript'));

app.set("views","./src/views/partials")
app.set("view engine","ejs");


//router
const newsRouter = require("./src/routes/news");
app.use("/",newsRouter);


app.listen(3000,()=>{
    console.log("server started 3000");

});
//29