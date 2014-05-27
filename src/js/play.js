
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Play = function Play (game)
	{
		this.game = game;
		this.sea = new AzK.Sea(game);
		this.desk = new AzK.Desk(this);
	};
	
	AzK.Play.prototype = derive(Phaser.State,
			{ key : 'play'
			, preload : function ()
				{
					this.sea.preload();
					this.desk.preload();
				}
			, create: function ()
				{
					this.sea.create();
					this.desk.create();
				}
			, update: function ()
				{
					this.sea.update();
					this.desk.update();
				}
			});
});