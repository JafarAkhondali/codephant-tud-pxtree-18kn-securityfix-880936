
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.Credits;
	
	var textstyle = Object.create(Config.TextStyle);
	
	function Credits (parentCtrl)
	{
		var self = Object.create(Credits.prototype);
		Phaser.State.call(self);
		self.parent = parentCtrl;
		self.top = self.parent.top;
		return self;
	}
	
	Credits.key = 'credits';
	
	Credits.Data = 
		{ members: 
			[ { name: "Felix Wollert"
				, roles: ["Team-Leiter", "Mädchen-für-alles", "Content"]
				}
			, { name: "Toni Weinert"
				, roles: ["Game-Play", "Konzepte", "Programmierung"]
				}
			, { name: "Axel Rothe"
				, roles: ["User Interface", "Art Direction" ]
				}
			, { name: "Gregor Stopp"
				, roles: ["Recherche", "Aufgabenstellungen"]
				}
			, { name: "André Arnold"
				, roles: ["Chef-Programmierer"]
				}
			]
		, resources:
			[ { name: "Phaser"
				, description: "Thin-Layer HTML5 game framework"
				, url: "http://www.phaser.io"
				, license: "MIT"
				}
			/*, { name: "Silkscreen"
				, description: "Small Pixel Font"
				, url: "http://www.kottke.org/plus/type/silkscreen/"
				, license: "arbitrary free license"
				}*/
			, { name: "Sounds"
				, description: "All Sounds used are from FreeSound.org"
				, url: "http://www.freesound.org"
				, license: "CC BY-SA-NC"
				}
			,
			]
		};
	
	Credits.prototype = on(Object.create(Phaser.State.prototype), function (def)
	{
		
		def.preload = function preload ()
		{
			this.game.load
				.image('credits-bg', 'assets/textures/mm-bg.png')
				.image('wood', 'assets/ui/ui-bg.png')
				.image('18k-logo', 'assets/textures/mm-logo.png')
				.image('pt-logo', 'assets/textures/pixeltree.png')
				;
		};
		
		def.create = function create ()
		{
			var temp
				, RolesAdditionalTextStyle = 
						{ wordWrap: true
						, wordWrapWidth:
							Config.TextArea.width - 2 * Config.TextArea.Padding[0] - 100
						}
				, lineY = 0
				, tp = null
				;
			
			this.game.add.sprite(0, 0, 'credits-bg');
			
			// Text background
			this.game.add.sprite(430, 0, 'wood');
			
			
			//pixeltree logo
			temp = this.game.add.sprite(
					Config.TextArea.x + Config.TextArea.width / 2,
					Config.TextArea.Padding[1],
					'pt-logo');
			temp.anchor.set(.5, 0);
			
			
			//text
			tp = TextPlacer(this.game, this.game.world, Config.TextStyle,
					{ lineSpace: Config.LineSpace
					, lineHeight: 20
					, indentWidth: Config.RolesXOffset
					});
					
			tp.moveTo(
					Config.TextArea.x + Config.TextArea.Padding[0],
					200);
			
			// list of members
			//tp.place("PixelTree sind:").space();
			
			Credits.Data.members.forEach(function (member)
			{
				tp
					.place(member.name)
					.tab()
					.place(member.roles.join(", "), RolesAdditionalTextStyle)
					.clear().space();
			}, this);
			
			//list of resources
			tp.feed().option("indentWidth", 120)
				.place("Verwendete Materialien sind:").space();
			
			Credits.Data.resources.forEach(function (resource)
			{
				tp
					.place(resource.name)
					.tab()
					.place(resource.description).space()
					.place(resource.url).space()
					.place(resource.license).space()
					.clear();
			}, this);
			
			textstyle.font = "normal 14pt GameFont"
		    textstyle.strokeThickness = 2;
		    textstyle.stroke = '#bf9218';
			textstyle.fill = '#e0ab1b';
			textstyle.shadowColor = '#000000';
			textstyle.shadowBlur = '2';
			
			//back button
			temp = this.game.add.text(880, 540, 'zurück zum Menü', textstyle);
			temp.inputEnabled = true;
			temp.input.useHandCursor = true;
			temp.events.onInputUp.add(function()
			{
				this.top.startState(AK.MainMenu.key);
			}, this)
		};
		
		return def;
	});
	
	//EXPORT
	AK.Credits = Credits;
});
