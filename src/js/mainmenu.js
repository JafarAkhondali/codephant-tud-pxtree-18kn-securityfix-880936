
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
		def.init = function (parentCtrl)
		{
			this.parent = parentCtrl;
			this.top = this.parent.top;
		};
		
		def.preload = function ()
		{
			this.game.load
<<<<<<< HEAD
				.image('mainmenu-bg', 'assets/textures/mm-bg.png')
				.image('button', 'assets/ui/ui-board-decorated.png')
				.image('logo', 'assets/ui/ui-logo.png');
=======
				.image('mainmenu-bg', 'assets/entwurf-hauptmenue.png')
				.image('mainmenu-button', 'assets/ui/ui-board-decorated.png')
>>>>>>> branch 'master' of https://github.com/codephant/tud-pxtree-18kn
				;
		};
		
		def.create = function ()
		{
<<<<<<< HEAD
			this.game.add.sprite(0, 0, 'mainmenu-bg');
			var logo = this.game.add.sprite(700,80,'logo');
			logo.anchor.set(0.5);
			logo.scale.set(3);
			var start = makeButton(this, "start")
				, credits = makeButton(this, "credits")
=======
			var btnFactory = TextButtonFactory(this.game,
						{ key: 'mainmenu-button'
						, normalStyle: Config.TextStyle
						, overStyle: { fill: 'gold'}
						, textAlign: [.5,.5]
						})
				, start = btnFactory.create("start")
				, credits = btnFactory.create("credits")
>>>>>>> branch 'master' of https://github.com/codephant/tud-pxtree-18kn
				;
			this.game.add.sprite(0, 0, 'mainmenu-bg');
			
			start.position.set(570, 205);
			start.onInputUp.add(function()
			{
				this.game.state.start(AK.Play.key, true, false, this.parent);
			}, this);
			this.game.world.add(start);
			
			credits.position.set(570, 280);
			credits.onInputUp.add(function()
			{
				this.game.state.start(AK.Credits.key, true, false, this.parent);
			}, this);
			this.game.world.add(credits);
		};
		
		return def;
	});
	
	AK.MainMenu = MainMenu;
});
