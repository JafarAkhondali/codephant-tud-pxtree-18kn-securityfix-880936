
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	Play = function Play (parent)
	{
		var self = Object.create(Play.prototype);
		Phaser.State.call(self);
		return self;
	};
	
	Play.key = 'play';
	
	Play.prototype = derive(Phaser.State,
			{ init : function (parentCtrl)
				{
					this.parent = parentCtrl;
					this.top = this.parent.top;
					this.events = new AK.Events(this); //TODO make extra event layer
					this.sea = new AK.Sea(this);
					this.desk = new AK.Desk(this);
				}
				
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
	
	AK.Play = Play;
});