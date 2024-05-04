const express = require("express");
const axios = require("axios");
const newsRouter = express.Router();  


const currentDate = new Date().toISOString().split('T')[0];
const fromDate  = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; 
const apiKey = '1dd4907c53134c0c9732a81f07939afc';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&from=${fromDate}&sortBy=popularity&apiKey=${apiKey}`;
let news;
newsRouter.get('/',async(req,res)=>{
    try{
        news = await axios.get(apiUrl);
        const response = news.data;
        res.render("news",{news:response});
        // res.send(response);
    }
    catch(error){
        if(error.response){
            res.render("news",{news:null});
            console.log(error.response.data);
            console.log(error.response.status);
            
        }
        else if(error.request){
            res.render("news",{news:null});
            console.log(error.request);
        }
        else{
            res.render("news",{news:null});
            console.log("error message: ",error.message);
        }
        
        
    }
})
newsRouter.get('/:category', async (req,res)=>{
    const categoryApi = `https://newsapi.org/v2/everything?q=${req.params['category']}&searchIn=content&sortBy=relevancy&apiKey=${apiKey}`;
    try{
        const news = await axios.get(categoryApi);
        const response = news.data;
        res.render("news",{news:response});
        // console.log(req.params['category']);
        // console.log(categoryApi);
    }
    catch(error){
        if(error.response){
            res.render("news",{news:null});
            console.log(error.response.data);
            console.log(error.response.status);
            
        }
        else if(error.request){
            res.render("news",{news:null});
            console.log(error.request);
        }
        else{
            res.render("news",{news:null});
            console.log("error message: ",error.message);
        } 
        
    }
});

newsRouter.post('/',express.urlencoded({ extended: true }),async(req,res)=>{
    
    const searchQuery = req.body.search;
   
     //actual format , %%... endcoded.
    
    const searchApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&from=2024-04-04&to=${currentDate}&language=en&sortBy=popularity&apiKey=${apiKey}`;
    try{
        news = await axios.get(searchApiUrl);
        const response = news.data;
        res.render("news",{news:response});
        // res.send(response);
        // console.log(searchApiUrl);
    }
    catch(error){
        if(error.response){
            res.render("news",{news:null});
            console.log(error.response.data);
            console.log(error.response.status);
            // console.log(searchApiUrl);
        }
        else if(error.request){
            res.render("news",{news:null});
            console.log(error.request);
            // console.log(searchApiUrl);
        }
        else{
            res.render("news",{news:null});
            console.log("error message: ",error.message);
        }
        
        
    }
})




module.exports = newsRouter;