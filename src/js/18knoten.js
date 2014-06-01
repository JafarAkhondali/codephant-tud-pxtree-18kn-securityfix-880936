
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
		
		//TODO replace with gathering of actual data.
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
				});
		
		this.play = new AK.Play(this);
	};
	
	AK.Game.prototype =
			{ run : function run ()
				{
					this.game.state.add(this.play.key, this.play);
					this.game.state.start(this.play.key);
				}
			};
	
	return namespace;
});