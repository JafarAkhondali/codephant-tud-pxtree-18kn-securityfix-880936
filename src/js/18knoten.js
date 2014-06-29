
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
		
		if( localStorage.getItem('currentLevel') == null || typeof localStorage.getItem('currentLevel') == 'undefined') this.currentLevel = 0;
		else {
			this.currentLevel = parseInt(localStorage.getItem('currentLevel'));}
		
		this.currentSpotNr = 0;
		
		if( localStorage.getItem('enteringFrom') == null || typeof localStorage.getItem('enteringFrom') == 'undefined') this.enteringFrom = 'west';
		else {this.enteringFrom = localStorage.getItem('enteringFrom');}
		
		//TODO replace with gathering of actual data.
		if(localStorage.getItem('Stats')==null || typeof localStorage.getItem('Stats') == 'undefined'){
			this.stats = new AK.Stats(
				{ player:
					{ name: "Paddington"
					, morale: 11
					, nationality: 'portuguese'
					, gold: 20000
					, food: 500
					, crewCount: 31
					, strength: 23
					}
				, ship:
					{ speed: 0.2
					, crewCapacity: 60
					}
				});}
			else { this.stats = new AK.Stats(JSON.parse(localStorage.getItem('Stats')));
			}
		}

	
	AK.Game.prototype =
			{ run : function run ()
				{
					this.game.state.add(AK.MainMenu.key, AK.MainMenu());
					this.game.state.add(AK.Play.key, AK.Play());
					this.game.state.add(AK.Credits.key, AK.Credits());
					this.game.state.start(AK.MainMenu.key, true, false, this);
				}
			};
	
	return namespace;
});