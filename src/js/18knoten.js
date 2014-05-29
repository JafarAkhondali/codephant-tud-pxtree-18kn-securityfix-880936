
namespace("PXTree", function(PxT)
{	
	PxT.AchtzehnKnoten = function AchtzehnKnoten ()
	{
		this.game = new Phaser.Game(1024, 576, Phaser.AUTO, '', null);
		this.play = new AchtzehnKnoten.Play(this);
	};
	
	PxT.AchtzehnKnoten.prototype =
			{ run : function run ()
				{
					this.game.state.add(this.play.key, this.play);
					this.game.state.start(this.play.key);
				}
			};
	
	return namespace;
});