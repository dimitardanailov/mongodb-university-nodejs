const MongoClient = require('mongodb').MongoClient,
			assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {
		assert.equal(err, null);
		console.log("Successfully connected to MongoDB.");

		const query = { "category_code": "biotech" };
		const projection = { "name": 1, "category_code": 1, "_id": 0 };

		const cursor = db.collection('companies').find(query);
		// Add a projection to query.
		cursor.project(projection);

		cursor.forEach(
			function(doc) {
				console.log(doc.name + " is a " + doc.category_code + " company.");
				console.log(doc);
			},
			function(err) {
				assert.equal(err, null);

				return  db.close();
			}
		);
});
