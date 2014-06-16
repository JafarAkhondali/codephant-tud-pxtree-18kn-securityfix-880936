
namespace("PXTree.AchtzehnKnoten.Config",

{ TextStyle: { font: "normal 12pt sans-serif", fill: "black" }
, Game:
	{ Width: 1024, Height: 576 }

, Events:
	{ Description:
		{ TextStyle:
			{ font: "normal 12pt sans-serif"
			, fill: "white"
			, wordWrap: true
			, wordWrapWidth: 476
			, align: "center"
			}
		}
	, Button:
		{ TextStyle:
			{ font: "normal 12pt sans-serif"
			, fill: "white"
			, wordWrap: true
			, wordWrapWidth: 461
			}
		, HoverTextStyle: { fill: "#ff774b" }
		, LabelOffset: { x: 15, y: 0 }
		, DefaultLabel: "Aye!"
		, Height: 64
		, Spacing: 5
		}
	, Dialog:
		{ Width: 516
		, Height: 516
		, Padding: 20
		, Margin: 30
		}
	}

, Desk:
	{ Left: 576
	
	, StatPaper:
		{ TextStyle: { font : 'normal 12pt sans-serif', fill: 'black' }
		, Offset: { x: 10, y: 10 }
		, Lines:
			{ Origin: { x: 30, y: 40 }
			, LineHeight: 50
			, LabelOffset: { x: 42, y: 10 }
			, ValueXOffset: 105
			}
		}

	, CptPanel:
		{ Origin : { x : 270, y : 20 }
		, TextStyle: { font: 'normal 12pt sans-serif', fill: 'white' }
		}
	}

, MainMenu:
	{ TextStyle:
		{ font: "bold 20pt sans-serif"
		, fill: "white"
		}
	}
}

);