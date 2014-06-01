
namespace("PXTree.AchtzehnKnoten.Data.Levels",

[ { spots:
		[ { x: 50, y: 325
			, reachable: [1, 2]
			, start: 'west'
			}
		
		, { x: 105, y: 123
			, reachable: [3]
			, event: { tags: ["open_sea"] } }
		
		, { x: 175, y: 486
			, reachable: [3], type: "island"
			, event: { tags: ["island"] } }
		
		, { x: 289, y: 257, type: "water"
			, reachable: [4, 5]
			, event: { tags: ["open_sea"] } }
		
		, { x: 408, y: 105
			, reachable: [5]
			, event: { name: "pirate_privateer" } }
		
		, { x: 477, y: 347
			, end:'south'
			, event: { tags: ["open_sea", "atlantic"] } }
		]
	}
]

);