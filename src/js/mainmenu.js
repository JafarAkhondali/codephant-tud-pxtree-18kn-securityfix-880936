
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.MainMenu;
	
	function MainMenu ()
	{
		var self = Object.create(MainMenu.prototype);
		Phaser.State.call(self);
		return self;
	}
	
	MainMenu.key = "mainmenu";
	
	MainMenu.prototype = on(Object.create(Phaser.State.prototype), function (def)
	{
		function makeButton (self, text)
		{
			var btn = self.game.make.button(0, 0, 'button')
				, label = self.game.make.text(0, 0, text, Object.create(Config.TextStyle))
				;
			label.inputEnabled = true;
			label.events.onInputOver.add(btn.onInputOverHandler, btn);
			label.events.onInputOut.add(btn.onInputOutHandler, btn);
			label.events.onInputDown.add(btn.onInputDownHandler, btn);
			label.events.onInputUp.add(btn.onInputUpHandler, btn);
			label.x = Math.floor((btn.width - label.width) / 2);
			label.y = Math.floor((btn.height - label.height) / 2);
			btn.addChild(label);
			return btn;
		};
		
		def.init = function (parentCtrl)
		{
			this.parent = parentCtrl;
			this.top = this.parent.top;
		};
		
		def.preload = function ()
		{
			this.game.load
				.image('mainmenu-bg', 'assets/textures/mm-bg.png')
				.image('button', 'assets/ui/ui-board-decorated.png')
				.image('logo', 'assets/ui/ui-logo.png');
				;
		};
		
		def.create = function ()
		{
			this.game.add.sprite(0, 0, 'mainmenu-bg');
			var logo = this.game.add.sprite(700,80,'logo');
			logo.anchor.set(0.5);
			logo.scale.set(3);
			var start = makeButton(this, "start")
				, credits = makeButton(this, "credits")
				;
			
			start.position.set(570, 205);
			start.onInputUp.add(function()
			{
				this.game.state.start(AK.Play.key, true, false, this.parent);
			}, this);
			this.game.world.add(start);
			
			credits.position.set(570, 280);
			credits.onInputUp.add(function()
			{
				alert("Coming soon ...");
			});
			this.game.world.add(credits);
		};
		
		return def;
	});
	
	AK.MainMenu = MainMenu;
});