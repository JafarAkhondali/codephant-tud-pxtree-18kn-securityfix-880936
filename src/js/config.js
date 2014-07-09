
namespace("PXTree.AchtzehnKnoten.Config",

{ TextStyle: { font: "normal 14pt GameFont", fill: "black" }
, Game: { Width: 1024, Height: 576, EventNameCacheSize: 10 }

, Labels:
	{ accept: "Aye, verstanden!"
	, confirm: "Aye, bestätige!"
	}

, LevelDifficulty:
	{ Factor: 0.25
	, Offset: 1
	, Maximum: 4
	}

, Events:
	{ Description:
		{ TextStyle:
			{ font: "normal 12pt GameFont"
			, fill: "white"
			, wordWrap: true
			, wordWrapWidth: 365
			, align: "align"
			}
		, Offset: [25,200]
		}
	, Button:
		{ TextStyle:
			{ font: "normal 11pt GameFont"
			, fill: "white"
			, wordWrap: true
			, wordWrapWidth: 365
			}
		, HoverTextStyle: { fill: "#ff774b" }
		, LabelOffset: [10,10]
		, PanelOffset: [16,300]
		, DefaultLabel: "Aye!"
		, Height: 32
		, Spacing: 2
		}
	, Dialog:
		{ Width: 414
		, Height: 400
		, Padding: [20,20]
		, Margin: [81,68]
		}
	, Drag:
		{ Threshold: 250
		, TextStyle:
			{ font: "normal 12pt GameFont"
			, fill: "white"
			}
		, ResetLabel: "Zurücksetzen"
		}
	, MoveCosts:
		{ "player.food": -15
		}
	, StatLabels:
		{ "player.name": "Name"
		, "player.morale": "Moral"
		, "player.nationality": 'british'
		, "player.gold": "Gold"
		, "player.food": "Nahrung"
		, "player.crewCount": "Mannschaft"
		, "player.strength": "Stärke"
		, "ship.speed": "Geschwindigkeit"
		, "ship.crewCapacity": "Vollbesatzung"
		}
	, PopStyles:
		{ "bonus":
			{ font: "bold 14pt GameFont"
			, strokeThickness: 1
			, fill: "#33ff55"
			, stroke: "#33ff55"
			}
		, "malus":
			{ font: "bold 14pt GameFont"
			, strokeThickness: 1
			, fill: "#ff3355"
			, stroke: "#ff3355"
			}
		}
	}

, Desk:
	{ Left: 576
	
	, StatPaper:
		{ TextStyle: { font : 'normal 11pt GameFont', fill: 'black' }
		, Offset: { x: 30, y: 30 }
		, Lines:
			{ Origin: { x: 20, y: 20 }
			, LineHeight: 40
			, LabelOffset: { x: 100, y: 10 }
			, ValueXOffset: -50
			}
		}

	, CptPanel:
		{ Origin : { x : 270, y : 20 }
		, TextStyle:
			{ font: 'normal 11pt GameFont'
			, fill: 'white'
			, wordWrap: true
			, wordWrapWidth: 81
			}
		, Morale:
			{ Offset: [270,122]
			}
		}
	}

, MainMenu:
	{ TextStyle:
		{ font: "normal 18pt GameFont"
		, fill: '#e0ab1b'
		, stroke: '#bf9218'
		, strokeThickness: 1
		}
	, Labels:
		{ NewGame: "Neues Spiel"
		, LoadGame: "Fortsetzen"
		, Credits: "Credits"
		, ExitGame: "Schließen"
		}
	}

, Credits:
	{ TextStyle:
		{ font: "normal 12pt GameFont"
		, fill: "white"
		}
	, TextArea:
		{ x: 430, y: 0
		, width: 1024 - 430
		, height: 576
		, Padding: [30, 30]
		}
	, RolesXOffset: 200
	, LineSpace: 5
	, TextYOrigin: 100
	}

, PopText:
	{ Defaults:
		{ difference: -40
		, duration: 1750
		, delay: 1000
		, easing: Phaser.Easing.Quadratic.In
		}
	}
}

);
