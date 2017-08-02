var express = require('express');
//calls the express npm that handles robust http routing.
var bodyParser = require("body-parser");
//call the body-parser npm

var app = express();
//is shorthand to access the express app

var path = require('path');
// is a built-in npm package that allows us to deliver html pages to user with "express" and routing.

var PORT = process.env.PORT || 3000;
//I could use any # as a port for my server to connect to that I choose. 
//The number selected number can be any number starting at 80 + (to an undefined astronomical number). Here I set it to 3000.
// app.listen(3000) is another way to write this - based on npm info explained on github.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// -copied from the body-parser npm page- this code allows us to collect are the requests from our user and responses from our server in a format that is easy to amend.


var characters = [{
  routeName: "yoda",
  name: "Yoda",
  role: "Jedi Master",
  age: 900,
  forcePoints: 2000
}, {
  routeName: "darthmaul",
  name: "Darth Maul",
  role: "Sith Lord",
  age: 200,
  forcePoints: 1200
}, {
  routeName: "obiwankenobi",
  name: "Obi Wan Kenobi",
  role: "Jedi Knight",
  age: 60,
  forcePoints: 1350
}];
//An array of objects, that are each of my Star Wars characters.

//==============ROUTES==================

app.get("/", function(req, res) {
res.sendFile(path.join(__dirname, "view.html"));
});

//app.get - refers to the http route assigned to the port I assigned my server to. In this case it's "http://localhost:3000"

// ("/") is the route to the root or home page

// then, function(req, res) allows 2 negotiation the request (req) - which is the route, and the response(res) that we can define within the function.

//res.send - is the command to print a response on the web page, once the route is requested

//"Welcome to the Star Wars Page!" will appear when we type http://localhost:3000 in the web browser.

app.get("/add", function(req, res) {
res.sendFile(path.join(__dirname, "add.html"));
});
// a get request that for /add that responds with "add.html"

app.get("/api/:characters?", function(req, res) {
  
  var chosen = req.params.characters;
//creates a variable of whatever characters are typed into the route "/api/_____"
  
 

  if (chosen) {
 	console.log(chosen);

for (var i = 0; i < characters.length; i++) {
	if (chosen === characters[i].routeName) {
		res.json(characters[i]);
        return;
        //"return;" terminates the function, whereas it will not proceed to the next steps
      }
    }

//if (chosen) doesn't match the for loop's if statment, then it will proceed to the following command.

	res.send("No character found");

  } else {
  	res.json(characters);
  }
   
});


//   unsure of why "/api/:characters" does what it allows us to do

// whatever we type as a request will log to the console, even if it's not any of the existing Star Wars characters. I typed "http://localhost:3000/willpower" and it console logged "willpower". 

//It looks like the protocl is to make sure the word in the route (after the : ) matches the last word in the variable (req.params.?)  and we get the same results of logging whatever we type in the route. 
//ex: "/:hiphop"  with var chose = req.params.hiphop ....will console log whatever you type into the url ["/?"] as the route extension. IT'S COMPLETELY UNRELATED TO [VAR CHARACTERS] or any other variable.

app.post("/api/new", function(req, res) {
	
//accepts post requests to this route "/api/new"
	var newCharacter = req.body;
	
//creates a new character out of the request. ".body" refers to the info the user will enter about the character's age, Force Points, etc..

	newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

//sets the routename of the character to whatever its name is in all lower case w/o any spaces

	console.log(newCharacter);

//console logs the new character

	characters.push(newCharacter);

//pushes the new character into the "characters" object array

	res.json(newCharacter);

//responds to the front end (html) with the new character object in JSON format.
});



app.get("/yoda", function (req, res){
	res.json(yoda);
});
//this takes the route at "/yoda" and responds with the yoda object in JSON format.

app.get("/darthmaul", function(req, res){
	res.json(darthmaul);
});

app.get("/obiwankenobi", function(req, res){
	res.json(obiwankenobi);
});

//=======LISTENER==================

app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});

//this function runs as soon as the file is accessed from the command line. In this case we have it printing which PORT we're listening from, but we could call write any startup commands or call any startup functions we wish.