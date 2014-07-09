namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.MainMenu;
	
	function MainMenu (parentCtrl)
	{
		var self = Object.create(MainMenu.prototype);
		Phaser.State.call(self);
		self.parent = parentCtrl;
		self.top = self.parent.top;
		return self;
	}
	
	MainMenu.key = "mainmenu";
	
	MainMenu.prototype = on(Object.create(Phaser.State.prototype), function (def)
	{
	
		def.preload = function ()
		{
			this.game.load
			.image('mainmenu-bg', 'assets/textures/mm-bg.png')
			.image('button', 'assets/ui/ui-board-decorated.png')
			.image('logo', 'assets/textures/mm-logo.png')
			.image('preloaderBar','assets/icons/map-schiff.png');
		;
		};
		
		def.create = function ()
		{
			var btnFactory = TextButtonFactory(this.game,
						{ key: 'button'
							, normalStyle: Config.TextStyle
							, overStyle: { fill: 'gold'}
							, textAlign: [.5,.5]
						})
			, start = btnFactory.create(Config.Labels.NewGame)
			, fortsetzen = btnFactory.create(Config.Labels.LoadGame)
			, credits = btnFactory.create(Config.Labels.Credits)
			, self = this
			;
			this.game.add.sprite(0, 0, 'mainmenu-bg');
			var logo = this.game.add.sprite(700,90,'logo');
			logo.anchor.set(0.5);
			logo.scale.set(1.2);
		
			start.position.set(570, 205);
			start.onInputUp.add(function()
			{
				if(confirm('Hierbei werden alle vorhanden Daten gelöscht! \n Sind Sie sicher, dass Sie ein neues Spiel starten wollen?') == false)
					return;

				self.top.resetSaveData();
				self.top.startState(AK.Intro.key);
			}, this);
			this.game.world.add(start);
			
			fortsetzen.position.set(570, 295);
			fortsetzen.onInputUp.add(function()
			{
				if(!self.top.completedTutorial) {
					alert('Auf diesem PC wurde kein Spielstand gefunden. Bitte starten Sie ein neues Spiel.');
					return;
				}
				//self.top.loadSaveData();
				self.top.startState(AK.Play.key);
			}, this);
			this.game.world.add(fortsetzen);
		
			credits.position.set(570, 385);
			credits.onInputUp.add(function()
			{
				self.top.startState(AK.Credits.key);
			}, this);
			this.game.world.add(credits);
		};
		
			return def;
	});

	AK.MainMenu = MainMenu;
});
