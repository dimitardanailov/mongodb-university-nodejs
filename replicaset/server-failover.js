const MongoClient = require('mongodb').MongoClient;

const connectionString = 'mongodb://localhost:30001, localhost:30002, localhost:30003/course';

MongoClient.connect(connectionString, function(err, db) {

	if (err) throw err;

	var documentNumber = 0;

	function insertDocument() {
		db.collection('repl').insert({ 'documentNumber': documentNumber++ }, function(err, doc) {
			if (err) throw err;

			console.log(doc);
		});

		console.log('Dispatched insert');
		setTimeout(insertDocument, 1000);
	}

	insertDocument();
});
