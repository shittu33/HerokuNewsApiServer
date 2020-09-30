const express = require("express");
const bodyParser = require("body-parser");
const querystring = require('querystring');
const NewsAPI = require('newsapi');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ id:2
  	,message: "This Api serve as a bridge for rest-api"
  	});
});

// simple route
app.get("/news", (req, res) => {
if (req.query.apiKey==undefined) {
	res.json({  	
			message: "Required a valid API key from http://newsapi.org/"  
	  	 })		
}
var newsapi = new NewsAPI(req.query.apiKey);
newsapi.v2.topHeadlines({
  // sources: 'bbc-news,the-verge',
  q: 'bitcoin',
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  res.json(response);
  console.log(response);
});
});

// Top headline query
  // sources: 'bbc-news,the-verge',
app.get("/top-headlines/:category", (req, res) => {
 //  res.json({ id:2
 //  	,message: "category is " +req.params.category 
 //  	 }); 
if (req.query.apiKey==undefined) {
	res.json({  	
			message: "Required a valid API key from http://newsapi.org/"  
	  	 })		
}
	var newsapi = new NewsAPI(req.query.apiKey);
	newsapi.v2.topHeadlines({
	  category: req.params.category,
	}).then(response => {
	  res.json(response);
	  console.log(response);
	});
});


// Top headline query
  // sources: 'bbc-news,the-verge',
app.get("/top-headlines/", (req, res) => {
  // res.json({ id:2
  	// ,message: "category is " +req.query.category +" and country is " +req.query.country  
  	 // });undefined
if (req.query.apiKey==undefined) {
	res.json({  	
			message: "Required a valid API key from http://newsapi.org/"  
	  	 })		
}
	 var newsapi = new NewsAPI(req.query.apiKey);
  	 var countr=req.query.country;
  	 var source =req.query.sources;
  	 var limit =req.query.pageSize;
  	 var cat = req.query.category;
	newsapi.v2.topHeadlines({
	  category: source==undefined?cat:null,
	  country: source==undefined?countr:null,
	  sources: source,
	  pageSize:limit!=undefined?limit:600,
	  language:req.query.language,
	}).then(response => {
	  res.json(response);
	  console.log(response);
	});
});

// Sources query
// To query sources
// All options are optional
app.get("/sources", (req, res) => {
if (req.query.apiKey==undefined) {
	res.json({  	
			message: "Required a valid API key from http://newsapi.org/"  
	  	 })		
}
var newsapi = new NewsAPI(req.query.apiKey);
newsapi.v2.sources({
  category: req.query.category,
  country: req.query.country,
  language:req.query.xlanguage,
}).then(response => {
	  res.json(response);
  console.log(response);
});
});


// Everythign query
// To query /v2/everything
// You must include at least one q, source, or domain
app.get("/everything", (req, res) => {
	if (req.query.apiKey==undefined) {
	res.json({  	
			message: "Required a valid API key from http://newsapi.org/"  
	  	 })		
	}
	 var newsapi = new NewsAPI(req.query.apiKey);
	 var countr=req.query.country;
  	 var source =req.query.sources;
  	 var limit =req.query.pageSize;
  	 var cat = req.query.category;
  	 var from=req.query.from;
  	 var to=req.query.to;
newsapi.v2.everything({
  q: req.query.q,
  category: source==undefined?cat:null,
  country: source==undefined?countr:null,
  sources: source,
  pageSize:limit!=undefined?limit:90,
  language:req.query.language,
  domains:req.query.domains,
  from: from!=undefined?from:null,
  to: to!=undefined?to:null,
}).then(response => {
 res.json(response);
  console.log(response);
});
});


// set port, listen for requests
// app.listen(3000, () => {
//   console.log("Server is running on port 3000.");
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
