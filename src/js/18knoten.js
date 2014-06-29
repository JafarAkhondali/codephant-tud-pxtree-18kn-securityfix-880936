
namespace("PXTree.AchtzehnKnoten", function(AK)
{
	AK.Game = function Game ()
	{
		this.parent = null;
		this.top = this;
		this.game = new Phaser.Game(
				AK.Config.Game.Width,
				AK.Config.Game.Height,
				Phaser.AUTO, '', null);
		
		this.loadSaveData();
	}

	
	on(AK.Game.prototype, function (def)
	{
		def.run = function run ()
		{
			this.game.state.add(AK.MainMenu.key, AK.MainMenu());
			this.game.state.add(AK.Play.key, AK.Play());
			this.game.state.add(AK.Credits.key, AK.Credits());
			this.game.state.start(AK.MainMenu.key, true, false, this);
		};
		
		def.resetSaveData = function resetSaveData ()
		{
			localStorage.removeItem('Stats');
			localStorage.removeItem('currentLevel');
			localStorage.removeItem('enteringFrom');
			this.loadSaveData();
		};

		def.loadSaveData = function loadSaveData ()
		{
			this.currentLevel = parseInt(localStorage.getItem('currentLevel') || '0');
			this.currentSpotNr = 0;
			this.enteringFrom = localStorage.getItem('enteringFrom') || 'east';
			
			//TODO replace with gathering of actual data.
			this.stats = new AK.Stats(localStorage.getItem('Stats')
					? JSON.parse(localStorage.getItem('Stats'))
					: { player:
							{ name: "Cumberdale"
							, morale: 11
							, nationality: 'british'
							, gold: 20000
							, food: 200
							, crewCount: 31
							, strength: 5
							}
						, ship:
							{ speed: 0.2
							, crewCapacity: 52
							}
						}
					);
		};
	});
});
