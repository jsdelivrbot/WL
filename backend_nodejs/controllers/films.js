var Films = require('../models/films');

exports.all = function (req, res) {
    Films.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

var start = 0;
var end = 1;

exports.next = function (req, res) {
    Films.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        
		if (docs.length < end) {
			return
		} else {
			res.send(docs.slice(start, end));
			start = end;
			end += 1;
		}
    })
};

exports.reset = function (req, res) {
	
    Films.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
		start = 0;
		end = 1;
    })
};

exports.findById = function (req, res) {
	
    Films.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
		console.log(doc)
        res.send(doc);
    })
};

exports.findByTitle = function (req, res) {

    Films.findByTitle(req.params.title, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
};

exports.findByStar = function (req, res) {

    Films.findByStar(req.params.star, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
};

exports.create = function (req, res) {
	
	var film = {
        "Title": req.body.title,
        "Release Year": req.body.releaseYear,
        'Format': req.body.format,
        'Stars': req.body.stars
    };

    Films.create(film, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(film);
    })
};


exports.createBase = function (req, res) {	
	
	let arrFilms = req.body.map((element, i) => {
		return {
			"Title": element['Title'],
			"Release Year": element['Release Year'],
			'Format': element['Format'],
			'Stars': element['Stars']
    	};
		
		
	})
		Films.create(arrFilms, function (err, result) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send(arrFilms);
    	})
	
};

exports.update = function (req, res) {
	
	var filmUpdate = {
			"Title": req.body.titleValue,
			"Release Year": req.body.releaseYearValue,
			"Format": req.body.formatValue,
			"Stars": req.body.starsValue
    	};

    Films.update(req.params.id, filmUpdate , function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.delete = function (req, res) {
    Films.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};