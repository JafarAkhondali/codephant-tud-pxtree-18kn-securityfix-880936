
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Play = function Play (game)
	{
		this.game = game;
		this.sea = new AzK.Sea(game);
	};
	
	AzK.Play.prototype = derive(Phaser.State,
			{ key : 'play'
			, preload : function ()
				{
					this.sea.preload();
				}
			, create: function ()
				{
					this.sea.create();
				}
			, update: function ()
				{
					this.sea.update();
				}
			});
});