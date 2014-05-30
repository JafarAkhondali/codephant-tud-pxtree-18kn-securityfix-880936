
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
]

);
			
				
	
				
			
		
		
