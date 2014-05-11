
namespace("PXTree", function(PxT)
{	
	PxT.AchtzehnKnoten = function AchtzehnKnoten ()
	{
		this.game = new Phaser.Game(600, 400, Phaser.AUTO, '', null);
		this.play = new AchtzehnKnoten.Play(this.game);
	};
	
	PxT.AchtzehnKnoten.prototype =
			{ run : function run ()
				{
//					this.game.physics.startSystem(Phaser.Physics.ARCADE);
					this.game.state.add(this.play.key, this.play);
					this.game.state.start(this.play.key);
				}
			};
	
	return namespace;
});