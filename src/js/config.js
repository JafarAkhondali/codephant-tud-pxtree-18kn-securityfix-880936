
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

, Spots:
	{ NotActiveAlpha: 0.5
	, ActiveAlpha: 1
	}

, Climate:
	{ ZoneTags: [ "arid", "tropic" ]
	, DefaultZone: "temperate"
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

, WorldMap:
	{ Offset: { x: 50, y: 0 }
	, CloseButton: { at: { x: 40, y: 550 } }
	, Section:
		{ Base: { x: 32, y: 32 }
		, Factor: { x: 60, y: 60 }
		}
	, DrawingCrosses: false
	}

, Endscreen:
	{ Heading:
		{ Text: "Deine Reise ist"
		, Style:
			{ font: "normal 24pt GameFont"
			, fill: '#e0ab1b'
			, stroke: '#bf9218'
			, strokeThickness: 2
			}
		, Position: { x: 200, y: 100 }
		}
	, LogoPosition:
		{ x: 40, y: 20 }
	, Button:
		{ Text: "Zum Hauptmenü"
		, Position: { x: 738, y: 492 }
		}
	, Description:
		{ Style:
			{ font: "normal 16pt GameFont"
			, fill: '#e0ab1b'
			, stroke: '#bf9218'
			, strokeThickness: 0
			, wordWrap: true
			, wordWrapWidth: 800
			}
		, Position: { x: 200, y: 140 }
		}
	, Suggestion:
		{ Style:
			{ font: "normal 14pt GameFont"
			, fill: 'white'
			, shadowColor: '#000000'
			, shadowBlur: 4
			, wordWrap: true
			, align: 'right'
			, wordWrapWidth: 500
			}
		, Position: { x: 220, y: 492 }
		, Text: "Du kannst jetzt vom Hauptmenü aus entweder ein neues Spiel beginnen oder aber dein altes Spiel vom letzten Level aus fortsetzen. Es gibt sicherlich noch einiges zu entdecken!"
		}

	, "fail":
		{ HeadingEnd:
			{ Text: " gescheitert!"
			, Style:
				{ font: "bold 36pt GameFont"
				, fill: '#e0ab1b'
				, stroke: '#bf9218'
				, strokeThickness: 1
				}
			}
		, Button:
			{ TextStyle:
				{ font: "normal 18pt GameFont"
				, fill: 'white'
				, shadowColor: '#000000'
				, shadowBlur: 4
				}
			, HoverTextStyle:
				{ fill: "gold"
				}
			}
		, Descriptions:
			{ "player.strength": "Du hast zu aggressiv deine Reise bestritten und bist keinem Kampf oder Streit aus dem Weg gegangen. Das hast du teuer mit dem Teil der Mannschaft bezahlt, der dich, deine Mannschaft und das Schiff schützen sollte. Bei deinem letzten Kampf wurdest du einfach überrannt. Zwar haben alle zu den Waffen gegriffen und um ihr Leben gekämpft, doch das hat nicht ausgereicht. Dein Schiff wurde gekapert, du und deine Mannschaft getötet und alles, was sie gebrauchen konnten, haben deine Angreifer mit sich genommen."
			, "player.food": "Deine Vorratsspeicher sind aufgebraucht und deine Mannschaft hat nichts mehr zu essen. Nach zwei Wochen auf See und ohne Essen und frisches Trinkwasser ist deine Mannschaft bis auf wenige dem Hunger erlegen. Auch du bist ausgezehrt und kannst das Schiff nicht mehr steuern. In den kommenden Jahrzehnten wird man dein Schiff noch mehrfach sichten und sich schauerliche Geschichten erzählen von dem, was geschehen sein mag."
			, "player.gold": "Du hast auf zu großem Fuß gelebt! Da du immer gerne dein Gold unter die Leute gebracht hast, wenn du die Möglichkeit hattest, und dabei nicht an deine Mannschaft gedacht hast, stehst du nun vor einer meuternden Meute, die nach ihrem Sold verlangt. Da du ihnen nicht geben kannst, wonach sie verlangen, setzen sie dich kurzerhand auf einer kleinen, einsamen Insel mitten im Nirgendwo der weiten See aus und machen sich mit deinem Schiff davon."
			, "player.crewCount": "Deine Reise war sehr anstrengend – leider viel zu anstregend für viele deiner Mannschaft! Nach und nach hast du Leute an Krankheiten wie Skorbut, in Kämpfen oder an die See verloren. Nach zwei Wochen auf See ohne Essen und frisches Trinkwasser sind die wenigen Verbliebenen deiner Mannschaft und du selbst dem Hunger erlegen. In den kommenden Jahrzehnten wird man dein Schiff noch mehrfach sichten und sich schauerliche Geschichten erzählen von dem, was geschehen sein mag."
			}
		}

	, "success":
		{ HeadingEnd:
			{ Text: " erfolgreich!"
			, Style:
				{ font: "bold 36pt GameFont"
				, fill: '#e0ab1b'
				, stroke: '#bf9218'
				, strokeThickness: 1
				}
			}
		, Button:
			{ TextStyle:
				{ font: "normal 18pt GameFont"
				, fill: "white"
				, shadowColor: '#000000'
				, shadowBlur: 4
				}
			, HoverTextStyle:
				{ fill: "gold"
				}
			}
		, Descriptions:
			{ "infant-island": "Du hast mitten im unendlichen Pazifik eine kleine Insel mit einer Tempel darauf gefunden! Als du und deine Mannschaft den Tempel erkundet, stellt sich heraus, dass er der Zugang zu einem viel größeren, unterirdischen Reich ist. Nachdem ihr eine Weile herumgestöbert habt, findet ihr ein riesenhaftes blaues Ei, das kurz darauf auseinander bricht. Hervor kommt eine braune Riesenlarve mit leuchtenden saphirfarbenen Augen. Sie scheint dir wohl gesonnen, was dich recht verblüfft. Was wird daraus wohl noch werden?"
			, "eldorado": "Du hast gefunden, was noch Generationen nach dir vergeblich suchen werden – Reichtum in unendlicher Fülle! Schlecht nur, dass das ganze Gold dich so verrückt macht, dass du nicht mehr von hier weg willst. Du schließst dich selber in der goldenen Stadt ein und verteidigst sie aufs Äußerste gegen jeden Eindringling."
			}
		}
	}
}

);
