
namespace("PXTree.AchtzehnKnoten.Config",

{ TextStyle: { font: "normal 12pt sans-serif", fill: "black" }
, Game:
	{ Width: 1024, Height: 576 }

, Events:
	{ Description:
		{ TextStyle: { font: "normal 12pt sans-serif", fill: "white" }
		}
	, Button:
		{ TextStyle: { font: "normal 12pt sans-serif", fill: "white" }
		, LabelOffset: { x: 20, y: 0 }
		, Texture: { key: 'dialog-button', url: 'assets/board-decorated-256x64-2x.png' }
		, Height: 64
		}
	, Dialog:
		{ Width: 500
		, Height: 500
		, Padding: 10
		, Margin: 20
		}
	}

, Desk:
	{ Left: 576
	
	, StatPaper:
		{ TextStyle: { font : 'normal 12pt sans-serif', fill: 'black' }
		, Offset: { x: 10, y: 10 }
		, Lines:
			{ Origin: { x: 40, y: 40 }
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
}

);