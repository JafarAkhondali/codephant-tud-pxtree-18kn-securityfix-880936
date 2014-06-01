
namespace("PXTree.AchtzehnKnoten.Data.Events",

[ { "name": "pirate_privateer"
	, "tags": ["open_sea", "atlantic"]
	, "description": "Dein Ausguck entdeckt ein Schiff am Horizont. Es scheint unter spanischer Flagge zu segeln. Wie möchtest du handeln?"
	,	"choices":
		[ { "name": "pirate_privateer_avoid"
			, "label": "Abdrehen und Abstand halten."
			, "description": "Du hälst Abstand zu dem Schiff. Diskretion ist die Mutter aller Tugenden."
			, "outcome": {}
			}
		, { "name": "pirate_privateer_investigate"
			, "label": "Kurs beibehalten und einen Austausch mit dem anderen Schiff anregen."
			, "description": "Als du dich dem Schiff näherst, hissen sie eine schwarze Flagge. Es sind portugiesische Freibeuter!"
			, "choices":
				[ { "name": "pirate_privateer_battle"
					, "label": "Zum Kampf vorbereiten."
					, "outcome": {}
					}
				, { "name": "pirate_privateer_evade"
					, "label": "Ausweichmanöver und fliehen!"
					, "outcome": {}
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
			, "outcome": {}
			}
		, { "name": "crew_latitude_try"
			, "label": "Versuche, den Breitengrad zu bestimmen."
			, "description": "Du willst den Breitengrad bestimmen. Wie gehst du vor?"
			, "choices":
				[ { "name": "crew_latitude_compass"
					, "label": "Mit dem Kompass."
					, "description": "Dein Crewmitglied schaut dich verwirrt an: 'Captain, ich dachte den Breitengrad bestimmt man dem Stand der Sonne oder der Sterne?'"
					, "outcome": {}
					}
				, { "name": "crew_latitude_sun"
					, "label": "Mit dem Stand der Sonne/Sterne."
					, "description": "Du bestimmst den Breitengrad mit Hilfe der Sonne/Sterne. Deine Crew fühlt sich in ihr Vertrauen in deine navigatorischen Fähigkeiten bestätigt."
					, "outcome": {}
					}
				]
			}
		]
	}
	
	, { "name": "native_island"
	, "tags": ["island"]
	, "description": "Land in Sicht!"
	,	"choices":
		[ { "name": "native_island_ignore"
			, "label": "Weitersegeln."
			, "description": "Deine Reise ist wichtiger als so eine kleine Insel."
			, "outcome": {}
			}
		, { "name": "native_island_anchor"
			, "label": "Vor Anker gehen. Wer weiß, was für Reichtümer dich hier erwarten könnten?."
			, "description": "Du gehst vor Anker und ruderst mit deinen Beibooten zur Insel. Was möchtest du tun?"
			, "choices":
				[ { "name": "native_island_beach"
					, "label": "Ein Paar Vorräte am Strand sammeln."
					, "description": "Deine Crew sammelt ein wenig Holz und Früchte am Strand. Die Ausbeute ist mager, aber man nimmt was man kriegen kann."
					, "outcome": {}
					}
				, { "name": "native_island_inland"
					, "label": "Das Inland erforschen."
					, "description": "Du entdeckst einen Stamm von Ureinwohnern. Sie sind ein wenig Misstrauisch, aber sie scheinen dir freundlich gesinnt zu sein."
					, "outcome": {}
					, "choices":
						[ { "name": "native_island_trade"
							, "label": "Handle Waffen gegen Vorräte."
							, "description": "Nach einer kurzen Demonstration deiner Waffen ist der Stamm zu einem Handel bereit."
							, "outcome": {}
							}
						, { "name": "native_island_food"
							, "label": "Frage nach Nahrung."
							, "description": "Die Verständigung ist nicht leicht, aber du fragst den Stamm, wo es auf der Insel Nahrung zu finden gibt. Sie zeigen dir ihre Jagdgründe und du kannst ein paar Tiere erlegen."
							, "outcome": {}
							}
						, { "name": "native_island_raid"
							, "label": "Überfalle den Stamm in der nächsten Nacht."
							, "description": "Du überfällst den Stamm in der nächsten Nacht und erbeutest ihre Schätze und Vorräte. Ob das richtig war..."
							, "outcome": {}
						} ]
					}
				]
			}
		]
	}
	
	






]

);
			
				
	
				
			
		
		
