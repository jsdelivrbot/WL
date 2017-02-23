var ObjectID = require('mongodb').ObjectID;
var db = require('../db');

exports.all = function (cb) {
	
    db.get().collection('films').find().toArray(function (err, docs) {
        cb(err, docs);
    })
};

exports.findById = function (id, cb) {
	
    db.get().collection('films').findOne({_id: ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    });
};

exports.findByTitle = function (titleName, cb) {
	
    db.get().collection('films').find().toArray(function (err, docs) {
        var filtered = docs.filter(function (value) {
            return value['Title'].toLowerCase().indexOf(String(titleName)) !== - 1;
        });
        cb(err, filtered);
    })


};

exports.findByStar = function (star, cb) {

    db.get().collection('films').find().toArray(function (err, docs) {

        var filtered2 = docs.filter(function (value) {
            return value['Stars'].toLowerCase().indexOf(String(star)) !== - 1;
        });
        cb(err, filtered2);
    })

};

exports.create = function (film, cb) {

	db.get().collection('films').insert(film, function (err, result) {
		cb(err, result);
	});
	
};

exports.createBase = function (film, cb) {
	
		db.get().collection('films').insert(film, function (err, result) {
			cb(err, result);
		});

};

exports.update = function (id, newData, cb) {
	
    db.get().collection('films').updateOne(
        { _id: ObjectID(id) },
        newData,
        function (err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function (id, cb) {
	
    db.get().collection('films').deleteOne(
        { _id: ObjectID(id) },
        function (err, result) {
            cb(err, result);
        }
    );
};