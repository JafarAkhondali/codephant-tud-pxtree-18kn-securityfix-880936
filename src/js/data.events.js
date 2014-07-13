
namespace("PXTree.AchtzehnKnoten.Data.Events",

[ { "name": "fallback-nice-weather"
	, "tags": [ "fallback" ]
	, "type": "message"
	, "description": "Es ist ein ruhiger Tag auf See und das Wetter ist schön, während eine kräftige Brise das Schiff vorantreibt."
	, "ok": {}
	}

, { "name": "drag-testing"
	, "type": "drag-to-order"
	, "description": "Sortiere diese Name lexikografisch."
	, "itemType": "word"
	, "items":
		{ "dagama": "Vasco da Gama"
		, "vespucci": "Amerigo Vespucci"
		, "columbus": "Christoph Kolumbus"
		, "magellan": "Ferdinand Magellan"
		, "eriksson": "Leif Eriksson"
		}
	, "order": ["eriksson", "dagama", "columbus", "magellan", "vespucci"]
	, "correct":
		{ "type": "message"
		, "description": "Das hast du fein gemacht!"
		}
	, "wrong":
		{ "type": "message"
		, "description": "Das war falsch!"
		}
	}
	
, { "name": "drag-ship_parts"
	, "tags": [ "water", "difficulty2" ]
	, "type": "drag-to-order"
	, "description": "Sortiere diese Begriffe in diese Reihenfolge: 'vorne' - 'links' - 'rechts' - 'hinten'"
	, "itemType": "word"
	, "items":
		{ "back": "Heck"
		, "right": "Steuerbord"
		, "left": "Backbord"
		, "front": "Bug"
		}
	, "order": ["front", "left", "right", "back"]
	, "correct":
		{ "type": "message"
		, "description": "Das ist richtig!"
		, "outcome": { "player.morale": [2,3]
						, "player.strength": 2 }
		}
	, "wrong":
		{ "type": "message"
		, "description": "Das war falsch!"
		, "outcome": { "player.morale": [-2,-3] }
		}
	}
	
, { "name": "ship_ahoy_pirate"
	, "tags": ["water"]
	, "description": "Dein Ausguck entdeckt ein Schiff am Horizont. Es scheint unter spanischer Flagge zu segeln. Wie möchtest du handeln?"
	,	"choices":
		[ { "name": "ship_ahoy_pirate_avoid"
			, "label": "Abdrehen und Abstand halten."
			, "description": "Du hälst Abstand zu dem Schiff. Diskretion ist die Mutter aller Tugenden."
			, "outcome":
				{}
			}
		, { "name": "ship_ahoy_pirate_investigate"
			, "label": "Kurs beibehalten, Kontakt aufnehmen."
			, "description": "Als du dich dem Schiff näherst, hissen sie eine schwarze Flagge. Es sind portugiesische Freibeuter!"
			, "choices":
				[ { "name": "ship_ahoy_pirate_battle"
					, "type": "message"
					, "label": "Zum Kampf vorbereiten."
					, "description": "Nach einem schweren Kampf, der einige Opfer gefordert hat, konntest du immerhin ein paar Vorräte deiner Gegner erbeuten."
					, "outcome":
						{ "player.food": [0,100]
						, "player.crewCount": [-5,0]
						, "player.strength": -2
						, "player.gold": [0,1000]
						}
					}
				, { "name": "ship_ahoy_pirate_evade"
					, "label": "Ausweichmanöver und fliehen!"
					, "outcome":
						{
						  "player.strength": [-1,0]
						}
					}
				]
			}
		]
	}
	
, { "name": "ship_ahoy_friendly"
	, "tags": ["water"]
	, "description": "Dein Ausguck entdeckt ein Schiff am Horizont. Es scheint unter spanischer Flagge zu segeln. Wie möchtest du handeln?"
	,	"choices":
		[ { "name": "ship_ahoy_friendly_avoid"
			, "label": "Abdrehen und Abstand halten."
			, "description": "Du hälst Abstand zu dem Schiff. Diskretion ist die Mutter aller Tugenden."
			, "outcome":
				{}
			}
		, { "name": "ship_ahoy_friendly_investigate"
			, "label": "Kurs beibehalten, Kontakt aufnehmen."
			, "description": "Es ist ein Handelsschiff. Der Kapitän begrüsst dich. Was möchtest du tun?"
			, "choices":
				[ { "name": "ship_ahoy_friendly_buy_1"
					, "label": "100 Nahrung für 1000 Gold kaufen."
					, "outcome":
						{ "player.food": +100
						, "player.gold": -1000
						}
					}
				, { "name": "ship_ahoy_friendly_buy_2"
					, "label": "200 Nahrung für 2000 Gold kaufen."
					, "outcome":
						{ "player.food": +200
						, "player.gold": -2000
						}
					}
				, { "name": "ship_ahoy_friendly_buy_2"
					, "label": "Ich brauche doch nichts."
					, "outcome":
						{
						}
					}
				]
			}
		]
	}
	
, { "name": "crew_latitude"
	, "tags": ["water"]
	, "description": "Ein Crewmitglied fragt nach dem Breitengrad. Was antwortest du?"
	,	"choices":
		[ { "name": "crew_latitude_deny"
			, "label": "Der Kurs bleibt Sache des Kapitäns!."
			, "description": "Die Crew wird ein wenig misstrauisch."
			, "outcome":
				{ "player.morale": -2
				}
			}
		, { "name": "crew_latitude_try"
			, "label": "Versuche, den Breitengrad zu bestimmen."
			, "description": "Du willst den Breitengrad bestimmen. Wie gehst du vor?"
			, "choices":
				[ { "name": "crew_latitude_compass"
					, "label": "Mit dem Kompass."
					, "description": "Dein Crewmitglied schaut dich verwirrt an: 'Captain, ich dachte den Breitengrad bestimmt man dem Stand der Sonne oder der Sterne?'"
					, "outcome":
						{ "player.morale": -5
						}
					}
				, { "name": "crew_latitude_sun"
					, "label": "Mit dem Stand der Sonne/Sterne."
					, "description": "Du bestimmst den Breitengrad mit Hilfe der Sonne/Sterne. Deine Crew fühlt sich in ihr Vertrauen in deine navigatorischen Fähigkeiten bestätigt."
					, "outcome":
						{ "player.morale": 2
						}
					}
				]
			}
		]
	}
	
, { "name": "native_island"
	, "tags": ["island", "carribean"]
	, "description": "Land in Sicht!"
	,	"choices":
		[ { "name": "native_island_ignore"
			, "label": "Weitersegeln."
			, "description": "Deine Reise ist wichtiger als so eine kleine Insel."
			, "outcome":
				{ 
				}
			}
		, { "name": "native_island_anchor"
			, "label": "Vor Anker gehen."
			, "description": "Du gehst vor Anker und ruderst mit deinen Beibooten zur Insel. Was möchtest du tun?"
			, "choices":
				[ { "name": "native_island_beach"
					, "label": "Ein Paar Vorräte am Strand sammeln."
					, "description": "Deine Crew sammelt ein wenig Holz und Früchte am Strand. Die Ausbeute ist mager, aber man nimmt was man kriegen kann."
					, "outcome":
						{ "player.food": [5,15]
						}
					}
				, { "name": "native_island_inland"
					, "label": "Das Inland erforschen."
					, "description": "Du entdeckst einen Stamm von Ureinwohnern. Sie sind ein wenig Misstrauisch, aber sie scheinen dir freundlich gesinnt zu sein."
					, "outcome": {}
					, "choices":
						[ { "name": "native_island_trade"
							, "label": "Handle Waffen gegen Vorräte."
							, "description": "Nach einer kurzen Demonstration deiner Waffen ist der Stamm zu einem Handel bereit."
							, "outcome":
								{ "player.strength": -5
								, "player.food": [45,90]
								}
							}
						, { "name": "native_island_food"
							, "label": "Frage nach Nahrung."
							, "description": "Die Verständigung ist nicht leicht, aber du fragst den Stamm, wo es auf der Insel Nahrung zu finden gibt. Sie zeigen dir ihre Jagdgründe und du kannst ein paar Tiere erlegen."
							, "outcome":
								{ "player.food": [30,60]
								}
							}
						, { "name": "native_island_raid"
							, "label": "Überfalle den Stamm in der nächsten Nacht."
							, "description": "Du überfällst den Stamm in der nächsten Nacht und erbeutest ihre Schätze und Vorräte, einige deiner Männer sterben dabei. Ob das richtig war..."
							, "outcome":
								{ "player.crewCount": [-3,0]
								, "player.morale": [-5,0]
								, "player.food": [50,100]
								, "player.gold": [100,300]
								}
						} ]
					}
				]
			}
		]
	}

, { "name": "no_wind"
	, "tags": ["water", "atlantic"]
	, "description": "Flaute! Deine Crew fragt dich, was sie tun soll."
	, "choices":
		[ { "name": "no_wind_fish"
			, "label": "Versuche zu Angeln."
			, "description": "Deine Crew fängt ein paar Fische."
			, "outcome":
				{ "player.food": [10,30] }
			}
		, 
		{ "name": "no_wind_free"
			, "label": "Der Mannschaft den Tag frei geben."
			, "description": "Deine Crew genießt einen freien Tag."
			, "outcome":
				{ "player.morale": +5
				, "player.food": -15 }
			}
		]
	}
	
, { "name": "scurvy"
	, "tags": ["water", "difficulty2"]
	, "description": "Skorbut hat ein Mitglied deiner Crew dahingerafft!"
	, "ok":
		{ "outcome":
			{ "player.crewCount": -1 }
		}
	}

, { "name": "crew_steal"
	, "tags": ["water"]
	, "description": "Deine Mannschaft ist in Aufruhr: Ein paar Crewmitglieder haben Essen aus den Vorräten für sich geklaut. Deine Crew will sie über Bord werfen, aber du weißt, dass du jeden Mann gebrauchen kannst. Wie willst du sie bestrafen?"
	, "choices":
			[ { "name": "crew_steal_kill"
				, "label": "Werft sie über Bord!"
				, "description": "Du lässt die Diebe über die Planke laufen. Deine Crew ist mit der in ihren Augen fairen Strafe zufrieden und sieht dich als durchsetzungsfähigen Kapitän."
				, "outcome": 
					{ "player.crewCount": [-2, -4]
					, "player.morale": [+2, +4] }
			}
			, { "name": "crew_steal_whip"
				, "label": "Peitscht sie aus!"
				, "description": "Du lässt die Diebe auspeitschen und ihre Rationen für zwei Wochen halbieren. Deine Mannschaft ist mit der milden Strafe nicht zufrieden."
				, "outcome": 
					{ "player.morale": [-2, -4] }
				}
			]
		
	}
	
, { "name": "storm"
	, "tags": ["water"]
	, "description": "Ein Sturm zieht am Horizont auf. Du überdenkst deine Optionen: Du könntest versuchen den Sturm zu umschiffen, aber das wird dich Zeit und somit vor allem Nahrung kosten. Oder du gehst das Risiko ein, den Sturm zu durchfahren."
	, "choices":
			[ { "name": "storm_evade"
				, "label": "Versuche, den Sturm zu umfahren."
				, "description": "Die Umschiffung des Sturms verlief so erfolgreich wie ereignislos. Du schätzt, dass du ungefähr zwei bis drei Tage Miese gemacht hast und demnach einige Tagesrationen an Nahrung verloren hast."
				, "outcome": 
					{ "player.food": [-30, -45] }
			}
			, { "name": "storm_pullthrough"
				, "label": "Kurs beibehalten."
				, "description": "Nach einigen Kräftezehrenden Stunden hast du es geschafft: Der Sturm ist durchfahren. Sogar die Schäden an deinem Schiff halten sich in Grenzen. Leider ist einer deiner Männer und etwas Equipment durch einen großen Brecher über Bord gegangen."
				, "outcome": 
					{ "player.crewCount": -1
					, "player.strength": [-2,-3] }
				}
			]
		
	}
	
, { "name": "azores"
	, "tags": ["unused"]
	, "description": "Du bist auf den Azoren gelandet. Diese Inseln sind erst seit der Mitte des 15. Jh. bewohnt, aber du wirst bestimmt mit den Kolonisten handeln können."
	, "choices": 
		[ { "name": "azores_buy_food"
			, "label": "Kaufe Nahrung für Gold."
			, "description": "Du kaufst Verpflegung für die weitere Reise. Die Crew ist froh, mal etwas anderes essen zu können."
			, "outcome":
				{ "player.morale": +2
				, "player.food": +100
				, "player.gold": -1000 }
			}
		, { "name": "azores_buy_crew"
			, "label": "Versuche, Crew anzuheuern."
			, "description": "Du heuerst einige Seemänner an. Deine Crew hält leider nicht all zu viel von den Fremden."
			, "outcome":
				{ "player.crewCount": +3
				, "player.gold": -1500 
				, "player.morale": -2}
			}
		, { "name": "azores_ignore"
			, "label": "Reise weiter ohne zu handeln."
			, "description": "Keines der Angebote sagt dir zu. Du gibst der Mannschaft den Abend frei und reist am nächsten Morgen weiter."
			, "outcome":
				{ "player.morale": +1}
			}
		]
	}
	
, { "name": "helena"
	, "tags": ["unused"]
	, "description": "Dein Schiff erreicht St. Helena. Du findest eine kürzlich gegründete britische Kolonie auf dieser Insel. Zwei deiner erkrankten Crewmitglieder bitten dich darum, ohne sie weiterzusegeln, damit sie hier ihre Krankheit auskurieren können."
	, "choices": 
		[ { "name": "helena_agree"
			, "label": "Erfülle den Männern ihren Wunsch."
			, "description": "Deine Männer sind dir dankbar, und der Rest deiner Crew rechnet dir dein verhalten hoch an."
			, "outcome":
				{ "player.morale": 4
				, "player.crewCount": -2}
			, "choices": 
			[ {
				"name": "helena_agree_aye"
				, "label": "Aye!"
				, "description": "Man berichtet dir, dass einige Kolonisten auf deinem Schiff anheuern wollen, und das zu einem guten Preis von 500 Gold."
				, "choices": [ {
								"name": "helena_agree_aye_buy"
								, "label": "Hol die Männer auf dein Schiff."
								, "description": "Die neuen Männer sind dankbar, endlich von dieser 'gottverlassenen Insel' runtergekommen zu sein."
								, "outcome": 
									{ "player.crewCount": [2,3] 
									, "player.gold": -500 }
								}
								, { 
								"name": "helena_agree_aye_dont"
								, "label": "Nicht anheuern."
								, "description": "Du behälst lieber dein Gold. Du wirst es bestimmt auch ohne die weiteren Männer schaffen."
								} ] 
				} ]
			} 
		
		, { "name": "helena_not"
			, "label": "Verweigere ihr anliegen."
			, "description": "Du behälst die Männer auf deinem Schiff, und tatsächlich scheint es ihnen langsam besser zu gehen. Trotzdem litt die Moral deiner Mannschaft unter deiner harten Entscheidung."
			, "outcome":
				{ "player.morale": [-1, -3] }
			}
		]
	}
, { "name": "lanzarote"
	, "tags": ["unused"]
	, "description": "Du fährst einen Hafen auf Lanzarote an. Viele andere Entdecker nutzen diesen erst Anfang des 15. Jh. eröffneten Hafen, um Proviant und Vorräte aufzustocken."
	, "choices": 
		[ { "name": "lanzarote_buy_food"
			, "label": "Kaufe Nahrung für Gold."
			, "description": "Du kaufst Verpflegung für die weitere Reise. Die Crew ist froh, mal etwas anderes essen zu können."
			, "outcome":
				{ "player.morale": +2
				, "player.food": +100
				, "player.gold": -1000 }
			}
		, { "name": "lanzarote_ignore"
			, "label": "Versuche, Crew anzuheuern."
			, "description": "Du heuerst einige Seemänner an. Deine Crew hält leider nicht all zu viel von den Fremden."
			, "outcome":
				{ "player.crewCount": +3
				, "player.gold": -1500 
				, "player.morale": -2}
			}
		, { "name": "lanzarote_help_indigen"
			, "type": 'message'
			, "label": "Mache etwas gegen die Unterdrückung der Ureinwohner."
			, "description": "Du kannst nicht mit ansehen, wie die Ureinwohner der Kanaren, die Guanchen, unterdrückt werden. Du befreist Nachts ein Sklavencamp und überlässt ihnen ein paar deiner Waffen, damit sie sich verteidigen können. Deine Crew bewundert dein selbstloses handeln."
			, "outcome":
				{ "player.strength": -5
				, "player.morale": 5}
			}
		]
	}
, { "name": "newfoundland"
	, "tags": ["unused"]
	, "description": "Du landest auf Neufundland! Der erste Europäer auf dieser Insel war der Italiener Giovanni Caboto. Was willst du tun?"
	, "choices": 
		[ { "name": "newfoundland_gather_food"
			, "label": "Suche nach etwas Nahrung."
			, "description": "Du suchst im Inland der Insel nach etwas Nahrung. Aufgrund des kühlen Klimas auf dieser Insel gibt das karge Land kaum etwas her."
			, "outcome":
				{ "player.food": [50,100] }
			}
		, { "name": "newfoundland_search"
			, "label": "Suche nach Einwohnern."
			, "description": "Nach einiger Zeit findest du am nördlichen Ende der Insel eine Siedlung - die schon seit Jahrhunderten verlassen scheint. Die Bauweise der Häuser scheint keltischen Ursprungs zu sein. Offensichtlich waren schon vor vielen Jahrhunderten Europäer auf dieser Insel!"
			, "outcome":
				{ "player.gold": 1500 
				, "player.morale": 1}
			}
		]
	}
	,{ "name": "geo_quiz_01_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Wie heißt die südlichste Landspitze Afrikas?"
	, "choices": [
		{ "name": "geo_quiz_01_a1"
        , "type": "message"
		, "label": "Kap Agulhas"
		, "description": "Richtig. Übersetzt bedeutet es soviel wie 'Kap der Nadeln', was wahrscheinlich auf die vielen scharfen Felsen des Riffs zurückzuführen ist."
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "geo_quiz_01_a2"
        , "type": "message"
		, "label": "Kap der Guten Hoffnung"
		, "description": "Das Kap der guten Hoffnung ist, anders als oft vermutet, nicht die südlichste Landspitze von Afrika."
		, "outcome": {"player. morale": -5}
		}
		,{ "name": "geo_quiz_01_a3"
        , "type": "message"
		, "label": "Kap Farvel"
		, "description": "Das ist leider nicht korrekt."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_01_a4"
        , "type": "message"
		, "label": "Kap Hafun"
		, "description": "Das ist nicht richtig."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_03_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "In welcher Jahreszeit kommt es nördlich des Nordpolarkreises zu lang anhaltender Tag und Nacht Dunkelheit?"
	, "choices": [
		{ "name": "geo_quiz_03_a1"
        , "type": "message"
		, "label": "Während des Winter"
		, "description": "Das ist die Richitge Antwort. Deine Crew gewinnt vertrauen in deinen Fähigkeiten"
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "geo_quiz_03_a2"
        , "type": "message"
		, "label": "Während des Frühjahres"
		, "description": "Das ist leider die falsche Antwort."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_03_a3"
        , "type": "message"
		, "label": "Während des Sommers"
		, "description": " Das ist leider die falsche Antwort."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_03_a4"
        , "type": "message"
		, "label": "Während des Herbstes"
		, "description": " Das ist leider die falsche Antwort."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_04_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Welche geographische Breite hat der südliche Polarkreis?"
	, "choices": [
		{ "name": "geo_quiz_04_a1"
        , "type": "message"
		, "label": "66,5°S"
		, "description": " Richtig! Deine Crew vertraut dir."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_04_a2"
        , "type": "message"
		, "label": "66,5°N"
		, "description": " Ein guter Kapitän würde es besser wissen!"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_04_a3"
        , "type": "message"
		, "label": "90,0°S"
		, "description": " Das ist der geographische Südpol und nicht der südliche Polarkreis. Deine Crew hat leichte Zweifel an deinen Fähigkeiten."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_04_a4"
        , "type": "message"
		, "label": "23,5°S"
		, "description": " Der südliche Polarkreis, nicht der südliche Wendekreis. Deine Crew hat leichte Zweifel an deinen Fähigkeiten."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_05_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Welche Meeresströmung hält im Winter die norwegischen Seehäfen weitgehend eisfrei?"
	, "choices": [
		{ "name": "geo_quiz_05_a1"
        , "type": "message"
		, "label": "Der Nordatlantikstrom"
		, "description": "Vollkommen richtig!"
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "geo_quiz_05_a2"
        , "type": "message"
		, "label": "Der Golfstrom"
		, "description": "Der Golfstrom wird im Nordatlantik zum Nordatlantikstrom und hält die Seehäfen eisfrei."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_05_a3"
        , "type": "message"
		, "label": "Der Kanarenstrom"
		, "description": "Der Kanarenstrom ist eine kalte Meereströmung."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_05_a4"
        , "type": "message"
		, "label": "Der Labradorstrom"
		, "description": "Der Labradorstrom ist eine kalte Meereströmung  und fließt zwischen Grönland und Amerika in Richtung Süden."
		, "outcome": {"player.strength": -3}
		}
	]
},{ "name": "geo_quiz_06_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "In etwa 97% des Wassers auf der Erde ist Salzwasser. Das restliche Süßwasser ist beinahe zu 70% Gletschereis. Wo findet man die größten Süßwasservorräte?"
	, "choices": [
		{ "name": "geo_quiz_06_a1"
        , "type": "message"
		, "label": "In der Antarktis"
		, "description": " So gut, wie der gesamte Kontinent ist vergletschert und speichert die größten Süßwasservorräte."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_06_a2"
        , "type": "message"
		, "label": "In Grönland"
		, "description": " In Grönland gibt es die größten Gletscher außerhalb des Antarktis, die als größter Süßwasserspeicher gilt."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_06_a3"
        , "type": "message"
		, "label": "Auf dem Nordpol"
		, "description": " Das ist die falsche Antwort. Die größten Reservern sind in der Antarktis gespeichert."
		, "outcome": { "player.morale": -2}
		}
		,{ "name": "geo_quiz_06_a4"
        , "type": "message"
		, "label": "In den Gletschervorkommen der Hochgebirge"
		, "description": " Die Hochgebirgsgletscher speichern bei weitem nicht die Menge an Süßwasser, wie die Antarktis."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_07_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Wo liegt das Meeresgebiet Kattegat?"
	, "choices": [
		{ "name": "geo_quiz_07_a1"
        , "type": "message"
		, "label": "Zwischen Dänemark und Schweden."
		, "description": "Richtige Antwort! Das Kattegat ist ein in etwa 80 Meter tiefes und relativ schwer schiffbares Meeresgebiet zwischen Dänemark und Schweden."
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "geo_quiz_07_a2"
        , "type": "message"
		, "label": "Zwischen Schweden, Dänemark und Norwegen."
		, "description": " Das Kattegat grenzt nicht an Norwegen. Die Mannschaft verwechselt selber manchmal Kattegat und Skagerrak und verliert deshalb kein Vertrauen."
		, "outcome": {"player. morale": 0}
		}
		,{ "name": "geo_quiz_07_a3"
        , "type": "message"
		, "label": "Zwischen Dänemark und Deutschen Landen."
		, "description": "Das stimmt aber nicht, meint dein erster Offizier. Es liegt zwischen Dänemark und Schweden!"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_07_a4"
        , "type": "message"
		, "label": "Das Kattegat liegt zwischen Norwegen und Dänemark."
		, "description": "Das stimmt aber nicht, meint dein erster Offizier. Es liegt zwischen Dänemark und Schweden!"
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_08_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Die Inselgruppe Spitzbergen liegt in welchem Meeresgebiet?"
	, "choices": [
		{ "name": "geo_quiz_08_a1"
        , "type": "message"
		, "label": "Spitzbergen liegt im Nordatlantik."
		, "description": "Vollkommen Richtig! Deine Mannschaft sieht, dass du wichtige geographische Kentnisse hast."
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "geo_quiz_08_a2"
        , "type": "message"
		, "label": "Spitzbergen liegt im Atlantik."
		, "description": "Dein Erster Offizier ergänzt dich und sagt dass es genauer im Nordatlantik liegt."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_08_a3"
        , "type": "message"
		, "label": "Spitzbergen liegt im Pazifik."
		, "description": "Die Mannschaft zweifelt an deinen geographischen Kenntnissen. Einer der Matrosen sagt, dass es im Nordatlantik liegt."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_08_a4"
        , "type": "message"
		, "label": "Spitzbergen liegt im Beringmeer."
		, "description": "Die Mannschaft zweifelt an deinen geographischen Kenntnissen. Einer der Matrosen sagt, dass es im Nordatlantik liegt."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_09_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Die Doggerbank ist eine Untiefe in welchem Meeresgebiet?"
	, "choices": [
		{ "name": "geo_quiz_09_a1"
        , "type": "message"
		, "label": "Die Doggerbank liegt in der Nordsee"
		, "description": "Richtig. Du zeigst, dass du Kenntnisse über die Meere und deren Untiefen hast."
		, "outcome": {"player.moral": 2}
		}
		,{ "name": "geo_quiz_09_a2"
        , "type": "message"
		, "label": "Die Doggerbank liegt in der Ostsee"
		, "description": "Das stimmt nicht. Sie liegt in der Nordsee, meint dein erster Offizier."
		, "outcome": {"player.moral": -2}
		}
		,{ "name": "geo_quiz_09_a3"
        , "type": "message"
		, "label": "Die Doggerbank liegt in dem Atlantik"
		, "description": "Das stimmt nicht. Sie liegt in der Nordsee, meint dein erster Offizier."
		, "outcome": {"player.moral": -2}
		}
		,{ "name": "geo_quiz_09_a4"
        , "type": "message"
		, "label": "Die Doggerbank liegt in dem Norpolarmeer"
		, "description": "Das stimmt nicht. Sie liegt in der Nordsee, meint dein erster Offizier."
		, "outcome": {"player.moral": -2}
		}
	]
},{ "name": "geo_quiz_10_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Welche Landspitze wird als Kap Hoorn bezeichnet?"
	, "choices": [
		{ "name": "geo_quiz_10_a1"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Südamerika."
		, "description": "Du hast offensichtlich wichtige Voraussetzungen um mit deiner Mannschaft sicher über die Meere zu segeln!"
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "geo_quiz_10_a2"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Indien."
		, "description": "Die südlichste Landspitze von Indien ist das Kap Komorin."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_10_a3"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Afrika."
		, "description": "Die südlichste Landspitze von Afrika ist das Kap Agulhas."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_10_a4"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Grönland."
		, "description": " Die südlichste Landspitze von Grönland ist das Kap Farvel."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_11_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "In welchem Ozean liegen die Kanarischen Inseln?"
	, "choices": [
		{ "name": "geo_quiz_11_a1"
        , "type": "message"
		, "label": "Im Atlantik."
		, "description": "Richtig! Du wirst in den Weltmeeren deine Ziele finden."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_11_a2"
        , "type": "message"
		, "label": "Im Indischen Ozean."
		, "description": "Du wirst auf den Weltmeeren wahrscheinlich öfter die falschen Orte ansteuern."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_11_a3"
        , "type": "message"
		, "label": "Im Pazifik."
		, "description": "Dort wirst du vielleicht eines Tages Hawai ansteuern aber sicher nicht die Kanarischen Inseln."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_11_a4"
        , "type": "message"
		, "label": "Im Antarktischen Ozean."
		, "description": " Wenn deine seemännischen Kenntnisse ähnlich gut sind, dann wirst du vermutlich im Antarktischen Ozean kentern."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_12_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty4"]
	, "description": "Die Passatwinde treten bis ca. 30° nördlicher und südlicher Breite auf. Welche Windrichtung haben die Passatwinde nördlich bzw. südlich des Äquators?"
	, "choices": [
		{ "name": "geo_quiz_12_a1"
        , "type": "message"
		, "label": "Man spricht von dem Nord- und Südost Passat"
		, "description": " Dein erster Offizier und die Mannschaft ist stolz unter deinem Kommando zu segeln."
		, "outcome": {"player.morale": 10}
		}
		,{ "name": "geo_quiz_12_a2"
        , "type": "message"
		, "label": "Man spricht von dem Nord- und Südwest Passat"
		, "description": " So wirst du nicht schnell an dein Ziel kommen."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_12_a3"
        , "type": "message"
		, "label": "Man spricht von dem Nord- und Süd Passat"
		, "description": " So wirst du nicht schnell an dein Ziel kommen."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_12_a4"
        , "type": "message"
		, "label": "Man spricht von dem West- und Ost Passat"
		, "description": " So wirst du nicht schnell an dein Ziel kommen."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_13_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty4"]
	, "description": "Welcher Wind entsteht nicht aufgrund der Corioliskraft?"
	, "choices": [
		{ "name": "geo_quiz_13_a1"
        , "type": "message"
		, "label": "Der Bora"
		, "description": "Mit diesem Wissen über die Winde wirst du stets schnell segeln. Die Mannschaft arbeitet unter deinem Kommando mit vollem Engagement in der Takelage."
		, "outcome": {"player.morale": 10}
		}
		,{ "name": "geo_quiz_13_a2"
        , "type": "message"
		, "label": "Der Passat"
		, "description": "Dein Wissen über die Winde wird nicht reichen um besonders schnell auf den Meeren zu segeln."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_13_a3"
        , "type": "message"
		, "label": "Der Jetstream"
		, "description": "Die Mannschaft hat gerade starke Zweifel an deinen seemännischen Fähigkeiten."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_13_a4"
        , "type": "message"
		, "label": "Ein tropischer Wirbelsturm"
		, "description": "Mit diesem Wissen wirst du wahrscheinlich dein Schiff in den nächsten Wirbelsturm geleiten."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_14_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "In Welchem Meer liegt die Karibik?"
	, "choices": [
		{ "name": "geo_quiz_14_a1"
        , "type": "message"
		, "label": "Sie liegt im Atlantischen Ozean"
		, "description": "Mit deinem Geographiewissen wirst du sicher navigieren können."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_14_a2"
        , "type": "message"
		, "label": "Sie liegt im Pazifischen Ozean"
		, "description": "Im Pazifik wirst du vielleicht irgendwann Australien erreichen, aber sicher nicht die Karibischen Inseln."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_14_a3"
        , "type": "message"
		, "label": "Sie liegt im Golf von Mexiko"
		, "description": "Die Karibik grenzt im Westen an das Meeresgebiet des Golfes von Mexiko."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_14_a4"
        , "type": "message"
		, "label": "Sie liegt im Mittelmeer"
		, "description": "Die Balearen liegen im Mittelmeer. Die Gruppe der Karibischen Inseln nicht."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_15_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "In welchem Meer liegt der Atacamagraben?"
	, "choices": [
		{ "name": "geo_quiz_15_a1"
        , "type": "message"
		, "label": "Im Pazifischen Ozean"
		, "description": "Der Atacamagraben ist eine Tiefseerinne und liegt im südöstlichen Pazifik vor Südamerika."
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "geo_quiz_15_a2"
        , "type": "message"
		, "label": "Im Atlatischen Ozean"
		, "description": "Die Moral der Crew schwindet."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_15_a3"
        , "type": "message"
		, "label": "Im Indischen Ozean"
		, "description": "Die Moral der Crew schwindet."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_15_a4"
        , "type": "message"
		, "label": "Im Arktischen Ozean"
		, "description": "Die Moral der Crew schwindet."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_16_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty4"]
	, "description": "Welche Meeresströmung fließt nicht im Atlantik?"
	, "choices": [
		{ "name": "geo_quiz_16_a1"
        , "type": "message"
		, "label": "Der Humboldt-Strom"
		, "description": "Du zeigst deiner Mannschaft, dass du dich hervorragend mit den Weltmeeren auskennst."
		, "outcome": {"player.morale": 10}
		}
		,{ "name": "geo_quiz_16_a2"
        , "type": "message"
		, "label": "Der Kap Hoorn-Strom"
		, "description": "Dein erster Offizier, berichtigt dich höflich und sagt, dass er im Atlantik und Pazifik fließt."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "geo_quiz_16_a3"
        , "type": "message"
		, "label": "Der Falklandstrom"
		, "description": "Dein erster Offizier verliert Vertrauen und die Moral der Mannschaft sinkt."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_16_a4"
        , "type": "message"
		, "label": "Der Golfstrom"
		, "description": "Dein erster Offizier verliert Vertrauen und die Moral der Mannschaft sinkt."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_17_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty4"]
	, "description": "Du erblickst Land. Dein erster Offizier meint es sei ein Archipel. Was ist ein Archipel, fragst du dich?"
	, "choices": [
		{ "name": "geo_quiz_17_a1"
        , "type": "message"
		, "label": "Eine Inselgruppe mit dem dazwischen liegende Gewässer"
		, "description": "Dein erster Offizier, sieht dass du Wissen über die Meere hast"
		, "outcome": {"player.morale": 10}
		}
		,{ "name": "geo_quiz_17_a2"
        , "type": "message"
		, "label": "Eine Insel vulkanischen Ursprunges"
		, "description": "Dein erster Offizier berichtigt dich und meint es sei eine Inselgruppe mit dem dazwischen liegenden Gewässer."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_17_a3"
        , "type": "message"
		, "label": "Eine Halbinsel"
		, "description": "Dein erster Offizier berichtigt dich und meint es sei eine Inselgruppe mit dem dazwischen liegenden Gewässer."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_17_a4"
        , "type": "message"
		, "label": "Eine Landspitze im Meer"
		, "description": "Dein erster Offizier berichtigt dich und meint es sei eine Inselgruppe mit dem dazwischen liegenden Gewässer."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_18_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Du bist mit deinem Schiff auf hoher See und die Sonne brennt. Einer deiner Matrosen fragt, wo die Sonne im Zenit stehen kann?"
	, "choices": [
		{ "name": "geo_quiz_18_a1"
        , "type": "message"
		, "label": "Zwischen dem nördlichen und südlichen Wendekreis"
		, "description": "Die Mannschaft sieht, dass du wichtige geographische Kenntnisse hast."
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "geo_quiz_18_a2"
        , "type": "message"
		, "label": "Zwischen den Polarkreisen und den Wendekreisen"
		, "description": "Die Mannschaft sieht, dass dir wichtige geographische Kenntnisse fehlen."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_18_a3"
        , "type": "message"
		, "label": "Ausschließlich auf dem Äquator"
		, "description": "Die Mannschaft sieht, dass dir wichtige geographische Kenntnisse fehlen."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "geo_quiz_18_a4"
        , "type": "message"
		, "label": "Ausschließlich auf den Polen"
		, "description": "Die Mannschaft sieht, dass dir wichtige geographische Kenntnisse fehlen."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "geo_quiz_19_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Du bist in der Karibik und musst eine der Inseln der Kleinen Antillen anlaufen. Welche Insel kannst du ansteuern?"
	, "choices": [
		{ "name": "geo_quiz_19_a1"
        , "type": "message"
		, "label": "Trinidad"
		, "description": "Es scheint so, als würdest du dich in der Karibik auskennnen!"
		, "outcome": {"player.morale":2}
		}
		,{ "name": "geo_quiz_19_a2"
        , "type": "message"
		, "label": "Hispaniola"
		, "description": "Es scheint so, als würdest du dich nicht in der Karibik auskennnen!"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_19_a3"
        , "type": "message"
		, "label": "Puerto Rico"
		, "description": "Es scheint so, als würdest du dich nicht in der Karibik auskennnen!"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_19_a4"
        , "type": "message"
		, "label": "Kuba"
		, "description": "Es scheint so, als würdest du dich nicht in der Karibik auskennnen!"
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "geo_quiz_20_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Dein Schiff soll Neufundland anlaufen. Deine Mannschaft möchte wissen, wo es liegt?"
	, "choices": [
		{ "name": "geo_quiz_20_a1"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Ostküste von Nordamerika."
		, "description": "Die Offiziere sind beruhigt, dass wenigstens du weißt wo es hingehen soll."
		, "outcome": {"player.morale":2}
		}
		,{ "name": "geo_quiz_20_a2"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Westküste von Nordamerika."
		, "description": "Die Offiziere sind beunruhigt, dass du nicht weißt wo es hingehen soll."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_20_a3"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Westküste von Afrika."
		, "description": "Die Offiziere sind beunruhigt, dass du nicht weißt wo es hingehen soll."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "geo_quiz_20_a4"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Ostküste von Afrika."
		, "description": "Die Offiziere sind beunruhigt, dass du nicht weißt wo es hingehen soll."
		, "outcome": {"player.morale": -2}
		}
	]
}
,{ "name": "hist_quiz_02_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Deine Offiziere sprechen über die antiken griechischen Gelehrten. Einer fragt wer den, dass Prinzip über das Auftriebsverhalten der Stoffe entdeckt hat?"
	, "choices": [
		{ "name": "hist_quiz_02_a1"
        , "type": "message"
		, "label": "Archimedes"
		, "description": "Heureka, du hast es!"
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "hist_quiz_02_a2"
        , "type": "message"
		, "label": "Pythagoras"
		, "description": "Pythagoras von Samos hat sich zwar mit Mathematik und Philosophie beschäftigt, aber nicht der Physik."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_02_a3"
        , "type": "message"
		, "label": "Aristoteles"
		, "description": "Aristoteles beschäftigte sich zwar mit Physik, jedoch hat nicht er das archimedische Prinzip entdeckt."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_02_a4"
        , "type": "message"
		, "label": "Platon"
		, "description": "Platon beschäftigte sich zwar mit Physik, jedoch hat nicht er das archimedische Prinzip entdeckt."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_03_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Ein paar Matrosen reden über die Seefahrt im Altertum und ungewöhnliche Ladungen. Einer fragt, welche Tiere der Feldherr Hannibal Barkas von Afrika nach Europa verschifft hat während des Krieges gegen Rom?"
	, "choices": [
		{ "name": "hist_quiz_03_a1"
        , "type": "message"
		, "label": "Elefanten"
		, "description": "Hannibal Barkas hat Schlachtelefanten durch die Alpen geführt um sie gegen Rom im Feld einzusetzen."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "hist_quiz_03_a2"
        , "type": "message"
		, "label": "Nasshörner"
		, "description": "Ein anderer Matrose meint, dass Elefanten verschifft wurden."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_03_a3"
        , "type": "message"
		, "label": "Löwen"
		, "description": "Ein anderer Matrose meint, dass Elefanten verschifft wurden."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_03_a4"
        , "type": "message"
		, "label": "Giraffen"
		, "description": "Ein anderer Matrose meint, dass Elefanten verschifft wurden."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_04_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Einer deiner Offiziere hat eine alte Karte der Römer in einem Buch entdeckt und zeigt einige Binnenhäfen im alten Germanien. Eine Stadt heißt Colonia Claudia Ara Agrippinensium. Wie heißt diese heutzutage?"
	, "choices": [
		{ "name": "hist_quiz_04_a1"
        , "type": "message"
		, "label": "Köln"
		, "description": " In Colonia Claudia Ara Agrippinensium war die römische Rheinflotte stationiert."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "hist_quiz_04_a2"
        , "type": "message"
		, "label": "Koblenz"
		, "description": " Dein Offizier, sagt das die Stadt nicht dort liegt, wo heute Koblenz ist"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_04_a3"
        , "type": "message"
		, "label": "Bonn"
		, "description": " Dein Offizier, sagt das die Stadt nicht dort liegt, wo heute Bonn ist"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_04_a4"
        , "type": "message"
		, "label": "Xanten"
		, "description": " Dein Offizier, sagt das die Stadt nicht dort liegt, wo heute Xanten ist"
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_05_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Deine Offiziere sprechen über die Seefahrt im frühen Mittelalter. Sie fragen sich wie man die kriegerischen Stämme nennt, welche im Norden von Europa siedelten?"
	, "choices": [
		{ "name": "hist_quiz_05_a1"
        , "type": "message"
		, "label": "Es waren die Wikinger"
		, "description": "Ja völlig richtig, erinnert sich einer der Offiziere."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "hist_quiz_05_a2"
        , "type": "message"
		, "label": "Es waren die Sachsen"
		, "description": "Das stimmt aber nicht, sagt einer aus der Gruppe."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_05_a3"
        , "type": "message"
		, "label": "Es waren die Hunnen"
		, "description": "Das stimmt aber nicht, sagt einer aus der Gruppe."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_05_a4"
        , "type": "message"
		, "label": "Es waren die Franke"
		, "description": "Das stimmt aber nicht, sagt einer aus der Gruppe."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_06_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Wie hieß der isländische Wikinger, fragt ein Matrose, der die ersten Besiedelungsversuche in Amerika nach der urgeschichtlichen Besiedelung unternahm?"
	, "choices": [
		{ "name": "hist_quiz_06_a1"
        , "type": "message"
		, "label": "Leif Eriksson"
		, "description": "Ein der Crew fügt hinzu, dass es um das Jahr 1000 n. Chr. war."
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "hist_quiz_06_a2"
        , "type": "message"
		, "label": "Erik der Rote"
		, "description": "Du wirst von einem Offizier berichtigt: Es war Leif Eriksson."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_06_a3"
        , "type": "message"
		, "label": "Ivar Ragnarsson"
		, "description": "Du wirst von einem Offizier berichtigt: Es war Leif Eriksson."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_06_a4"
        , "type": "message"
		, "label": "Freydis Eriksdottir"
		, "description": "Du wirst von einem Offizier berichtigt: Es war Leif Eriksson."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_07_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Einige Leute reden, darüber wie der erste Kreuzzug über See unterstützt wurde. Einer betont, dass bei der Schlacht von Jerusalem die Kreuzfahrer verloren hätten, wären nicht 6 Schiffe mit Nachschub zu Hilfe gekommen. Wann war eigentlich diese Schlacht?"
	, "choices": [
		{ "name": "hist_quiz_07_a1"
        , "type": "message"
		, "label": "1099"
		, "description": "Die Kreuzfahrer nahmen die Stadt ein und verursachten ein schreckliches Massaker"
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "hist_quiz_07_a2"
        , "type": "message"
		, "label": "1097"
		, "description": "In diesem Jahr hatten die christlichen Heere Jerusalem noch nicht erreicht."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_07_a3"
        , "type": "message"
		, "label": "1098"
		, "description": "In diesem Jahr hatten die christlichen Heere Jerusalem noch nicht erreicht."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_07_a4"
        , "type": "message"
		, "label": "1100"
		, "description": "In diesem Jahr war Jerusalem bereist in einem schrecklichen Massaker eingenommen worden."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_08_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty4"]
	, "description": "In deiner Kapitänskajüte liegt ein Buch über den Seeweg nach Indien, jedoch fehlen einige Seiten. Du fragst dich, wer den ersten ernsthaften Versuch unternahm um dieses Ziel zu erreichen?"
	, "choices": [
		{ "name": "hist_quiz_08_a1"
        , "type": "message"
		, "label": "Die Brüder Vivaldo"
		, "description": "Die Vivaldos waren genuesische Seefahrer und verließen ihren Hafen 1291 in Richtung Indien."
		, "outcome": {"player.morale": 10}
		}
		,{ "name": "hist_quiz_08_a2"
        , "type": "message"
		, "label": "Die Grimaldis"
		, "description": "Falsch!Die Grimaldis, eine alte genuesische Familie, sind die Fürstenfamilie des Fürstentums Monaco"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_08_a3"
        , "type": "message"
		, "label": "Die Brüder Doria"
		, "description": "Falsch!Die Familie Doria stellte in Genua unter anderem Offiziere der Stadtflotte"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_08_a4"
        , "type": "message"
		, "label": "Die Colombos"
		, "description": "Die Colombos sind eine genuesische Familie. Ihr bekanntestes Mitglied ist Cristoforo Colombo in deutscher Schreibweise Christoph Kolumbus."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_09_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Du redest mit deinem Schiffsarzt über Krankheiten und Seuchen. Wie heißt die Seuche, welche im Mittelalter ca. 25 Millionen Menschen das Leben kostete"
	, "choices": [
		{ "name": "hist_quiz_09_a1"
        , "type": "message"
		, "label": "Es war die Lungen- und Beulenpest"
		, "description": "Dein Schiffsarzt bestätigt dich."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "hist_quiz_09_a2"
        , "type": "message"
		, "label": "Es war die Cholera"
		, "description": "Dein Schiffsarzt, sagt dass die Cholera nie solche Ausmaße annahm."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_09_a3"
        , "type": "message"
		, "label": "Es waren die Pocken"
		, "description": "Dein Schiffsarzt, sagt dass die Pocken nie solche Ausmaße annahm."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_09_a4"
        , "type": "message"
		, "label": "Es war das Ebolfieber"
		, "description": "Dein Schiffsarzt, sagt dass er eine Krankheit mit diesem Namen nicht kennt."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_10_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Die Männer reden über große Seefahrer und fragen dich, wer der Erste war, der die Südspitze von Afrika umsegelt hat?"
	, "choices": [
		{ "name": "hist_quiz_10_a1"
        , "type": "message"
		, "label": "Bartolomeu Dias"
		, "description": "Die Männer sehen, dass du dich mit der Seefahrtsgeschichte auskennst."
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "hist_quiz_10_a2"
        , "type": "message"
		, "label": "Giovanni Caboto"
		, "description": "Einer der Matrosen sagt, dass es Bartolomeu Dias war."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_10_a3"
        , "type": "message"
		, "label": "Dinis Dias"
		, "description": "Einer der Matrosen sagt, dass es Bartolomeu Dias war."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_10_a4"
        , "type": "message"
		, "label": "Amerigo Vespucci"
		, "description": "Einer der Matrosen sagt, dass es Bartolomeu Dias war."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_11_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Einige Seemänner an Bord reden am Abend über Christoph Kolumbus und seine Entdeckungsfahrten. Es entsteht eine Diskussion darüber, wo er den amerikanischen Kontinent erstmals betrat?"
	, "choices": [
		{ "name": "hist_quiz_11_a1"
        , "type": "message"
		, "label": "Auf den Bahamas"
		, "description": "Einer der Offiziere fügt hinzu, dass es ein 12. Oktober im Jahre 1492 war."
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "hist_quiz_11_a2"
        , "type": "message"
		, "label": "An der Küste Kolumbiens"
		, "description": "Dein erster Offizier sagt, dass Christoph Kolumbus zuerst auf den Bahamas gelandet sei und ist enttäuscht von deinem Wissen"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_11_a3"
        , "type": "message"
		, "label": "Auf der Insel Kuba"
		, "description": "Dein erster Offizier sagt, dass Christoph Kolumbus zuerst auf den Bahamas gelandet sei und ist enttäuscht von deinem Wissen"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_11_a4"
        , "type": "message"
		, "label": "Auf der halbinsel Florida"
		, "description": "Dein erster Offizier sagt, dass Christoph Kolumbus zuerst auf den Bahamas gelandet sei und ist enttäuscht von deinem Wissen"
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_12_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty4"]
	, "description": "Dein erster Offizier fragt dich, woher man nach der Wiederentdeckung Amerikas wusste, dass es ein neuer Kontinent sei?"
	, "choices": [
		{ "name": "hist_quiz_12_a1"
        , "type": "message"
		, "label": "Vasco Nunez de Balboa erreichte die Westküste Amerikas"
		, "description": "Durch Erreichen der Westküste war der Nachweis erbracht, dass es nicht Asien ist."
		, "outcome": {"player.morale": 10}
		}
		,{ "name": "hist_quiz_12_a2"
        , "type": "message"
		, "label": "Amerigo Vespucci erreichte die Westküste Amerikas"
		, "description": "Dein Offizier sagt, dass dieser Seefahrer die Vermutung äußerte, dass es ein unbekannter Kontinent sei aber er nicht den Nachweis erbrachte"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_12_a3"
        , "type": "message"
		, "label": "Alonso de Hojeda erreichte die Westküste Amerikas"
		, "description": "Dein Offizier sagt, dass dieser Seefahrer zwar Landgänge unternahm aber keinen Nachweis erbrachte "
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_12_a4"
        , "type": "message"
		, "label": "Ferdinand II. von Aragon erreichte die Westküste Amerikas"
		, "description": "Dein Offizier sagt, dass der spanische König sicher keine Expeditionen nach Amerika unternahm."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_13_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Ein paar Matrosen fragen dich unter wessen Kommando die zweite Weltumsegelung durchgeführt wurde?"
	, "choices": [
		{ "name": "hist_quiz_13_a1"
        , "type": "message"
		, "label": "Francis Drake führte das Kommando"
		, "description": "Dies war die Zweite und die erste Weltumsegelung, die unter einem Kommando begonnen und zum Ende geführt wurde"
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "hist_quiz_13_a2"
        , "type": "message"
		, "label": "Ferdinand Magellan führte das Kommando"
		, "description": "Ferdinand Magellan hatte das Kommando während der ersten Weltumsegelung. Er starb jedoch während der Expedition"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_13_a3"
        , "type": "message"
		, "label": "Christoph Kolumbus führte das Kommando"
		, "description": "Christoph Kolumbus hat nie eine Weltumsegelung durchgeführt, sagt die Gruppe."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_13_a4"
        , "type": "message"
		, "label": "Vasco da Gama führte das Kommando"
		, "description": "Vasco da Gama hat nie eine Weltumsegelung durchgeführt, sagt die Gruppe."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_14_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Ein paar Seeleute auf deinem Schiff fragen, wer als erster einen Seeweg nach Indien gefunden hat?"
	, "choices": [
		{ "name": "hist_quiz_14_a1"
        , "type": "message"
		, "label": "Vasco da Gama"
		, "description": "Er ist als Erster um das Kap der Guten Hoffnung gesegelt und fand auch einen Seeweg nach Indien"
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "hist_quiz_14_a2"
        , "type": "message"
		, "label": "Christoph Kolumbus"
		, "description": "Christoph Kolumbus hat einen Seeweg nach Indien gesucht, fand aber einen nach Amerika."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_14_a3"
        , "type": "message"
		, "label": "Francis Drake"
		, "description": "Sir Francis Drake umsegelte die Erde als bereits ein Seeweg nach Indien bekannt war."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_14_a4"
        , "type": "message"
		, "label": "Amerigo Vespucci"
		, "description": "Amerigo Vespucci verfasste den Reisebericht Mondu Novus, wo er über seine Reisen in die Neue Welt aber nicht nach Indien berichtete."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_15_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Deine Offiziere fragen dich, welches Königreich 1588 in der Seeschlacht von Gravelines der spanischen Armada gegenüberstand?"
	, "choices": [
		{ "name": "hist_quiz_15_a1"
        , "type": "message"
		, "label": "England"
		, "description": "England konnte die Schlacht unter hohen Verlusten für sich entscheiden und eine spanische Invasion verhindern"
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "hist_quiz_15_a2"
        , "type": "message"
		, "label": "Niederlande"
		, "description": "Die Niederlande waren kein Königreich, befanden sich aber im Krieg gegen Spanien."
		, "outcome": {"player.morale": -1}
		}
		,{ "name": "hist_quiz_15_a3"
        , "type": "message"
		, "label": "Belgien"
		, "description": "Zu dieser Zeit war Belgien ein Teil der spanischen Niederlande"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_15_a4"
        , "type": "message"
		, "label": "Frankreich"
		, "description": "Zu dieser Zeit stand Frankreich mit Spanien nicht im Krieg"
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_16_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty4"]
	, "description": "Einer deiner Offiziere fragt, wann James Cook eigentlich geboren wurde?"
	, "choices": [
		{ "name": "hist_quiz_16_a1"
        , "type": "message"
		, "label": "7. November 1728"
		, "description": "Deine Offiziere sind beeindruckt, wie vielfältig dein Wissen ist."
		, "outcome": {"player.morale": 10}
		}
		,{ "name": "hist_quiz_16_a2"
        , "type": "message"
		, "label": "7. November 1779"
		, "description": "Im November 1779 war James Cook bereits tod."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_16_a3"
        , "type": "message"
		, "label": "7. November 1628"
		, "description": "James Cook wurde 100 Jahre später geboren."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_16_a4"
        , "type": "message"
		, "label": "7. November 1679"
		, "description": "James Cook wurde erst etwa 49 jahre später geboren."
		, "outcome": {"player.morale": -5}
		}
	]
},{ "name": "hist_quiz_17_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty2"]
	, "description": "Die Mannschaft redet über die Erkundung des Pazifiks. Wie heißt der britische Seefahrer der weite Teile dieses Meeres vermaß, kartographierte und zur Verhinderung der Skorbut Pionierarbeit leistete?"
	, "choices": [
		{ "name": "hist_quiz_17_a1"
        , "type": "message"
		, "label": "James Cook"
		, "description": "Er kartographierte, vermaß und entdeckte einige Inseln im Pazifik."
		, "outcome": {"player.morale": 2}
		}
		,{ "name": "hist_quiz_17_a2"
        , "type": "message"
		, "label": "Abel Tasman"
		, "description": "Nach ihm ist Tasmanien benannt. Pionierarbeit gegen die Skorbut kam von ihm aber nicht"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_17_a3"
        , "type": "message"
		, "label": "Vitus Bering"
		, "description": "Nach ihm ist das Beringmeer benannt. Pionierarbeit gegen die Skorbut kam von ihm aber nicht"
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_17_a4"
        , "type": "message"
		, "label": "Dirk Hartog"
		, "description": "Er unternahm Seefahrten im Pazifik. Pionierarbeit gegen die Skorbut kam von ihm aber nicht."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_18_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Welcher Seefahrer konnte weite Teile der Beringstraße erstmals befahren ohne aber einen sicheren Nachweis zu bringen, dass Amerika und Asien nicht verbunden sind?"
	, "choices": [
		{ "name": "hist_quiz_18_a1"
        , "type": "message"
		, "label": "Vitus Bering"
		, "description": "Richtig! Das Beringmeer und die Beringstraße tragen seinen Namen."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "hist_quiz_18_a2"
        , "type": "message"
		, "label": "George Vancouver"
		, "description": "George vancouver wurde für die Erkundung der Westküste Nordamerikas bekannt."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_18_a3"
        , "type": "message"
		, "label": "Willem Barents"
		, "description": "Willem Barents war Entdecker und ist bekannt für eine Überwinterung in der Arktis."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_18_a4"
        , "type": "message"
		, "label": "Henry Hudson"
		, "description": "Henry Hudson unternahm Schiffsexpeditionen um die Nordwestpassage zu finden."
		, "outcome": {"player.morale": -2}
		}
	]
},{ "name": "hist_quiz_19_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty1"]
	, "description": "Wir haben das Jahr 1805. In der Seeschlacht am spanischen Kap Trafalgar kämpft die englische Flotte gegen die französische Flotte. Welches Land stellt sich außerdem gegen England?"
	, "choices": [
		{ "name": "hist_quiz_19_a1"
        , "type": "message"
		, "label": "Spanien"
		, "description": "Gemeinsam mit Frankreich verlor Spanien gegen die brittische Flotte. England behauptete sich so gegen Napoleon."
		, "outcome": {"player.morale": 1}
		}
		,{ "name": "hist_quiz_19_a2"
        , "type": "message"
		, "label": "Preußen"
		, "description": "Preußen war neutral und hatte keine ernstzunehmende Flotte."
		, "outcome": {"player.morale": -2}
		}
		,{ "name": "hist_quiz_19_a3"
        , "type": "message"
		, "label": "Schweden"
		, "description": "Schweden war Koalitionspartner gegen das napoleonische Frankreich."
		, "outcome": {}
		}
		,{ "name": "hist_quiz_19_a4"
        , "type": "message"
		, "label": "Russland"
		, "description": "Russland war Koalitionspartner gegen das napoleonische Frankreich."
		, "outcome": {}
		}
	]
},{ "name": "hist_quiz_20_quiz"
	, "type": "single-select"
	, "tags": ["water", "difficulty3"]
	, "description": "Wir schreiben den 21.10.1805. Wie heißt der britische Admiral der in der Schlacht von Trafalgar das Kommando über die Flotte des Vereinigten Königreiches Großbritannien und Irland hat?"
	, "choices": [
		{ "name": "hist_quiz_20_a1"
        , "type": "message"
		, "label": "Horatio Nelson"
		, "description": "Nelson starb heute in der Schlacht, jedoch führte seine Taktik zu einem Sieg über die französische Flotte"
		, "outcome": {"player.morale": 5}
		}
		,{ "name": "hist_quiz_20_a2"
        , "type": "message"
		, "label": "James Cook"
		, "description": "James Cook ist schon bereits seit über zwanzig Jahren verstorben"
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_20_a3"
        , "type": "message"
		, "label": "Charles Howard"
		, "description": "Charles Howard war Admiral unter Königin Elisabeth I."
		, "outcome": {"player.morale": -5}
		}
		,{ "name": "hist_quiz_20_a4"
        , "type": "message"
		, "label": "Francis Drake"
		, "description": "Francis Drake war Freibeuter und später Vizeadmiral unter Königin Elisabeth I."
		, "outcome": {"player.morale": -5}
		}
	]
}
	

]
);
