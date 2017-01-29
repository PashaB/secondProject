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
				//IMPORTANT
				// NAME YOUR VARIABLES SOMETHING NOT GENERIC CHANGE YOUR OBJECT FROM STR WHAT ARE YOU A PLEB
				//ALSO 
				//WHEN YOU PARSE THE STRING, REMOVE THAT PART FROM THE STRING. GOT THE TYPE? REMOVE TYPE FROM THE STRING
				//DONT BE A PLEB
				//MINIMIZE EVERYTHING.There's no reason to read the entire string. If you read that part of the string
				//and processed it, delete it. Make sure to trim again after you substring!

				input[i] = input[i].replace(/ /g,''); //Replace all whitespace


				var firstTypeIndex = input[i].indexOf('[') + 1;
				var secondTypeIndex = input[i].indexOf(']');

				str.type.push(input[i].substring(firstTypeIndex,secondTypeIndex));
				console.dir(input[i].substring(firstTypeIndex,secondTypeIndex))

				//sometimes users do not add $ and this creates a bad object. Will have to account for this later

				var firstModelIndex = input[i].indexOf(']')+1;
				var secondModelIndex = input[i].indexOf('$')-1;

				str.model.push(input[i].substring(firstModelIndex,secondModelIndex));
				console.dir(input[i].substring(firstModelIndex,secondModelIndex))

				var firstPriceIndex = input[i].indexOf('$')+1
				var secondPriceIndex = input[i].indexOf('(');

				str.price.push(input[i].substring(firstPriceIndex,secondPriceIndex));
				console.dir(input[i].substring(firstPriceIndex,secondPriceIndex));
				//crap how do I know where the price ends. !! All the titles have (discount calculation) after the price.
				//Find the first instance of '('. The characters before that are the price. Some titles have no '(' or ')'.
				// If that's the case just use the rest of the string.
				// if( input[i].)
				// var secondPriceIndex = input[i].

				//Eventually send model/product name/number to amazon api to reliably find the same product. 
				//Then update the price with the amazon price. Then we can graph it. 

				// 1/29/17 I think you really need to remove the part of the string processed, and then remove white spaces. Products with
				//removed whitespaces are hard to read and may be problematic to search.



			}

			console.dir(str);


			//send the object
			res.render('index.ejs',{items: input})
		}

		topPosts = redditAuth.getSubreddit('buildapcsales').getHot().map(post => post.title).then(function(data){logmystuff(data)});
})