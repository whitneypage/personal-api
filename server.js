var express = require('express');
var app = express();
var bodyParser = require('body-parser');



var occupations = ["Astronaut", "Chef", "Assistant to the Regional Manager"];

var mentions = ["http://www.wired.com/2015/05/tesla-batteries", "http://www.theonion.com/article/aerospace-engineers-warn-first-graders-design-for--38523"];

var references = ["Michael Scott", "Leslie Knope", "Ron Swanson"];

var skills =[
	{
		id: 1,
		name: "HTML",
		experience: "Intermediate"
	},
	{
		id: 2,
		name: "CSS",
		experience: "Intermediate"
	},
	{
		id: 3,
		name: "JavaScript",
		experience: "Beginner"
	},
	{
		id: 4,
		name: "AngularJS",
		experience: "Beginner"
	}
];







app.use(bodyParser());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS', 'GET', 'POST');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');


	next();
})


app.get("/name", function(req, res) {
	res.send({
		"name": "Page"
	})

})

app.get("/location", function(req, res) {
	res.send({
		"location": "Provo, Utah"
	})
})

app.put("/location", function(req, res) {
    res.send()
})

app.get("/hobbies", function(req, res) {
	res.send({
		"hobbies": ["running", "singing", "movies"]
	})
})

app.get("/occupations", function(req, res) {
	var desc = occupations.sort();

	if(req.query.order === "desc") {
		res.send(desc);
	}

	if (req.query.order === "asc") {
		var asc = desc.reverse();
       	res.send(asc);
	}


	res.status(200).json(occupations)
	
})

app.get("/occupations/lastest", function(req, res) {
	var lastest = occupations[occupations.length - 1];
	res.send(lastest);
})


app.get("/mentions", function(req, res) {
   res.send(JSON.stringify(mentions));
})

app.post("/mentions", function(req, res) {
 	mentions.push(req.body) 
	res.send(JSON.stringify(mentions));
})

app.get("/references", function(req, res) {
	res.send(JSON.stringify(references));
})

app.post("/references", function(req, res) {
	references.push(req.body) 
	res.send(JSON.stringify(references));
}) 


app.get("/skills", function(req, res) {
	if(req.query.experience === "Beginner") {
        var begArr = [];
        for(var i = 0; i < skills.length; i++) {
        	if (skills[i].experience === "Beginner") {
        		var x = skills[i]
        		begArr.push(x)
        	}
        }
		res.send(begArr);
	}
	if(req.query.experience === "Intermediate") {
		var intArr = [];
        for(var i = 0; i < skills.length; i++) {
        	if (skills[i].experience === "Intermediate") {
        		var x = skills[i]
        		intArr.push(x)
        	}
        }
		res.send(intArr);
	}
	res.send(JSON.stringify(skills));
})

app.post("/skills", function(req, res) {
	skills.push(req.body)
	res.send(skills)
})










app.listen(9000);