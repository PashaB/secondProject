//first test
console.log("Let's connect to the reddit API");

//Using express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const snoowrap = require('snoowrap');
const env = require('./env')

var topPosts;
//Testing out request
// var request = require('request');

// request('http://www.purple.com', (err,res,body) => {
// 	if(!err && res.statusCode == 200) {
// 		console.log(body);
// 	}
// })

//Testing out snoowrap gonna try to auth
const redditAuth = new snoowrap({
  userAgent: env.userAgent,
  clientId: env.clientId,
  clientSecret: env.clientSecret,
  username: env.username,
  password: env.password
});



app.set('view engine','ejs')

app.listen(3000, function() {
	console.log("listening on 3000");
})

app.get('/', (req,res) => {
		
		var logmystuff = function(input) {
			console.dir(input);
			res.render('index.ejs',{items: input})
		}

		topPosts = redditAuth.getSubreddit('buildapcsales').getHot().map(post => post.title).then(function(data){logmystuff(data)});
})