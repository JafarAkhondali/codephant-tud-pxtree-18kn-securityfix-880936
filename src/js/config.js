
namespace("PXTree.AchtzehnKnoten.Config",

{ TextStyle: { font: "normal 8pt GameFont", fill: "black" }
, Game:
	{ Width: 1024, Height: 576 }

, Events:
	{ Description:
		{ TextStyle:
			{ font: "normal 8pt GameFont"
			, fill: "white"
			, wordWrap: true
			, wordWrapWidth: 365
			, align: "align"
			}
		, Offset: [25,200]
		}
	, Button:
		{ TextStyle:
			{ font: "normal 8pt GameFont"
			, fill: "white"
			, wordWrap: true
			, wordWrapWidth: 365
			}
		, HoverTextStyle: { fill: "#ff774b" }
		, LabelOffset: [5,0]
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
	, MoveCosts:
		{ "player.food": -15
		}
	}

, Desk:
	{ Left: 576
	
	, StatPaper:
		{ TextStyle: { font : 'normal 8pt GameFont', fill: 'black' }
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
			{ font: 'normal 8pt GameFont'
			, fill: 'white'
			, wordWrap: true
			, wordWrapWidth: 81
			}
		, Morale:
			{ Offset: [270,125]
			}
		}
	}

, MainMenu:
	{ TextStyle:
		{ font: "bold 16pt GameFont"
		, fill: "white"
		}
	}

, Credits:
	{ TextStyle:
		{ font: "normal 8pt GameFont"
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
}

);
