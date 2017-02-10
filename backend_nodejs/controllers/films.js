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

exports.findById = function (req, res) {
    Films.findById(req.params.id, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
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
        "Title": req.body['Title'],
        "Release Year": req.body['Release Year'],
        'Format': req.body['Format'],
        'Stars': req.body['Stars']
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
    Films.update(req.params.id, { name: req.body.name }, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};

exports.delete = function (req, res) {
	console.log(req.params.id);
    Films.delete(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
};