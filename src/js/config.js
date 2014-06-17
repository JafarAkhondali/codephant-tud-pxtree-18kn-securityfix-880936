
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
			, wordWrapWidth: 365
			, align: "align"
			}
		, Offset: [25,200]
		}
	, Button:
		{ TextStyle:
			{ font: "normal 12pt sans-serif"
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