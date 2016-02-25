# Create text search index

db.item.createIndex({ 
	'title': 'text', 
	'slogan': 'text', 
	'description': 'text' 
})

# Print information for indexes

db.item.getIndexes() 

# dropIndex()
db.item.dropIndex('title_text_slogan_text_description_text')

title_text_slogan_text_description_text

# Example query:
db.item.find({
	$text: {
		$search: 'mongodb',
		$caseSensitive: false
	}
}).pretty()