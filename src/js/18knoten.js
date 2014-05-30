
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