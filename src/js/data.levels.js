

namespace("PXTree.AchtzehnKnoten.Data.Levels",


[//0
  { section: [7, 3]
	 , tags: ["atlantic"]
	 , coast: 181
	 , coastDistance: -0.3
	 , spots:
		[ { x: 484, y: 125
			, reachable: [1, 2]
			, start: { dir: 'east' }
			}
		
		, { x: 300, y: 240
			, reachable: [4]
			, type: 'water'
			}
		
		, { x: 420, y: 400
			, reachable: [3], type: "water"
			, event: { tags: ["open_sea", "atlantic"] }
			}
		
		
		, { x: 180, y: 450
			, end: { dir: 'south', to: 3 }
			, type: 'water'
			}
		
		, { x: 100, y: 300
			, end: { dir: 'west', to: 1 }
			, type: 'water'
			}
		]
	}
//1
, { section: [6, 3]
	, tags: ["atlantic"]
	, spots:
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
			, reachable: [4, 5]
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
			
			, { x: 200, y: 250
			, type: "water"
			, reachable: [3, 4]
			}
		]
	}

//2
, { section: [5, 3]
	, coast: 20
	, coastDistance: -0.35
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
, { section: [7, 4]
	,coast: 210
	, coastDistance: -0.3
	, tags: ["atlantic", "arid"]
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
, { section: [6, 4]
	,spots: 
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
, { section: [5, 4]
	,spots: 
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
, { section: [4, 4]
	,tags: ["carribean"]
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
, { section: [4, 5]
	,tags: ["carribean", "tropic"]
	, coast: 285
	, coastDistance: -0.3
	, spots:
		[ 
		{ x: 275, y: 70
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1,3]
		}
		
		, { x: 260, y: 300
			, type: "water"
			, reachable: [2]
			, end: { dir: "south", found: "latin_america" }
		}
		
		, { x: 450, y: 370
			, type: "atoll"
			, end: { dir: "east", to: 8 }
		}
		
		, { x: 420, y: 160
			, type: "island"
			, reachable: [2]
		}
		]
	}
	
//8
, { section: [5, 5]
	,tags: ["carribean", "tropic"]
	, coast: 275
	, coastDistance: -0.3
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
, { section: [6, 5]
	,tags: ["atlantic"]
	, spots:
		[ 
		{ x: 200, y: 100
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [5]
		}
		
		, { x: 135, y: 333
			, type: "water"
			, start: { dir: 'west' }
			, reachable: [2]
		}
		
		, { x: 320, y: 400
			, type: "water"
			, reachable: [3,4]
		}
		
		, { x: 460, y: 460
			, type: 'water'
			, end: { dir: 'south', to: 12 }
		}
		
		, { x: 430, y: 240
			, type: 'water'
			, end: { dir: 'east', to: 10 }
		}
		
		, { x: 210, y: 200
			, type: 'water'
			, reachable: [2,4]
		}
		]
	}
	
//10
, { section: [7, 5]
	,tags: ["atlantic", "arid"]
	, coast: 140
	, coastDistance: -0.3
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
			, start: { dir: 'west' }
		}
		
		, { x: 275, y: 275
			, type: "water"
			, reachable: [3, 4]
		}
		
		, { x: 360, y: 470
			, type: 'water'
			, reachable: [4]
			, end: { dir: 'south', to: 13 }
		}
		
		, { x: 460, y: 450
			, type: 'water'
			, end: { dir: 'east', to: 11 }
		}
		]
	}
	
//11
, { section: [8, 5]
	,tags: ["atlantic", "arid"]
	, coast: 135
	, coastDistance: -0.6
	, spots:
		[ 
		{ x: 120, y: 280
			, type: "water"
			, start: { dir: 'west' }
			, reachable: [1,2]
		}
		
		, { x: 240, y: 350
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 150, y: 450
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 280, y: 460
			, type: 'water'
			, end: { dir: 'south', to: 14 }
		}
		]
	}
	
//12
, { section: [6, 6]
	,tags: ["atlantic", "tropic"]
	, coast: 20
	, coastDistance: -0.4
	, spots:
		[ 
		{ x: 415, y: 123
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1,2]
		}
		
		, { x: 300, y: 240
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 420, y: 260
			, type: "water"
			, start: { dir: 'east' }
			, reachable: [4]
		}
		
		, { x: 280, y: 460
			, type: 'water'
			, end: { dir: 'south', to: 16 }
		}
		, { x: 414, y: 430
			, type: 'water'
			, reachable: [3]
		}
		]
	}
	
//13
, { section: [7, 6]
	,tags: ["atlantic"]
	, spots:
		[ 
		{ x: 80, y: 252
			, type: "water"
			, end: { dir: 'west', to: 12 }
		}
		
		, { x: 200, y: 390
			, type: "island"
			, reachable: [2]
			, event: { name: "helena" }
		}
		
		, { x: 330, y: 480
			, type: "water"
			, end: { dir: 'south', to: 17 }
		}
		
		, { x: 270, y: 60
			, type: 'water'
			, start: { dir: 'north' }
			, reachable: [4]
		}
		, { x: 210, y: 220
			, type: 'water'
			, reachable: [0,1,5]
		}
		
		, { x: 360, y: 260
			, type: 'water'
			, reachable: [6]
		}
		
		, { x: 480, y: 225
			, type: 'water'
			, end: { dir: 'east', to: 14 }
		}
		]
	}
	
//14
, { section: [8, 6]
	, tags: ["atlantic", "arid"]
	, coast: 170
	, coastDistance: -0.44
	, spots:
		[ 
		{ x: 190, y: 80
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1]
		}
		
		, { x: 250, y: 200
			, type: "water"
			, reachable: [2]
		}
		
		, { x: 270, y: 350
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 210, y: 480
			, type: 'water'
			, end: { dir: 'south', to: 18 }
		}
		, { x: 90, y: 240
			, type: 'water'
			, start: { dir: 'west' }
			, reachable: [5]
		}
		
		, { x: 160, y: 310
			, type: 'water'
			, reachable: [2]
		}
		]
	}
	
//15
, { section: [5, 7]
	, tags: ["atlantic"]
	, coast: 45
	, coastDistance: -0.05
	, spots:
		[ 
		{ x: 450, y: 130
			, type: "water"
			, start: { dir: 'east' }
			, reachable: [1, 2]
		}
		
		, { x: 320, y: 260
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 450, y: 350
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 313, y: 390
			, type: 'water'
			, reachable: [4]
		}
		, { x: 180, y: 480
			, type: 'water'
			, end: { dir: 'south', to: 19}
		}
		
		]
	}
	
//16
, { section: [6, 7]
	, tags: ["atlantic"]
	, spots:
		[ 
		{ x: 260, y: 100
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1]
		}
		
		, { x: 240, y: 260
			, type: "water"
			, reachable: [2,3]
		}
		
		, { x: 100, y: 330
			, type: "water"
			, end: { dir: 'west', to: 15 }
		}
		
		, { x: 260, y: 460
			, type: 'water'
			, reachable: [2]
			, end: { dir: 'south', to: 20 }
		}
		, { x: 400, y: 390
			, type: 'water'
			, reachable: [3]
		}
		
		, { x:460, y: 280
			, type: 'water'
			, reachable: [4]
			, start: { dir: 'east' }
		}
		
		]
	}
	
//17
, { section: [7, 7]
	, tags: ["atlantic"]
	, spots:
		[ 
		{ x: 300, y: 90
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1]
		}
		
		, { x: 210, y: 220
			, type: "water"
			, reachable: [2,4]
		}
		
		, { x: 340, y: 300
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 480, y: 310
			, type: 'water'
			, end: { dir: 'east', to: 18 }
		}
		, { x: 200, y: 380
			, type: 'water'
			, reachable: [5]
		}
		
		, { x:80, y: 420
			, type: 'water'
			, reachable: [4]
			, end: { dir: 'west', to: 16 }
		}
		
		]
	}
	
//18
, { section: [8, 7]
	, coast: 152
	, coastDistance: -0.3
	, tags: ["atlantic", "arid"]
	, spots:
		[ 
		{ x: 260, y: 100
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [2]
		}
		
		, { x: 100, y: 300
			, type: "water"
			, reachable: [2]
			, start: { dir: 'west' }
		}
		
		, { x: 260, y: 230
			, type: "water"
			, reachable: [3, 4]
		}
		
		, { x: 280, y: 400
			, type: 'water'
			, reachable: [5]
		}
		, { x: 420, y: 275
			, type: 'water'
			, reachable: [5]
		}
		
		, { x:430, y: 430
			, type: 'water'
			, end: { dir: 'east', to: 25 }
		}
		
		]
	}


//19
, { section: [5, 8]
	, coast: 15
	, coastDistance: 0.3
	, tags: ["atlantic", "tropic"]
	, spots:
		[ 
		{ x: 300, y: 90
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [2]
		}
		
		, { x: 480, y: 230
			, type: "water"
			, reachable: [2]
			, start: { dir: 'east' }
		}
		
		, { x: 330, y: 215
			, type: "water"
			, reachable: [4,3]
		}
		
		, { x: 350, y: 360
			, type: 'water'
			, reachable: [5]
		}
		, { x: 200, y: 280
			, type: 'water'
			, reachable: [5]
		}
		
		, { x:190, y: 444
			, type: 'island'
			, end: { dir: 'west', found: "fireland" }
		}
		
		]
	}
	
//20
, { section: [6, 8]
	, tags: ["atlantic"]
	, spots:
		[ 
		{ x: 280, y: 100
			, type: "water"
			, start: { dir: 'north' }
			, reachable: [1,4]
		}
		
		, { x: 290, y: 260
			, type: "water"
			, reachable: [2]
		}
		
		, { x: 200, y: 350
			, type: "water"
			, reachable: [3]
		}
		
		, { x: 70, y: 330
			, type: 'water'
			, end: { dir: 'west', to: 19 }
		}
		
		, { x: 480, y: 240
			, type: 'water'
			, reachable: [5]
		}
		
		, { x:460, y: 400
			, type: 'water'
			, reachable: [6]
		}
		
		, { x: 290, y: 480
			, type: 'island'
			, reachable: [2]
			, event: { name: 'southgeorgia' }
		}
		
		]
	}

]

);
