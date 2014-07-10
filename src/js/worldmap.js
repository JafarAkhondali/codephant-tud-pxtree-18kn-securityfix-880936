
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.WorldMap
		;
	function WorldMap (parentCtrl)
	{
		this.parent = parentCtrl;
		this.top = this.parent.top;
		this.game = this.parent.game;
		this.ship = new AK.Ship(this);
		this._group = null
	}
	AK.WorldMap = WorldMap;

	extend(WorldMap,
	{ calculateRealCoordinates: function (col, row)
		{
			var S = Config.Section
				, coords =
					{ x: S.Base.x + col * S.Factor.x
					, y: S.Base.y + col * S.Factor.y
					}
				;
			return coords;
		}
	});

	extend(WorldMap.prototype,
	{ preload: function ()
		{
			this.game.load
				.image('worldmap', 'assets/ui/ui-weltkarte.png')
				.spritesheet('close-map', 'assets/icons/almanach-back.png', 32, 32)
				;
			this.ship.preload();
		}
	, create: function (group)
		{
			this._group = group || this.game.add.group();
			this._group.position.copyFrom(Config.Offset);
			this.hide();
			this._group.create(0, 0, 'worldmap');
			this._group.add(
					on(this.game.make.button(0, 0, 'close-map', this.hide, this, 1, 0),
						function(btn)
						{
							btn.position.copyFrom(Config.CloseButton.at);
							btn.anchor.set(.5, .5);
						}, this)
					);
			this.ship.create(this._group);
			this.ship.move({x: 288, y: 288}, true);
			this._inAnim = this.game.add.tween(this._group)
					.to({x: Config.Offset.x}, 500, Phaser.Easing.Quartic.In, false);
		}

	, update: function ()
		{
			this.ship.update();
		}

	, show: function ()
		{
			this.updatePath();
			this._group.x = 1030;
			this._group.visible = true;
			this._inAnim.start();
		}

	, hide: function ()
		{
			this._group.visible = false;
		}

	, toggle: function ()
		{
			this._group.visible ? this.hide() : this.show();
		}

	, updatePath: function ()
		{
			
		}
	}); //WorldMap.prototype
});
