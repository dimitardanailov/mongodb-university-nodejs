db.grades.aggregate([
	{ $project : {
		_id: 0,
		class_id: 1,
		student_id: 1,
		scores: 1
	} },
	{ $unwind: "$scores" },
	{ $match: { "scores.type": { $ne: 'quiz' } } },
	{ $group: {
		_id: {
			'classId': '$class_id',
		},
		results: {
			$push: {
				score: '$scores.score'
			}
		},
		studentIds: {
			$push: {
				'ids': '$student_id'
			}
		},
		avgScore: {
			'$avg': '$scores.score'
		}
	}},
	{ $project: {
		students: {
            $size: '$studentIds.ids'
        },
        classScore: {
        	$sum: '$results.score'
        },
        avgScore: 1
	}},
	{ $sort: { avgScore: -1 } },
	{ $limit: 1 }
]).pretty()