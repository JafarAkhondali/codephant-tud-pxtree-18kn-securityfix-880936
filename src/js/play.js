
namespace("PXTree.AchtzehnKnoten", function (AzK)
{
	AzK.Play = function Play (parent)
	{
		this.parent = parent;
		this.top = parent.top;
		this.game = parent.game;
		this.events = new AzK.Events(this); //TODO make extra event layer
		this.sea = new AzK.Sea(this);
		this.desk = new AzK.Desk(this);
	};
	
	AzK.Play.prototype = derive(Phaser.State,
			{ key : 'play'
			, preload : function preload ()
				{
					this.sea.preload();
					this.desk.preload();
					this.events.preload();
				}
			, create: function create ()
				{
					this.sea.create();
					this.desk.create();
					this.events.create();
					this.sea.loadLevel(0, 'west');
				}
			, update: function create ()
				{
					this.sea.update();
					this.desk.update();
					this.events.update();
				}
			
			, startEvent: function startEvent (opts)
				{
					this.events.startEvent(opts);
				}
			});
});