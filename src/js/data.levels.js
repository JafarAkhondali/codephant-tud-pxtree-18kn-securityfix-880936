

namespace("PXTree.AchtzehnKnoten.Data.Levels",


[//0
 { spots:
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
, { spots:
		[ { x: 480, y: 220
			, reachable: [1]
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
		]
	}

//3
, { spots:
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
]

);
