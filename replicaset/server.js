const MongoClient = require('mongodb').MongoClient;

const connectionString = 'mongodb://localhost:30001, localhost:30002, localhost:30003/course';

MongoClient.connect(connectionString, function(err, db) {

	if (err) throw err;

	db.collection('repl').insert({ 'x': 1 }, function(err, doc) {
		if (err) throw err;

		db.collection('repl').findOne({ 'x': 1}, function(err, doc) {
			if (err) throw err;

			console.log(doc);

			db.close();
		});
	});
});
