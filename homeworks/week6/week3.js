db.companies.aggregate([
	{ $match: { 
		$and: [
			{ "founded_year": 2004, },
			{ "funding_rounds.4": { $exists: true }, 
			},
		]
	} },
	{ $project : {
		_id: 1,
		name: 1,
		funding_rounds: 1
	} },
	{ $unwind: "$funding_rounds" },
	{ $group: {
		_id: '$name',
		raised: {
			$push: {
				amount: '$funding_rounds.raised_amount'
			}
		},
		avgFunding: {
			'$avg': '$funding_rounds.raised_amount'
		},
		rounds: { $sum: 1 }
	} },
	{ $project: {
		_id: 1,
		rounds: 1,
		avgFunding: 1,
        total: {
        	$sum: '$raised.amount'
        }
	}},
	{ $sort: { avgFunding: 1 } },
	{ $limit: 1 }
] ).pretty()