db.companies.aggregate( [
    { $match: { "relationships.person": { $ne: null } } },
    { $project: { 
    	_id: 0,
    	relationships: 1, 
    	name: 1,
    } },
    { $unwind: "$relationships" },
    { $group: {
        _id: {
        	person: "$relationships.person"
        },
        uniqueCompanies: {
        	$addToSet: "$name"
        },
    } },
    { $match: { "_id.person.permalink": 'eric-di-benedetto' } },
    { $project: {
        uniqueCompanies: 1,
        size: {
            $size: '$uniqueCompanies'
        }
    } }
] ).pretty()