
namespace("PXTree.AchtzehnKnoten.Data.Events",

[ { "name": "pirate_privateer"
	, "tags": ["open_sea", "atlantic"]
	, "description": "Dein Ausguck entdeckt ein Schiff am Horizont. Es scheint unter spanischer Flagge zu segeln. Wie möchtest du handeln?"
	,	"choices":
		[ { "name": "pirate_privateer_avoid"
			, "label": "Abdrehen und Abstand halten."
			, "description": "Du hälst Abstand zu dem Schiff. Diskretion ist die Mutter aller Tugenden."
			, "outcome":
				{}
			}
		, { "name": "pirate_privateer_investigate"
			, "label": "Kurs beibehalten und einen Austausch mit dem anderen Schiff anregen."
			, "description": "Als du dich dem Schiff näherst, hissen sie eine schwarze Flagge. Es sind portugiesische Freibeuter!"
			, "choices":
				[ { "name": "pirate_privateer_battle"
					, "label": "Zum Kampf vorbereiten."
					, "outcome":
						{ "player.food": -50
						, "player.crewCount": -6
						}
					}
				, { "name": "pirate_privateer_evade"
					, "label": "Ausweichmanöver und fliehen!"
					, "outcome":
						{}
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
						{ "player.morale": +2
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
				{ "player.food": -10
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
							, "description": "Du überfällst den Stamm in der nächsten Nacht und erbeutest ihre Schätze und Vorräte. Ob das richtig war..."
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
	, "tags": ["open_sea"]
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
			, "description": "Deine Crew nimmt ein paar Reparaturen an den Segeln und der Takelage vor."
			, "outcome":
				{ "ship.speed": +0.1
				, "player.food": -15 }
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
	, "tags": ["open_sea", "atlantic"]
	, "description": "Skorbut hat ein Mitglied deiner Crew dahingerafft!"
	, "outcome":
		{ "player.crewCount": -1 }
	}
	
	






]

);
			
				
	
				
			
		
		
