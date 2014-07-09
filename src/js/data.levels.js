

namespace("PXTree.AchtzehnKnoten.Data.Levels",


[//0
 { coast: 181
	 , coastDistance: 0.1
	 , spots:
		[ { x: 484, y: 125
			, reachable: [1, 2]
			, start: { dir: 'east' }
			}
		
		, { x: 300, y: 240
			, reachable: [4]
			, type: 'water'
			, event: { tags: ["open_sea", "atlantic"] }
			}
		
		, { x: 420, y: 400
			, reachable: [3], type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			}
		
		
		, { x: 180, y: 450
			, end: { dir: 'south', to: 3 }
			, type: 'water'
			, event: { name: "ship_ahoy_pirate" }
			}
		
		, { x: 100, y: 300
			, end: { dir: 'west', to: 1 }
			, type: 'water'
			, event: { tags: ["open_sea", "atlantic"] }
			}
		]
	}
//1
, { spots:
		[ { x: 510, y: 300
			, reachable: [1]
			, type: 'water'
			, start: { dir: "east" }
			, event: { tags: ["open_sea", "atlantic"] }
			}

		, { x: 390, y: 270 
			, reachable: [2, 3]
			, type: 'atoll'
			, event: { name: "azores" }
			}

		, { x: 300, y: 170
			, reachable: [3, 4]
			, type: 'water'
			, event: { tags: ["open_sea", "atlantic"] }
			}

		, { x: 260, y: 480
			, type: "water"
			, end: { dir: 'south', to: 4 }
			, event: { tags: ["open_sea", "atlantic"] }
			}
			
			, { x: 100, y: 140
			, type: "water"
			, end: { dir: 'west', to: 2 }
			, event: { tags: ["open_sea", "atlantic"] }
			}
		]
	}

//2
, { coast: 20
	, spots:
		[ { x: 480, y: 220
			, reachable: [1, 3]
			, type: 'water'
			, start: { dir: 'east'}
			, event: { tags: ["open_sea", "atlantic"] }
			}
		
		, { x: 300, y: 330
			, reachable: [2]
			, type: 'water'
			, event: { tags: ["open_sea", "atlantic"] }
			}
			
		, { x: 240, y: 480
			, type: 'water'
			, event: { tags: ["open_sea", "atlantic"] }
			, end: { dir: 'south', to: 5 }
			}
		
		, { x: 190, y: 150
			, type: 'island'
			, event: { name: "newfoundland" }
			, reachable: [2]
			, end: { dir: 'west', found: 'labrador' }
		}
		]
	}

//3
, { coast: 215
	, coastDistance: 0
	, spots:
	
		[ { x: 222, y: 84
			, reachable: [1]
			, type: 'water'
			, start: { dir: 'north'}
			, event: { tags: ["open_sea", "atlantic"] }
			}
			
		, { x: 266, y: 286
			, reachable: [2, 3]
			, type: "island"
			, event: { name: "lanzarote" }
			}
			
		, { x: 90, y: 275
			, type: "atoll"
			, event: { tags: ["island", "atlantic"] }
			, end: { dir: "west", to: 4 }
		}
		, { x: 190, y: 470
			, type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			, end: { dir: "south", to: 10 }
		}
			
		]
	}
	
//4
, { spots: 
		[ { x: 370, y: 60 
			, start: { dir: 'north'}
			, event: { tags: ["open_sea", "atlantic"] }
			, type: 'water'
			, reachable: [2]
			}
			
		, { x: 500, y: 240 
			, start: { dir: 'east'}
			, event: { tags: ["open_sea", "atlantic"] }
			, type: 'water'
			, reachable: [2]
			}
		
		, { x: 272, y: 350
			, event: { tags: ["open_sea", "atlantic"] }
			, type: 'water'
			, reachable: [3, 4]
		}
		
		, { x: 136, y: 246
			, type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			, end: { dir: "west", to: 5 }
		}
		
		, { x: 250, y: 500
			, type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			, end: { dir: "south", to: 9 }
		}
			
		]
	}
//5
, { spots: 
		[ { x: 510, y: 270 
			, start: { dir: 'east'}
			, event: { tags: ["open_sea", "atlantic"] }
			, type: 'water'
			, reachable: [1]
			}
			
		, { x: 416, y: 392 
			, event: { tags: ["open_sea", "atlantic"] }
			, type: 'water'
			, reachable: [2]
			}
		
		, { x: 214, y: 316
			, event: { tags: ["open_sea", "atlantic"] }
			, type: 'water'
			, reachable: [3, 4]
		}
		
		, { x: 100, y: 270
			, type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			, end: { dir: "west", to: 6 }
		}
		
		, { x: 200, y: 500
			, type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			, end: { dir: "south", to: 8 }
		}
		
		, { x: 220, y: 90
			, type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			, start: { dir: 'north' }
			, reachable: [2]
			}
		]
	}

//6
, {	tags: ["carribean"]
	, coast: 30
	, spots:
		[ 
		{ x: 490, y: 230
			, type: "water"
			, start: { dir: 'east' }
			, reachable: [1]
		}
		
		, { x: 260, y: 190
			, type: "water"
			, reachable: [2, 3]
		}
		
		, { x: 110, y: 330
			, type: "island"
			, reachable: [3, 4]
		}
		
		, { x: 200, y: 460
			, type: "atoll"
			, reachable: [4]
		}
		
		, { x: 350, y: 500
			, type: "atoll"
			, end: { dir: "south", to: 7 }
		} 
		]
	}
//7
, {	tags: ["carribean"]
	, coast: 270
	, coastDistance: 0.06
	, spots:
		[ 
		{ x: 275, y: 70
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1]
		}
		
		, { x: 260, y: 260
			, type: "water"
			, reachable: [2]
			, end: { dir: "south", found: "latin_america" }
		}
		
		, { x: 450, y: 300
			, type: "atoll"
			, end: { dir: "east", to: 8 }
		}
		]
	}
	
//8
, {	tags: ["carribean"]
	, coast: 280
	, coastDistance: 0.08
	, spots:
		[ 
		{ x: 270, y: 80
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1]
		}
		
		, { x: 360, y: 215
			, type: "water"
			, reachable: [2]
		}
		
		, { x: 460, y: 400
			, type: "water"
			, end: { dir: "east", to: 9 }
		}
		
		, { x: 90, y: 280
			, type: 'water'
			, start: { dir: 'west' }
			, reachable: [4]
		}
		
		, { x: 250, y: 360
			, type: 'water'
			, reachable: [2]
			, end: { dir: "south", found: "latin_america" }
		}
		]
	}
	
//9
, {	tags: ["atlantic"]
	, spots:
		[ 
		{ x: 200, y: 100
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [2]
		}
		
		, { x: 135, y: 333
			, type: "water"
			, start: { dir: 'west' }
			, reachable: [2]
		}
		
		, { x: 320, y: 360
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 460, y: 460
			, type: 'water'
			, end: { dir: 'south', to: 12 }
		}
		]
	}
	
//10
, {	tags: ["atlantic"]
	, coast: 140
	, coastDistance: -0.0
	, spots:
		[ 
		{ x: 180, y: 120
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1,2]
		}
		
		, { x: 100, y: 320
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 275, y: 275
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 360, y: 470
			, type: 'water'
			, end: { dir: 'south', to: 13 }
		}
		]
	}
]

);
