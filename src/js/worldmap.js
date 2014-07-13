
namespace("PXTree.AchtzehnKnoten", function (AK)
{
	var Config = AK.Config.WorldMap
		, HiddenX = AK.Config.Game.Width + 10
		, DrawingCrosses = Config.DrawingCrosses
		;
	function WorldMap (parentCtrl)
	{
		this.parent = parentCtrl;
		this.top = this.parent.top;
		this.game = this.parent.game;
		this.ship = new AK.Ship(this);
		this._group = null;
		this._inAnim = null;
		this._outAnim = null;
		this._connectors = null;
		this._path = null;
	}
	AK.WorldMap = WorldMap;

	extend(WorldMap,
	{ calculateRealCoordinates: function (col, row)
		{
			var S = Config.Section
				, coords =
					{ x: S.Base.x + col * S.Factor.x
					, y: S.Base.y + row * S.Factor.y
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
				.image('route-texture', 'assets/textures/red-line-dot.png')
				.spritesheet('close-map', 'assets/icons/almanach-back.png', 32, 32)
				;
			if (DrawingCrosses)
				this.game.load.spritesheet('visited-cross', 'assets/icons/map-kreuz.png', 32, 32)
			this.ship.preload();
		}
	, create: function (group)
		{
			//setuo group
			this._group = group || this.game.add.group();
			this._group.position.copyFrom(Config.Offset);
			this._inAnim = this.game.add.tween(this._group)
					.to({x: Config.Offset.x}, 500, Phaser.Easing.Cubic.In, false);
			this._outAnim = this.game.add.tween(this._group)
					.to({x: HiddenX}, 500, Phaser.Easing.Cubic.In, false);
			this._outAnim.onComplete.add(function(){ this.hide(true); }, this);
			this.hide(true);

			//setup other sprites
			this._group.create(0, 0, 'worldmap');
			this._group.add(
					on(this.game.make.button(0, 0, 'close-map', function(){ this.hide(); }, this, 1, 0),
						function(btn)
						{
							btn.position.copyFrom(Config.CloseButton.at);
							btn.anchor.set(.5, .5);
						}, this)
					);

			this._path = this.game.make.group();
			this._connectors = this.game.make.group();
			this._path.add(this._connectors);
			this._group.add(this._path);
			
			this.ship.create(this._group);
		}

	, update: function ()
		{
			this.ship.update();
		}

	, show: function ()
		{
			this.updatePath();
			this._group.x = HiddenX;
			this._group.visible = true;
			this._inAnim.start();
		}

	, hide: function (instantly)
		{
			if (instantly)
			{
				this._group.visible = false;
				this._group.x = HiddenX
			}
			else
			{
				this._outAnim.start();
			}
		}

	, toggle: function ()
		{
			this._group.visible ? this.hide() : this.show();
		}

	, updatePath: function ()
		{
			var levels = this.top.taskLog.completedLevels()
				, points = levels.map(function(lnr)
						{
							var s = AK.Data.Levels[lnr].section;
							return WorldMap.calculateRealCoordinates(s[0], s[1]);
						})
				, from = null
				, to = null
				, i = 0
				;
			points.push(on(AK.Data.Levels[this.top.currentLevel].section, function(s)
					{ return WorldMap.calculateRealCoordinates(s[0], s[1]); }));

			this._clearPath();
			from = points[0];
			to = points[++i] || null;
			if (from && DrawingCrosses) this._createCross(from);
			while (to)
			{
				this._createConnector(from, to);
				if(DrawingCrosses)
					this._createCross(to);
				from = to;
				to = points[++i] || null;
			}

			this.ship.move(from, true);
		}

	, _clearPath: function ()
		{
			this._path.removeChild(this._connectors);
			this._path.removeAll(true);
			this._connectors.removeAll(true);
			this._path.add(this._connectors);
		}

	, _createCross: function (pt)
		{
			var c = this._path.create(pt.x, pt.y, 'visited-cross');
				;
			c.anchor.set(.5, .5);
			return c;
		}

	, _createConnector: function (fromPt, toPt)
		{
			var diff = Phaser.Point.subtract(toPt, fromPt)
				, dist = diff.getMagnitude()
				, line = this.game.add.tileSprite(
						0, 0, dist, 8, 'route-texture', 0, this._connectors)
				;
			line.anchor.set(0, .5);
			line.angle = Math.atan2(diff.y, diff.x) * 180 / Math.PI;
			line.position.copyFrom(fromPt);
			
			return line;
		}
	}); //WorldMap.prototype
});
