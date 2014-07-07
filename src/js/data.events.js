
namespace("PXTree.AchtzehnKnoten.Data.Events",

[ { "name": "fallback-nice-weather"
	, "tags": [ "fallback" ]
	, "type": "message"
	, "description": "Es ist ein ruhiger Tag auf See und das Wetter ist schön, während eine kräftige Brise das Schiff vorantreibt. Einige deiner Leute werfen die Angeln ins Wasser."
	, "ok":
		{ "outcome":
			{ "player.food": [0, 5]
			}
		}
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
	
, { "name": "ship_ahoy_pirate"
	, "tags": ["open_sea"]
	, "description": "Dein Ausguck entdeckt ein Schiff am Horizont. Es scheint unter spanischer Flagge zu segeln. Wie möchtest du handeln?"
	,	"choices":
		[ { "name": "ship_ahoy_pirate_avoid"
			, "label": "Abdrehen und Abstand halten."
			, "description": "Du hälst Abstand zu dem Schiff. Diskretion ist die Mutter aller Tugenden."
			, "outcome":
				{}
			}
		, { "name": "ship_ahoy_pirate_investigate"
			, "label": "Kurs beibehalten und einen Austausch mit dem anderen Schiff anregen."
			, "description": "Als du dich dem Schiff näherst, hissen sie eine schwarze Flagge. Es sind portugiesische Freibeuter!"
			, "choices":
				[ { "name": "ship_ahoy_pirate_battle"
					, "label": "Zum Kampf vorbereiten."
					, "outcome":
						{ "player.food": [0,500]
						, "player.crewCount": [-10,0]
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
	, "tags": ["open_sea"]
	, "description": "Dein Ausguck entdeckt ein Schiff am Horizont. Es scheint unter spanischer Flagge zu segeln. Wie möchtest du handeln?"
	,	"choices":
		[ { "name": "ship_ahoy_friendly_avoid"
			, "label": "Abdrehen und Abstand halten."
			, "description": "Du hälst Abstand zu dem Schiff. Diskretion ist die Mutter aller Tugenden."
			, "outcome":
				{}
			}
		, { "name": "ship_ahoy_friendly_investigate"
			, "label": "Kurs beibehalten und einen Austausch mit dem anderen Schiff anregen."
			, "description": "Es ist ein Handelsschiff. Der Kapitän begrüsst dich. Was möchtest du tun?"
			, "choices":
				[ { "name": "ship_ahoy_friendly_buy_1"
					, "label": "Nahrung für 100 Gold kaufen."
					, "outcome":
						{ "player.food": +100
						, "player.gold": -100
						}
					}
				, { "name": "ship_ahoy_friendly_buy_2"
					, "label": "Nahrung für 200 Gold kaufen."
					, "outcome":
						{ "player.food": +200
						, "player.gold": -200
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
	, "tags": ["open_sea"]
	, "description": "Ein Crewmitglied fragt nach dem Breitengrad. Was antwortest du?"
	,	"choices":
		[ { "name": "crew_latitude_deny"
			, "label": "Der Kurs bleibt Sache des Kapitäns!."
			, "description": "Die Crew wird ein wenig misstrauisch."
			, "outcome":
				{ "player.morale": -1 
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
						{ "player.morale": -1
						}
					}
				, { "name": "crew_latitude_sun"
					, "label": "Mit dem Stand der Sonne/Sterne."
					, "description": "Du bestimmst den Breitengrad mit Hilfe der Sonne/Sterne. Deine Crew fühlt sich in ihr Vertrauen in deine navigatorischen Fähigkeiten bestätigt."
					, "outcome":
						{ "player.morale": 0
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
				{ "player.food": -5
				}
			}
		, { "name": "native_island_anchor"
			, "label": "Vor Anker gehen. Wer weiß, was für Reichtümer dich hier erwarten könnten?."
			, "description": "Du gehst vor Anker und ruderst mit deinen Beibooten zur Insel. Was möchtest du tun?"
			, "choices":
				[ { "name": "native_island_beach"
					, "label": "Ein Paar Vorräte am Strand sammeln."
					, "description": "Deine Crew sammelt ein wenig Holz und Früchte am Strand. Die Ausbeute ist mager, aber man nimmt was man kriegen kann."
					, "outcome":
						{ "player.food": +10
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
								, "player.food": +30
								}
							}
						, { "name": "native_island_food"
							, "label": "Frage nach Nahrung."
							, "description": "Die Verständigung ist nicht leicht, aber du fragst den Stamm, wo es auf der Insel Nahrung zu finden gibt. Sie zeigen dir ihre Jagdgründe und du kannst ein paar Tiere erlegen."
							, "outcome":
								{ "player.food": +20
								}
							}
						, { "name": "native_island_raid"
							, "label": "Überfalle den Stamm in der nächsten Nacht."
							, "description": "Du überfällst den Stamm in der nächsten Nacht und erbeutest ihre Schätze und Vorräte, einige deiner Männer sterben dabei. Ob das richtig war..."
							, "outcome":
								{ "player.crewCount": -3
								, "player.morale": -5
								, "player.food": +50
								}
						} ]
					}
				]
			}
		]
	}

, { "name": "no_wind"
	, "tags": ["open_sea", "atlantic", "island"]
	, "description": "Flaute! Deine Crew fragt dich, was sie tun soll."
	, "choices":
		[ { "name": "no_wind_fish"
			, "label": "Versuche zu Angeln."
			, "description": "Deine Crew fängt ein paar Fische."
			, "outcome":
				{ "player.food": +15 }
			}
		, { "name": "no_wind_sail"
			, "label": "Die Takelage und die Segel überprüfen."
			, "description": "Die Takelage ist in Top-Form. Deine Männer sind umsonst auf den Masten herumgeklettert."
			, "outcome":
				{ //"ship.speed": +0.1
				  "player.food": -15 }
			}
		, { "name": "no_wind_free"
			, "label": "Der Mannschaft den Tag frei geben."
			, "description": "Deine Crew genießt einen freien Tag."
			, "outcome":
				{ "player.morale": +5
				, "player.food": -15 }
			}
		]
	}
	
, { "name": "scurvy"
	, "tags": ["open_sea"]
	, "description": "Skorbut hat ein Mitglied deiner Crew dahingerafft!"
	, "ok":
		{ "outcome":
			{ "player.crewCount": -1 }
		}
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
			, "label": "Versuche etwas gegen die Unterdrückung der Ureinwohner zu tun."
			, "description": "Du kannst nicht mit ansehen, wie die Ureinwohner der Kanaren, die Guanchen, unterdrückt werden. Du befreist Nachts ein Sklavencamp und überlässt ihnen ein paar deiner Waffen, damit sie sich verteidigen können. Deine Crew bewundert dein selbstloses handeln."
			, "outcome":
				{ "player.strength": -5
				, "player.morale": 5}
			}
		]
	}
	,{ "name": "geo_quiz_01_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level3"]
	, "description": "Wie heißt die südlichste Landspitze Afrikas?"
	, "choices": [
		{ "name": "geo_quiz_01_a1"
        , "type": "message"
		, "label": "Kap Agulhas"
		, "description": "Richtig. Übersetzt bedeutet es soviel wie 'Kap der Nadeln', was wahrscheinlich auf die vielen scharfen Felsen des Riffs zurückzuführen ist."
		, "outcome": {"player.gold": 1000, "player.food": 100, "player.strength": 5, "player.morale": 5}
		}
		,{ "name": "geo_quiz_01_a2"
        , "type": "message"
		, "label": "Kap der Guten Hoffnung"
		, "description": "Das Kap der guten Hoffnung ist, anders als oft vermutet, nicht die südlichste Landspitze von Afrika."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strenth": -5, "player. morale": -5}
		}
		,{ "name": "geo_quiz_01_a3"
        , "type": "message"
		, "label": "Kap Farvel"
		, "description": "Das ist leider nicht korrekt."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_01_a4"
        , "type": "message"
		, "label": "Kap Hafun"
		, "description": "Das ist nicht richtig."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
	]
},{ "name": "geo_quiz_03_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "In welcher Jahreszeit kommt es nördlich des Nordpolarkreises zu lang anhaltender Tag und Nacht Dunkelheit?"
	, "choices": [
		{ "name": "geo_quiz_03_a1"
        , "type": "message"
		, "label": "Während des Winter"
		, "description": "Das ist die Richitge Antwort. Deine Crew gewinnt vertrauen in deinen Fähigkeiten"
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.morale": 2}
		}
		,{ "name": "geo_quiz_03_a2"
        , "type": "message"
		, "label": "Während des Fürhjahres"
		, "description": "Das ist leider die falsche Antwort."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_03_a3"
        , "type": "message"
		, "label": "Während des Sommers"
		, "description": " Das ist leider die falsche Antwort."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_03_a4"
        , "type": "message"
		, "label": "Während des Herbstes"
		, "description": " Das ist leider die falsche Antwort."
		, "outcome": {"player.gold": -500, "player.food": -25, "player strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_04_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level1"]
	, "description": "Welche geographische Breite hat der südliche Polarkreis?"
	, "choices": [
		{ "name": "geo_quiz_04_a1"
        , "type": "message"
		, "label": "66,5°S"
		, "description": " Richtig! Deine Crew vertraut dir."
		, "outcome": {"player.gold": 100, "player.food": 10, "player.strength": 1, "player.morale": 1}
		}
		,{ "name": "geo_quiz_04_a2"
        , "type": "message"
		, "label": "66,5°N"
		, "description": " Ein guter Kapitän würde es besser wissen!"
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_04_a3"
        , "type": "message"
		, "label": "90,0°S"
		, "description": " Das ist der geographische Südpol und nicht der südliche Polarkreis. Deine Crew hat leichte Zweifel an deinen Fähigkeiten"
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_04_a4"
        , "type": "message"
		, "label": "23,5°S"
		, "description": " Der südliche Polarkreis, nicht der südliche Wendekreis. Deine Crew hat leichte Zweifel an deinen Fähigkeiten."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_05_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "Welche Meeresströmung hält im Winter die norwegischen Seehäfen weitgehend eisfrei?"
	, "choices": [
		{ "name": "geo_quiz_05_a1"
        , "type": "message"
		, "label": "Der Nordatlantikstrom"
		, "description": "Vollkommen richtig!"
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.morale": 2}
		}
		,{ "name": "geo_quiz_05_a2"
        , "type": "message"
		, "label": "Der Golfstrom"
		, "description": "Der Golfstrom wird im Nordatlantik zum Nordatlantikstrom und hält die Seehäfen eisfrei"
		, "outcome": {"player.gold": 100, "player.food": 10, "player.strength": 1, "player.morale": 1}
		}
		,{ "name": "geo_quiz_05_a3"
        , "type": "message"
		, "label": "Der Kanarenstrom"
		, "description": "Der Kanarenstrom ist eine kalte Meereströmung. Das kostet dich etwas Gold und Nahrung"
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_05_a4"
        , "type": "message"
		, "label": "Der Labradorstrom"
		, "description": "Der Labradorstrom ist eine kalte Meereströmung  und fließt zwischen Grönland und Amerika in Richtung Süden."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3}
		}
	]
},{ "name": "geo_quiz_06_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level1"]
	, "description": "In etwa 97% des Wassers auf der Erde ist Salzwasser. Das restliche Süßwasser ist beinahe zu 70% Gletschereis. Wo findet man die größten Süßwasservorräte?"
	, "choices": [
		{ "name": "geo_quiz_06_a1"
        , "type": "message"
		, "label": "In der Antarktis"
		, "description": " So gut, wie der gesamte Kontinent ist vergletschert und speichert die größten Süßwasservorräte"
		, "outcome": {"player.gold": 100, "player.food": 10, "player.strength": 1, "player.morale": 1}
		}
		,{ "name": "geo_quiz_06_a2"
        , "type": "message"
		, "label": "In Grönland"
		, "description": " In Grönland gibt es die größten Gletscher außerhalb des Antarktis, die als größter Süßwasserspeicher gilt."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_06_a3"
        , "type": "message"
		, "label": "Auf dem Nordpol"
		, "description": " Das ist die falsche Antwort. Die größten Reservern sind in der Antarktis gespeichert."
		, "outcome": { "player.gold": -500, "player.food": -25, "player.strentgh": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_06_a4"
        , "type": "message"
		, "label": "In den Gletschervorkommen der Hochgebirge"
		, "description": " Die Hochgebirgsgletscher speichern bei weitem nicht die Menge an Süßwasser, wie die Antarktis."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_07_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level3"]
	, "description": "Wo liegt das Meeresgebiet Kattegat?"
	, "choices": [
		{ "name": "geo_quiz_07_a1"
        , "type": "message"
		, "label": "Das Kattegat liegt zwischen Dänemark und Schweden."
		, "description": "Richtige Antwort. Das Kattegat ist ein in etwa 80 Meter tiefes und relativ schwer schiffbares Meeresgebiet zwischen Dänemark und Schweden"
		, "outcome": {"player.gold": 1000, "player.food": 50, "player.strength": 5, "player.morale": 5}
		}
		,{ "name": "geo_quiz_07_a2"
        , "type": "message"
		, "label": "Das Kattegat liegt zwischen Schweden, Dänemark und Norwegen."
		, "description": " Das Kattegat grenzt nicht an Norwegen. Die Mannschaft verwechselt selber manchmal Kattegat und Skagerrak und verliert deshalb kein Vertrauen"
		, "outcome": {"player.gold": 0, "player.food": 0, "player.strength": 0, "player. morale": 0}
		}
		,{ "name": "geo_quiz_07_a3"
        , "type": "message"
		, "label": "Das Kattegat liegt zwischen Dänemark und dem Gebiet des Heiligen Römischen Reich Deutscher Nation."
		, "description": "Das stimmt aber nicht, meint dein erster Offizier. Es liegt zwischen Dänemark und Schweden!"
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_07_a4"
        , "type": "message"
		, "label": "Das Kattegat liegt zwischen Norwegen und Dänemark."
		, "description": "Das stimmt aber nicht, meint dein erster Offizier. Es liegt zwischen Dänemark und Schweden!"
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
	]
},{ "name": "geo_quiz_08_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "Die Inselgruppe Spitzbergen liegt in welchem Meeresgebiet?"
	, "choices": [
		{ "name": "geo_quiz_08_a1"
        , "type": "message"
		, "label": "Spitzbergen liegt im Nordatlantik."
		, "description": "Vollkommen Richtig! Deine Mannschaft sieht, dass du wichtige geographische Kentnisse hast."
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.morale": 2}
		}
		,{ "name": "geo_quiz_08_a2"
        , "type": "message"
		, "label": "Spitzbergen liegt im Atlantik."
		, "description": "Dein Erster Offizier ergänzt dich und sagt dass es genauer im Nordatlantik liegt."
		, "outcome": {"player.gold": 100, "player.food": 10, "player.strength": 1, "player.morale": 1}
		}
		,{ "name": "geo_quiz_08_a3"
        , "type": "message"
		, "label": "Spitzbergen liegt im Pazifik."
		, "description": "Die Mannschaft zweifelt an deinen geographischen Kenntnissen. Einer der Matrosen sagt, dass es im Nordatlantik liegt."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_08_a4"
        , "type": "message"
		, "label": "Spitzbergen liegt im Beringmeer."
		, "description": "Die Mannschaft zweifelt an deinen geographischen Kenntnissen. Einer der Matrosen sagt, dass es im Nordatlantik liegt."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_09_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "Die Doggerbank ist eine Untiefe in welchem Meeresgebiet?"
	, "choices": [
		{ "name": "geo_quiz_09_a1"
        , "type": "message"
		, "label": "Die Doggerbank liegt in der Nordsee"
		, "description": "Richtig. Du zeigst, dass du Kenntnisse über die Meere und deren Untiefen hast."
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.moral": 2}
		}
		,{ "name": "geo_quiz_09_a2"
        , "type": "message"
		, "label": "Die Doggerbank liegt in der Ostsee"
		, "description": "Das stimmt nicht. Sie liegt in der Nordsee, meint dein erster Offizier."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.moral": -2}
		}
		,{ "name": "geo_quiz_09_a3"
        , "type": "message"
		, "label": "Die Doggerbank liegt in dem Atlantik"
		, "description": "Das stimmt nicht. Sie liegt in der Nordsee, meint dein erster Offizier."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.moral": -2}
		}
		,{ "name": "geo_quiz_09_a4"
        , "type": "message"
		, "label": "Die Doggerbank liegt in dem Norpolarmeer"
		, "description": "Das stimmt nicht. Sie liegt in der Nordsee, meint dein erster Offizier."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.moral": -2}
		}
	]
},{ "name": "geo_quiz_10_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "Welche Landspitze wird als Kap Hoorn bezeichnet?"
	, "choices": [
		{ "name": "geo_quiz_10_a1"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Südamerika."
		, "description": "Du hast offensichtlich wichtige Voraussetzungen um mit deiner Mannschaft sicher über die Meere zu segeln!"
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.morale": 2}
		}
		,{ "name": "geo_quiz_10_a2"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Indien."
		, "description": "Die südlichste Landspitze von Indien ist das Kap Komorin."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_10_a3"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Afrika."
		, "description": "Die südlichste Landspitze von Afrika ist das Kap Agulhas."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_10_a4"
        , "type": "message"
		, "label": "Die südlichste Landspitze von Grönland."
		, "description": " Die südlichste Landspitze von Grönland ist das kao Farvel."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_11_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level1"]
	, "description": "In welchem Ozean liegen die Kanarischen Inseln"
	, "choices": [
		{ "name": "geo_quiz_11_a1"
        , "type": "message"
		, "label": "Im Atlantik."
		, "description": "Richtig! Du wirst in den Weltmeeren deine Ziele finden."
		, "outcome": {"player.gold": 100, "player.food": 10, "player.strength": 1, "player.morale": 1}
		}
		,{ "name": "geo_quiz_11_a2"
        , "type": "message"
		, "label": "Im Indischen Ozean."
		, "description": "Du wirst auf den Weltmeeren wahrscheinlich öfter die falschen Orte ansteuern."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_11_a3"
        , "type": "message"
		, "label": "Im Pazifik."
		, "description": "Dort wirst du vielleicht eines Tages Hawai ansteuern aber sicher nicht die Kanarischen Inseln."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_11_a4"
        , "type": "message"
		, "label": "Im Antarktischen Ozean."
		, "description": " Wenn deine seemännischen Kenntnisse ähnlich gut sind, dann wirst du im Antarktischen Ozean vermutlich kentern."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_12_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level4"]
	, "description": "Die Passatwinde treten bis ca. 30° nördlicher und südlicher Breite auf. Welche Windrichtung haben die Passatwinde nördlich bzw. südlich des Äquators?"
	, "choices": [
		{ "name": "geo_quiz_12_a1"
        , "type": "message"
		, "label": "Man spricht von dem Nord- und Südost Passat"
		, "description": " Dein erster Offizier und die Mannschaft ist stolz unter deinem Kommando zu segeln."
		, "outcome": {"player.gold": 2000, "player.food": 100, "player.strength": 10, "player.morale": 10}
		}
		,{ "name": "geo_quiz_12_a2"
        , "type": "message"
		, "label": "Man spricht von dem Nord- und Südwest Passat"
		, "description": " So wirst du nicht schnell an dein Ziel kommen."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_12_a3"
        , "type": "message"
		, "label": "Man spricht von dem Nord- und Süd Passat"
		, "description": " So wirst du nicht schnell an dein Ziel kommen. "
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_12_a4"
        , "type": "message"
		, "label": "Man spricht von dem West- und Ost Passat"
		, "description": " So wirst du nicht schnell an dein Ziel kommen. "
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
	]
},{ "name": "geo_quiz_13_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level4"]
	, "description": "Welcher Wind entsteht nicht aufgrund der Corioliskraft?"
	, "choices": [
		{ "name": "geo_quiz_13_a1"
        , "type": "message"
		, "label": "Der Bora"
		, "description": "Mit diesem Wissen über die Winde wirst du stets schnell segeln. Die Mannschaft arbeitet unter deinem Kommando mit vollem Engagement in der Takelage."
		, "outcome": {"player.gold": 2000, "player.food": 100, "player.strength": 10, "player.morale": 10}
		}
		,{ "name": "geo_quiz_13_a2"
        , "type": "message"
		, "label": "Der Passat"
		, "description": "Dein Wissen über die Winde wird nicht reichen um besonders schnell auf den Meeren zu segeln."
		, "outcome": {"player.gold": -1000, "player.food": - 50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_13_a3"
        , "type": "message"
		, "label": "Der Jetstream"
		, "description": "Die Mannschaft hat gerade starke Zweifel an deinen seemännischen Fähigkeiten."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_13_a4"
        , "type": "message"
		, "label": "Ein tropischer Wirbelsturm"
		, "description": "Mit diesem Wissen wirst du wahrscheinlich dein Schiff in den nächsten Wirbelsturm geleiten."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
	]
},{ "name": "geo_quiz_14_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "In Welchem Meer liegt die Karibik?"
	, "choices": [
		{ "name": "geo_quiz_14_a1"
        , "type": "message"
		, "label": "Sie liegt im Atlantischen Ozean"
		, "description": "Mit deinem Geographiewissen wirst du sicher navigieren können."
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.morale": 1}
		}
		,{ "name": "geo_quiz_14_a2"
        , "type": "message"
		, "label": "Sie liegt im Pazifischen Ozean"
		, "description": "Im Pazifik wirst du vielleicht irgendwann Australien erreichen, aber sicher nicht die Karibischen Inseln."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_14_a3"
        , "type": "message"
		, "label": "Sie liegt im Golf von Mexiko"
		, "description": "Die Karibik grenzt im Westen an das Meeresgebiet des Golfes von Mexiko."
		, "outcome": {"player.gold": 100, "player.food": 10, "player.strength": 1, "player.morale": 1}
		}
		,{ "name": "geo_quiz_14_a4"
        , "type": "message"
		, "label": "Sie liegt im Mittelmeer"
		, "description": "Die Balearen liegen im Mittelmeer. Die Gruppe der Karibischen Inseln nicht."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_15_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level3"]
	, "description": "In welchem Meer liegt der Atacamagraben?"
	, "choices": [
		{ "name": "geo_quiz_15_a1"
        , "type": "message"
		, "label": "Im Pazifischen Ozean"
		, "description": "Der Atacamagraben ist eine Tiefseerinne und liegt im südöstlichen Pazifik vor Südamerika."
		, "outcome": {"player.gold": 1000, "player.food": 50, "player.strength": 5, "player.morale": 5}
		}
		,{ "name": "geo_quiz_15_a2"
        , "type": "message"
		, "label": "Im Atlatischen Ozean"
		, "description": "Das kostet dich einiges an Gold und Nahrung."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_15_a3"
        , "type": "message"
		, "label": "Im Indischen Ozean"
		, "description": "Das kostet dich einiges an Gold und Nahrung."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_15_a4"
        , "type": "message"
		, "label": "Im Arktischen Ozean"
		, "description": "Das kostet dich einiges an Gold und Nahrung."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
	]
},{ "name": "geo_quiz_16_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level4"]
	, "description": "Welche Meeresströmung fließt nicht im Atlantik?"
	, "choices": [
		{ "name": "geo_quiz_16_a1"
        , "type": "message"
		, "label": "Der Humboldt-Strom"
		, "description": "Du zeigst deiner Mannschaft, dass du dich hervorragend mit den Weltmeeren auskennst."
		, "outcome": {"player.gold": 2000, "player.food": 100, "player.strength": 10, "player.morale": 10}
		}
		,{ "name": "geo_quiz_16_a2"
        , "type": "message"
		, "label": "Der Kap Hoorn-Strom"
		, "description": "Dein erster Offizier, berichtigt dich höflich und sagt, dass er im Atlantik und Pazifik fließt."
		, "outcome": {"player.gold": 100, "player.food": 10, "player.strength": 1, "player.morale": 1}
		}
		,{ "name": "geo_quiz_16_a3"
        , "type": "message"
		, "label": "Der Falklandstrom"
		, "description": "Dein erster Offizier verliert Vertrauen und die Moral der Mannschaft sinkt."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_16_a4"
        , "type": "message"
		, "label": "Der Golfstrom"
		, "description": "Dein erster Offizier verliert Vertrauen und die Moral der Mannschaft sinkt."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
	]
},{ "name": "geo_quiz_17_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level4"]
	, "description": "Du erblickst Land. Dein erster Offizier meint es sei ein Archipel. Was ist ein Archipel, fragst du dich?"
	, "choices": [
		{ "name": "geo_quiz_17_a1"
        , "type": "message"
		, "label": "Eine Inselgruppe mit dem dazwischen liegende Gewässer"
		, "description": "Dein erster Offizier, sieht dass du auch Wissen über die Meere hast"
		, "outcome": {"player.gold": 2000, "player.food": 100, "player.strength": 10, "player.morale": 10}
		}
		,{ "name": "geo_quiz_17_a2"
        , "type": "message"
		, "label": "Eine Insel vulkanischen Ursprunges"
		, "description": "Dein erster Offizier berichtigt dich und meint es sei eine Inselgruppe mit dem dazwischen liegenden Gewässer."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": 5, "player.morale": 5}
		}
		,{ "name": "geo_quiz_17_a3"
        , "type": "message"
		, "label": "Eine Halbinsel"
		, "description": "Dein erster Offizier berichtigt dich und meint es sei eine Inselgruppe mit dem dazwischen liegenden Gewässer."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": 5, "player.morale": 5}
		}
		,{ "name": "geo_quiz_17_a4"
        , "type": "message"
		, "label": "Eine Landspitze im Meer"
		, "description": "Dein erster Offizier berichtigt dich und meint es sei eine Inselgruppe mit dem dazwischen liegenden Gewässer."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": 5, "player.morale": 5}
		}
	]
},{ "name": "geo_quiz_18_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level3"]
	, "description": "Du bist mit deinem Schiff auf hoher See und die Sonne brennt. Einer deiner Matrosen fragt, wo die Sonne Zenit steht?"
	, "choices": [
		{ "name": "geo_quiz_18_a1"
        , "type": "message"
		, "label": "Die Sonne steht innerhalb des nördlichen und südlichen Wendekreises im Zenit"
		, "description": "Die Mannschaft sieht, dass du wichtige geographische Kenntnisse hast."
		, "outcome": {"player.gold": 1000, "player.food": 50, "player.strength": 5, "player.morale": 5}
		}
		,{ "name": "geo_quiz_18_a2"
        , "type": "message"
		, "label": "Die Sonne steht innerhalb des Jahres zwischen den Polarkreisen und den Wendekreisen im Zenit."
		, "description": "Die Mannschaft sieht, dass dir wichtige geographische Kenntnisse fehlen."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_18_a3"
        , "type": "message"
		, "label": "Die Sonne kann ausschließlich auf dem Äquator im Zenit stehen"
		, "description": "Die Mannschaft sieht, dass dir wichtige geographische Kenntnisse fehlen."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
		,{ "name": "geo_quiz_18_a4"
        , "type": "message"
		, "label": "Die Sonne kann ausschließlich auf den Polen im Zenit stehen"
		, "description": "Die Mannschaft sieht, dass dir wichtige geographische Kenntnisse fehlen."
		, "outcome": {"player.gold": -1000, "player.food": -50, "player.strength": -5, "player.morale": -5}
		}
	]
},{ "name": "geo_quiz_19_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "Du bist in der Karibik und musst eine der Inseln der kleinen Antillen anlaufen. Welche INsel kannst du ansteuern?"
	, "choices": [
		{ "name": "geo_quiz_19_a1"
        , "type": "message"
		, "label": "Trinidad und Tobago"
		, "description": "Es scheint so, als würdest du dich in der Karibik auskennnen!"
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.morale":2}
		}
		,{ "name": "geo_quiz_19_a2"
        , "type": "message"
		, "label": "Hispaniola"
		, "description": "Es scheint so, als würdest du dich nicht in der Karibik auskennnen!"
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_19_a3"
        , "type": "message"
		, "label": "Puerto Rico"
		, "description": "Es scheint so, als würdest du dich nicht in der Karibik auskennnen!"
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_19_a4"
        , "type": "message"
		, "label": "Kuba"
		, "description": "Es scheint so, als würdest du dich nicht in der Karibik auskennnen!"
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
},{ "name": "geo_quiz_20_quiz"
	, "type": "single-select"
	, "tags": ["open_sea", "level2"]
	, "description": "Dein Schiff soll Neufundland anlaufen. Dein Mannschaft möchte wissen, wo es liegt."
	, "choices": [
		{ "name": "geo_quiz_20_a1"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Ostküste von Nordamerika."
		, "description": "Die Offiziere sind beruhigt, dass wenigstens du weißt wo es hingehen soll."
		, "outcome": {"player.gold": 500, "player.food": 25, "player.strength": 3, "player.morale":2}
		}
		,{ "name": "geo_quiz_20_a2"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Westküste von Nordamerika."
		, "description": "Die Offiziere sind beunruhigt, dass du nicht weißt wo es hingehen soll."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_20_a3"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Westküste von Afrika."
		, "description": "Die Offiziere sind beunruhigt, dass du nicht weißt wo es hingehen soll."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
		,{ "name": "geo_quiz_20_a4"
        , "type": "message"
		, "label": "Neufundland ist eine Insel an der Ostküste von Afrika."
		, "description": "Die Offiziere sind beunruhigt, dass du nicht weißt wo es hingehen soll."
		, "outcome": {"player.gold": -500, "player.food": -25, "player.strength": -3, "player.morale": -2}
		}
	]
}
	

]
);
