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
			
			//Function to modify the string, this string will eventually replace input as the object sent over to index.ejs
			var str = {
				type: [],
				model: [],
				price: []
			};


			// console.log(str.price[1]);

			for(var i = 1; i < input.length; i++)
			{
				// test
				// console.log(input[i]);
				var firstTypeIndex = input[i].indexOf('[') + 1;
				var secondTypeIndex = input[i].indexOf(']');
				str.type.push(input[i].substring(firstTypeIndex,secondTypeIndex));

				//sometimes users do not add $ and this creates a bad object. Will have to account for this later
				var firstModelIndex = input[i].indexOf(']') + 2
				var secondModelIndex = input[i].indexOf('$') - 3;
				str.model.push(input[i].substring(firstModelIndex,secondModelIndex));

				var firstPriceIndex = input[i].indexOf('$')+1
				//crap how do I know where the price ends
				// var secondPriceIndex = input[i].

			}

			console.dir(str.model);

			//send the object
			res.render('index.ejs',{items: input})
		}

		topPosts = redditAuth.getSubreddit('buildapcsales').getHot().map(post => post.title).then(function(data){logmystuff(data)});
})