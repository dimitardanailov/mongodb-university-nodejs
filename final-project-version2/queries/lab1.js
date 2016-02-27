db.item.aggregate([
	{ 	
		$project: {
			_id: 1,
			title: 1,
			category: 1
		} 
	}, 
	{ 
		$group: {
			_id: '$category',
			num: { $sum: 1 }
		} 
	}, 
	{
		$project: {
			_id: 1,
			num: 1
		}
	},
	{
		$sort: { _id : 1}
	}
]).pretty()